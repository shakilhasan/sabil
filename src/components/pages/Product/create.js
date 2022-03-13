import {useEffect, useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../../components/Layout/MetaData'
import {useNavigate, useParams} from "react-router-dom";
import {addProduct, getProduct, updateProduct} from "../../../helpers/backend_helper";
// import { newProduct, clearErrors } from '../../actions/productActions'
// import { NEW_PRODUCT_RESET } from '../../actions/actionTypes'

const CreateProduct = () => {
    const initialState = {
        name: '',
        code: '',
        sku: '',
        description: '',
        category: '',
        price: 0,
        cost: 0,
        stock: 0,
        clientId: '1',

    }
    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const [product, setProduct] = useState(initialState)
    const {name, description, category, price, seller, stock} = product
    // const { loading, error, message } = useSelector((state) => state.newProduct);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const error = false; //demo
    const message = {}; //demo
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getProduct(id).then((data) => {
                console.log('data--', data)
                setProduct(data);
            })

        }
    }, [])
    // // const dispatch = useDispatch();
    // const alert = useAlert();
    // useEffect(() => {
    //     if (error) {
    //         alert.error(error);
    //         // dispatch(clearErrors());
    //     }
    //     if (message) {
    //         alert.success(message);
    //         // dispatch({ type: NEW_PRODUCT_RESET });
    //         // history.push('/admin/products')
    //     }
    // }, [error, alert, history, message]);

    const handleChange = async e => {
        if (e.target.name === 'images') {
            const files = Array.from(e.target.files)
            setImages([])
            setImagesPreview([])

            files.forEach(file => {
                const reader = new FileReader()
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setImagesPreview(oldArray => [...oldArray, reader.result])
                        setImages(oldArray => [...oldArray, reader.result])
                    }
                }
                reader.readAsDataURL(file)
            })

        } else {
            await setProduct({...product, [e.target.name]: e.target.value})
            console.log(product);
        }
    }

    const handleSubmit = async (e) => {
        console.log("product--", product)
        e.preventDefault();

        if (id) {
            await updateProduct(product);
        } else {
            await addProduct(product);
        }

        // const formData = new FormData();
        // formData.set('name', name);
        // formData.set('description', description);
        // formData.set('category', category);
        // formData.set('price', price);
        // formData.set('seller', seller);
        // formData.set('stock', stock);
        // images.forEach(image => formData.append('images', image))
        // dispatch(newProduct(formData))

        navigate('/product')
    }

    return (
        <>
            <MetaData title='Add New Product'/>
            <div className="row">
                {/*<div className="col-12 col-md-2">*/}
                {/*    <Sidebar />*/}
                {/*</div>*/}
                <div className="col-12 col-md-10">
                    <div className="wrapper my-5">
                        <form onSubmit={handleSubmit} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4"> {id ? "Update" : "New"} Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input name='name' value={product.name} onChange={handleChange} type="text"
                                       id="name_field" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="code">Code</label>
                                <input name='code' value={product.code} onChange={handleChange} type="text" id="code"
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select name='category' onChange={handleChange} className="form-control"
                                        id="category_field">
                                    <option> Select Category</option>
                                    {categories.map(category => <option key={category}>{category}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sku">sku</label>
                                <input name='sku' value={product.sku} onChange={handleChange} type="text" id="sku"
                                       className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_cost">Cost</label>
                                <input name='cost' value={product.cost} onChange={handleChange} type="number"
                                       id="price_cost" className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input name='price' value={product.price} onChange={handleChange} type="number"
                                       id="price_field" className="form-control"/>
                            </div>


                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input name='stock' value={product.stock} onChange={handleChange} type="number"
                                       id="stock_field" className="form-control"/>
                            </div>

                            {/*<div className='form-group'>*/}
                            {/*    <label>Images</label>*/}

                            {/*    <div className='custom-file'>*/}
                            {/*        <input name='images' onChange={handleChange} type='file' className='custom-file-input' id='customFile' multiple />*/}
                            {/*        <label className='custom-file-label' htmlFor='customFile'>*/}
                            {/*            Choose Images*/}
                            {/*        </label>*/}
                            {/*    </div>*/}
                            {/*    {imagesPreview.map(image => <img src={image} className='mt-3 mr-2' alt='preview' width={55} height={52} key={image} />)}*/}
                            {/*</div>*/}

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea name='description' value={product.description} onChange={handleChange}
                                          className="form-control" id="description_field" rows="8"></textarea>
                            </div>

                            <button
                                // disabled={loading ? true : false}
                                id="login_button" type="submit" className="btn btn-block py-3">
                                {id ? "UPDATE" : "CREATE"}
                            </button>

                        </form>
                    </div>

                </div>
            </div>

        </>
    )
}

export default CreateProduct
