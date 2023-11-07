const { ObjectId } = require("mongoose").Types;

const getQuery = (payload:any) => {
  const createdBySubQuery = { createdBy: ObjectId(payload.userId) };
  const subQueries = [];
  subQueries.push(createdBySubQuery);
  let query = {};
  let roleQuery = {};
  if (payload.roleId) {
    roleQuery = { roleId: ObjectId(payload.roleId) };
    subQueries.push(roleQuery);
  }

  let nameQuery:any = [];
  if (payload.name) {
    nameQuery = {
      $or: [
        { roleAlias: { $regex: payload.name, $options: "i" } },
        { resourceAlias: { $regex: payload.name, $options: "i" } },
        { roleName: { $regex: payload.name, $options: "i" } },
        { resourceName: { $regex: payload.name, $options: "i" } },
      ],
    };
    subQueries.push(nameQuery);
  }

  query = {
    $and: [...subQueries],
  };
  return query;
};

export {
  getQuery
};
