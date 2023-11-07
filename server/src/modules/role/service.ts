const {ObjectId} = require("mongoose").Types;

const getQuery = (payload: any) => {
    const createdBySubQuery = {createdBy: ObjectId(payload.userId)};

    let query: any = createdBySubQuery;
    if (payload.name) {
        query = {
            $and: [
                createdBySubQuery,
                {
                    $or: [
                        {name: {$regex: payload.name, $options: "i"}},
                        {alias: {$regex: payload.name, $options: "i"}},
                    ],
                },
            ],
        };
    }
    return query;
};

export {
    getQuery,
};
