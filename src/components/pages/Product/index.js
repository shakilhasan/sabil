import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../../../components/Layout/MetaData'
import Loader from '../../../components/Layout/Loader'
import {deleteProduct, getProducts} from "../../../helpers/backend_helper";
// import Sidebar from '../../components/admin/Sidebar'
// import { getAdminProducts, clearErrors, deleteProduct } from '../../actions/productActions'
// import { DELETE_PRODUCT_RESET, SINGLE_PRODUCT_RESET } from '../../actions/actionTypes'

const ProductsList = () => {

    // const alert = useAlert()
    const [products, setAllProducts]=useState([]);
    const [reloadProducts, setReloadProducts] = useState(false);

    const loading=false //demo
    // const { loading, products, error } = useSelector(state => state.allProducts)
    // const { error: deleteProductError, message } = useSelector(state => state.deleteProduct)

    useEffect(async () => {
        getProducts({clientId:'1'}).then(data=>{
            console.log("all--",data)
            setAllProducts(data);
        })
    },[reloadProducts]);

    // useEffect(() => {
    //     dispatch(getAdminProducts())
    //     dispatch({ type: SINGLE_PRODUCT_RESET })
    //     if (error) {
    //         alert.error(error)
    //         dispatch(clearErrors())
    //     }
    //     if (deleteProductError) {
    //         alert.error(deleteProductError)
    //         dispatch(clearErrors())
    //     }
    //     if (message) {
    //         alert.success(message)
    //         dispatch({ type: DELETE_PRODUCT_RESET })
    //     }
    //
    // }, [dispatch, error, alert, deleteProductError, message])

    const setProducts = () => {
        const data = {
            columns: [
                // {
                //     label: 'Preview',
                //     field: 'images',
                //     sort: 'asc',
                // },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc',
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc',
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc',
                },
                {
                    label: 'Action',
                    field: 'action',
                }
            ],
            rows: []
        }

        products && products.forEach(product => data.rows.push({
            // images: <img src={product.images[0].url} alt={product.name} width={50} height={50} />,
            name: product.name,
            category: product.category,
            price: `$${product.price}`,
            stock: product.stock,
            action: (
                <>
                    <Link to={`/product/update/${product._id}`} className='btn btn-primary py-1'><i className="fa fa-pencil" aria-hidden="true"></i></Link>
                    <button onClick={() => handleDelete(product._id)} className="btn btn-danger py-1 px-2 ml-2"><i className="fa fa-trash" aria-hidden="true"></i></button>
                </>
            )
        }))
        return data
    }

    const handleDelete = async id => {
        await deleteProduct({_id:id});
        setReloadProducts(true);
    }

    return (
        <>
            <MetaData title='All Products' />
            <div className="row">
                {/*<div className="col-12 col-md-2">*/}
                {/*    <Sidebar />*/}
                {/*</div>*/}
                <div className="col-12 col-md-10">
                    <h1 className='my-5'>All Products</h1>
                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setProducts()}
                            className='px-3'
                            hover
                            bordered
                            striped
                        />
                    )}
                </div>
            </div>

        </>
    )
}

export default ProductsList
