import {useEffect, useRef, useState} from 'react';
import {
    GET_ALL_USER_PRODUCTS_REQUEST,
    DELETE_USER_PRODUCT_REQUEST,
    UPDATE_USER_PRODUCT_REQUEST
} from '../../redux/adminDashboard/actions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import Table from 'react-bootstrap/Table';
import uuid from 'react-uuid';
import { GetColorName } from 'hex-color-to-color-name';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
    GET_PRODUCT_CATEGORIES_REQUEST,
    GET_PRODUCT_SIZES_REQUEST
} from "../../redux/adminProductParameters/actions";

const updateInitialValues = {
    name: '',
    description: '',
    brand: '',
    price: '',
    color: '#000000',
    size: '',
    category: '',
    inStock: 0
}

const AdminDashboard = () => {
    const {adminProducts, loading} = useSelector((state) => state.adminProducts)
    const dispatch = useDispatch();
    const [ownersProducts, setOwnersProducts] = useState([]);
    const [updatedProduct, setUpdatedProduct] = useState(updateInitialValues);
    const productImage = useRef('');
    const [updateProductItem, setUpdateProductItem] = useState({})
    const [show, setShow] = useState(false);
    const [id, setId] = useState();
    const { categories } = useSelector((state) => state.categories)
    const [getCategories, setGetCategories] = useState([])
    const [getProductSizes, setGetProductSizes] = useState([]);
    const { sizes } = useSelector((state) => state.sizes)

    //show categories
    useEffect(() => {
        dispatch({
            type: GET_PRODUCT_CATEGORIES_REQUEST
        })
    }, [])

    useEffect(() => {
        if (!loading) {
            setGetCategories(categories)
        }
    }, [loading])

    //show sizes
    useEffect(() => {
        dispatch({
            type: GET_PRODUCT_SIZES_REQUEST
        })
    }, [])

    useEffect(() => {
        if (!loading) {
            setGetProductSizes(sizes)
        }
    }, [loading])

    useEffect(() => {
        dispatch({
            type: GET_ALL_USER_PRODUCTS_REQUEST
        })
    }, []);

    useEffect(() => {
        if (!loading) {
            setOwnersProducts(adminProducts)
        }
    }, [loading])

    const changeProduct = (event, id, item) => {
        setId(id)
        setUpdatedProduct({
            name: item.name,
            brand: item.brand,
            description: item.description,
            price: item.price,
            color: item.color,
            size: item.size,
            category: item.category,
            inStock: item.in_stock
        })
        setShow(true)
    }

    const adminHandleChangeUpdate = ({target}) => {
        setUpdateProductItem({
            ...updateProductItem,
            [target.name]: target.value,
        })
        if (target.name === 'picture') {
            setUpdateProductItem({
                ...updateProductItem,
                [target.name]: target.files[0],
            })
        }
    }

    const update = () => {
        const dataUpdate = new FormData();
        dataUpdate.append('id', id);
        dataUpdate.append('name', updateProductItem.name);
        dataUpdate.append('description', updateProductItem.description);
        dataUpdate.append('brand', updateProductItem.brand);
        dataUpdate.append('price', updateProductItem.price);
        dataUpdate.append('color', updateProductItem.color);
        dataUpdate.append('size', updateProductItem.size);
        dataUpdate.append('category', updateProductItem.category);
        dataUpdate.append('picture', updateProductItem.picture);
        dataUpdate.append('inStock', updateProductItem.inStock);
        productImage.current.value = ''
        dispatch({
            type: UPDATE_USER_PRODUCT_REQUEST,
            payload: dataUpdate
        })
        setShow(false)
    }

    const handleClose = () => {
        setShow(false)
        setUpdateProductItem(updateInitialValues)
    }

    const deleteProduct = (event, id) => {
        dispatch({
            type: DELETE_USER_PRODUCT_REQUEST,
            payload: id
        })
    }

    return (
        <>
            <div className="m-3">
                <h4 className="mt-5 mb-4">All products</h4>

                {loading
                    ?
                    <LoadingSpinner/>
                    :
                    (<>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Brand</th>
                                <th>Details</th>
                                <th>Info</th>
                                <th>Owner info</th>
                                <th>Modify product</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Product */}
                            {
                                ownersProducts.map((item, index) => {
                                    return (
                                        <tr key={uuid()}>
                                            <th className="pt-4">{index + 1}</th>
                                            <th className="product-images">
                                                <img
                                                    className="img-fluid admin-products-image"
                                                    alt="product-images"
                                                    src={`http://localhost:8000/assets/product_images/${item.picture}`}
                                                />
                                            </th>
                                            <th className="pt-4"><h6>{item.name}</h6></th>
                                            <th className="pt-4"><h6>{item.description}</h6></th>
                                            <th className="pt-4"><h6>{item.brand}</h6></th>

                                            <th className="pt-4">
                                                <ul>
                                                <h6>
                                                    <li>
                                                        <span className="text-danger">Color: </span>
                                                        <span className="centering-objects admin-product-color-box"
                                                             style={{backgroundColor: `${item.color}`}}>
                                                            {GetColorName(item.color)}
                                                        </span>
                                                    </li>
                                                    <li className="pt-2">
                                                        <span className="text-danger">Size: </span>
                                                        {item.size}
                                                    </li>
                                                    <li className="pt-2">
                                                        <span className="text-danger">Category: </span>
                                                        {item.category}
                                                    </li>
                                                </h6>
                                                </ul>
                                            </th>


                                            <th className="pt-4">
                                                <ul>
                                                    <h5>
                                                    <li>
                                                        <span className="text-danger">In stock: </span>
                                                        {item.in_stock} pcs
                                                    </li>
                                                    <li className="pt-2">
                                                        <span className="text-danger">Price for 1 pcs: </span>
                                                        {item.price}$
                                                    </li>
                                                    </h5>
                                                </ul>
                                            </th>

                                            <th className="pt-4">
                                                <ul>
                                                    <h6>
                                                        <li>
                                                            <span className="text-danger">Name: </span>
                                                            {item.user.name}
                                                        </li>
                                                        <li className="pt-2">
                                                            <span className="text-danger">Surname: </span>
                                                            {item.user.surname}
                                                        </li>
                                                        <li className="pt-2">
                                                            <span className="text-danger">Email: </span>
                                                            {item.user.email}
                                                        </li>
                                                        <li className="pt-2">
                                                            <span className="text-danger">Role: </span>
                                                            {item.user.role}
                                                        </li>
                                                    </h6>
                                                </ul>
                                            </th>

                                            <th className="pt-4">
                                                <ul>
                                                    <li className="m-2">
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={event => changeProduct(event, item.id, item)}
                                                        >
                                                            Change
                                                        </button>
                                                    </li>
                                                    <li className="m-2">
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={event => deleteProduct(event, item.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </th>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                    </>)
                }
            </div>

            {/* modal for update */}
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!updatedProduct.name
                        ?
                        <LoadingSpinner /> :
                        (<>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control my-3"
                                    placeholder="Name"
                                    onChange={adminHandleChangeUpdate}
                                    value={updateProductItem.name ? updateProductItem.name : updatedProduct.name}
                                />

                                <input
                                    type="text"
                                    name="description"
                                    className="form-control my-3"
                                    placeholder="Description"
                                    onChange={adminHandleChangeUpdate}
                                    value={updateProductItem.description ? updateProductItem.description : updatedProduct.description}
                                />

                                <input
                                    type="text"
                                    name="brand"
                                    className="form-control my-3"
                                    placeholder="Brand"
                                    onChange={adminHandleChangeUpdate}
                                    value={updateProductItem.brand ? updateProductItem.brand : updatedProduct.brand}
                                />

                                <input
                                    type="number"
                                    name="price"
                                    className="form-control my-3"
                                    placeholder="Price"
                                    onChange={adminHandleChangeUpdate}
                                    value={updateProductItem.price ? updateProductItem.price : updatedProduct.price}
                                />

                                <input
                                    type="number"
                                    name="inStock"
                                    className="form-control my-3"
                                    placeholder="In stock"
                                    onChange={adminHandleChangeUpdate}
                                    value={updateProductItem.inStock ? updateProductItem.inStock : updatedProduct.inStock}
                                />

                                <input
                                    type="color"
                                    name="color"
                                    className="form-control my-3"
                                    placeholder="Color"
                                    onChange={adminHandleChangeUpdate}
                                    value={updateProductItem.color ? updateProductItem.color : updatedProduct.color}
                                />

                                <select
                                    onChange={adminHandleChangeUpdate}
                                        className="form-select my-3"
                                        name="size"
                                        aria-label="Default select example"
                                        value={updateProductItem.size ? updateProductItem.size : updatedProduct.size}
                                >
                                    <option defaultValue>Select size</option>
                                    {
                                        getProductSizes && getProductSizes.map((item) => {
                                            return (<option key={uuid()} value={item.size}>{item.size}</option>)
                                        })
                                    }
                                </select>

                                <select
                                        onChange={adminHandleChangeUpdate}
                                        className="form-select my-3"
                                        name="category"
                                        aria-label="Default select example"
                                        value={updateProductItem.category ? updateProductItem.category : updatedProduct.category}
                                >
                                    <option defaultValue>Select category</option>
                                    {
                                        getCategories && getCategories.map((item) => {
                                            return (<option key={uuid()} value={item.category}>{item.category}</option>)
                                        })
                                    }
                                </select>

                                <div className="form-group">
                                    <input
                                        name="picture"
                                        type="file"
                                        className="form-control-file my-3"
                                        id="exampleFormControlFile1"
                                        ref={productImage}
                                        onChange={adminHandleChangeUpdate}
                                    />
                                </div>
                            </>
                        )}

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={update}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminDashboard;
