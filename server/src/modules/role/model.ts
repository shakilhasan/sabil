import mongoose from "mongoose";
import {MongoError} from "../../common/errors";

// schema
const schema = new mongoose.Schema(
    {
        name: {type: String, unique: true, required: true},
        isSuperAdmin: {type: Boolean},
        isAdmin: {type: Boolean},
        alias: {type: String, unique: true, required: true},
        permissions: [{type: mongoose.Schema.Types.ObjectId, ref: "Permission"}],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            default: "000000000000",
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            default: "000000000000",
        },
    },
    {timestamps: true}
);

// indices
schema.index({name: "text"});
schema.index({createdAt: 1});
schema.index({updatedAt: 1});
schema.index({isSuperAdmin: 1});
schema.index({isAdmin: 1});

schema.post("save", (error: any, doc: any, next: any) => {
    if (error.name === "MongoError" && error.code === 11000) {
        // if error.message contains the substring 'duplicate key error' then it's a duplicate username
        if (error.message.includes("duplicate key error")) {
            const errorMessage = `Name already exists`;
            next(new MongoError(errorMessage));
        } else next(new MongoError(error.message));
    } else {
        next();
    }
});

const roleModelName = "Role";
const Role = mongoose.model(roleModelName, schema);
export {roleModelName, Role};
