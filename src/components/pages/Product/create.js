import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../../components/Layout/MetaData'
import { useAlert } from 'react-alert'
import Sidebar from '../../../components/Layout/Sidebar'
// import { newProduct, clearErrors } from '../../actions/productActions'
// import { NEW_PRODUCT_RESET } from '../../actions/actionTypes'

const CreateProduct = ({ history }) => {

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

    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        seller: '',
        stock: '',
    })

    const { name, description, category, price, seller, stock } = product

    const { loading, error, message } = useSelector((state) => state.newProduct);

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
            // dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
            // dispatch({ type: NEW_PRODUCT_RESET });
            // history.push('/admin/products')
        }
    }, [error, alert, history, message]);

    const handleChange = e => {
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
            setProduct({ ...product, [e.target.name]: e.target.value })

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.set('name', name);
        // formData.set('description', description);
        // formData.set('category', category);
        // formData.set('price', price);
        // formData.set('seller', seller);
        // formData.set('stock', stock);
        // images.forEach(image => formData.append('images', image))
        // dispatch(newProduct(formData))
    }

    return (
        <>
            <MetaData title='Add New Product' />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <div className="wrapper my-5">
                        <form onSubmit={handleSubmit} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">New Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input name='name' value={name} onChange={handleChange} type="text" id="name_field" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input name='price' value={price} onChange={handleChange} type="text" id="price_field" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea name='description' value={description} onChange={handleChange} className="form-control" id="description_field" rows="8"></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select name='category' onChange={handleChange} className="form-control" id="category_field">
                                    <option> Select Category</option>
                                    {categories.map(category => <option key={category}>{category}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input name='stock' value={stock} onChange={handleChange} type="number" id="stock_field" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input name='seller' value={seller} onChange={handleChange} type="text" id="seller_field" className="form-control" />
                            </div>

                            <div className='form-group'>
                                <label>Images</label>

                                <div className='custom-file'>
                                    <input name='images' onChange={handleChange} type='file' className='custom-file-input' id='customFile' multiple />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                                {imagesPreview.map(image => <img src={image} className='mt-3 mr-2' alt='preview' width={55} height={52} key={image} />)}
                            </div>


                            <button
                                // disabled={loading ? true : false}
                                id="login_button" type="submit" className="btn btn-block py-3">
                                CREATE
                            </button>

                        </form>
                    </div>

                </div>
            </div>

        </>
    )
}

export default CreateProduct
