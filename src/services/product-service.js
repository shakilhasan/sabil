const models = require('../models/data-models');
const {ProductViewModel} = require('../models/view-models/product-view-model')
const {NotFound} = require('../utils/errors');
const Model = models.Product;

const getAll = async ()=>{
    const items= await Model.find();
    let viewModels = items.map((item)=>ProductViewModel.convert(item));
    return viewModels;
}

const save = async (product)=>{
    const model = await Model.createNew(product);
    const savedItem = await model.save();
    return savedItem._id;
}

const update= async (product)=>{
    const id = product._id;
    let model = await Model.findById(id);
    if(model){
        await Model.updateOne({ _id: product._id }, { ...product, updatedAt: Date.now().toString() })
        return model._id;
    }
    throw new NotFound('Product not found by the id:'+id);
};

const deleteById= async (id)=>{
    let model = await Model.findById(id);
    if(model){
        let result = await Model.deleteOne({_id:id});
        return result;
    }
    throw new NotFound('Product not found by the id:'+id);
}

const getById = async (id)=>{
    let model=await Model.findById(id);
    let viewModel = ProductViewModel.convert(model);
    return viewModel;
}

const search = async (searchRequest)=>{
    const items = await Model.find(searchRequest);
    let viewModels = items.map(item=>ContactViewModel.convert(item));
    return viewModels;
}

module.exports = {search, getAll, save, update, deleteById, getById};
