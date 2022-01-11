const models = require("../models/data-models");
const { ContactViewModel } = require("../models/view-models/contact-view-model");
const { NotFound } = require("../utils/errors");
const Model = models.Contact;

const getAll = async () => {
    const items = await Model.find();
    let viewModels = items.map((item) => ContactViewModel.convert(item));
    return viewModels;
};

const save = async (contact) => {
    const model = await Model.createNew(contact);
    const savedItem = await model.save();
    return savedItem._id;
};

const update = async (contact) => {
    const id = contact._id;
    let model = await Model.findById(id);
    if (model) {
        model.name = contact.name;
        model.updatedAt = Date.now().toString();
        model.save();
        return model._id;
    }
    throw new NotFound("Contact not found by the id: " + id);
};

const deleteById = async (id) => {
    let model = await Model.findById(id);
    if (model) {
        let result = await Model.deleteOne({ _id: id });
        return result;
    }

    throw new NotFound("Contact not found by the id: " + id);
};
const getById = async (id) => {
    let model = await Model.findById(id);
    let viewModel = ContactViewModel.convert(model);
    return viewModel;
};
const search = async (searchRequest) => {
    const items = await Model.find(searchRequest);
    let viewModels = items.map(item => ContactViewModel.convert(item));
    return viewModels;
}
// const search = async (payload) => {
//     let dateQuery = {};
//     if (payload.fromDate && payload.toDate) {
//         dateQuery = { updatedAt: { $gte: payload.fromDate, $lte: payload.toDate } };
//     }
//
//     let searchQuery = {};
//     if (payload.searchText) {
//         searchQuery = { name: { '$regex': payload.searchText, '$options': 'i' } };
//     }
//
//     let query = { $and: [dateQuery, searchQuery] };
//
//     const items = await Model.find(query);
//     let viewModels = items.map((item) => ContactViewModel.convert(item));
//     return viewModels;
// }

module.exports = { search, getAll, save, update, deleteById, getById };
