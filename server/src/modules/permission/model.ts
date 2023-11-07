import mongoose from "mongoose";

// Schema

const permissionSchema = new mongoose.Schema(
  {
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    roleName: { type: String, required: true },
    roleAlias: { type: String, required: true },
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: "Resource" },
    resourceName: { type: String, required: true },
    resourceAlias: { type: String, required: true },
    isAllowed: { type: Boolean, required: true },
    isDisabled: { type: Boolean, required: true },
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
  { timestamps: true }
);

// reference model
const permissionModelName = "Permission";
const Permission = mongoose.model(permissionModelName, permissionSchema);

export {  Permission, permissionModelName };
