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
import NoImage from './../../assets/No-Image.jpg';
import {
    GET_PRODUCT_CATEGORIES_REQUEST,
    GET_PRODUCT_SIZES_REQUEST
} from "../../redux/adminProductParameters/actions";

const initialValidationValues = {
    name: '',
    description: '',
    brand: '',
    price: '',
    color: '',
    inStock: ''
}

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const {adminProducts, loading} = useSelector((state) => state.adminProducts)
    const [ownersProducts, setOwnersProducts] = useState([]);
    const productImage = useRef('');
    const [show, setShow] = useState(false);
    const [id, setId] = useState();
    const { categories } = useSelector((state) => state.categories)
    const [getCategories, setGetCategories] = useState([])
    const [getProductSizes, setGetProductSizes] = useState([]);
    const { sizes } = useSelector((state) => state.sizes);
    // validation
    const [updatedProduct, setUpdatedProduct] = useState(initialValidationValues);
    const [formErrors, setFormErrors] = useState({})

    //show categories
    useEffect(() => {
        dispatch({
            type: GET_PRODUCT_CATEGORIES_REQUEST
        })
    }, [dispatch])

    useEffect(() => {
        if (!loading) {
            setGetCategories(categories)
        }
    }, [loading, categories])
    //show sizes
    useEffect(() => {
        dispatch({
            type: GET_PRODUCT_SIZES_REQUEST
        })
    }, [dispatch])

    useEffect(() => {
        if (!loading) {
            setGetProductSizes(sizes)
        }
    }, [loading, sizes])

    useEffect(() => {
        dispatch({
            type: GET_ALL_USER_PRODUCTS_REQUEST
        })
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
            setOwnersProducts(adminProducts)
        }
    }, [loading, adminProducts])
    // update product
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
            // submit
    const update = () => {
        setFormErrors(validate(updatedProduct))
        if (Object.keys(validate(updatedProduct)).length === 0) {
            const dataUpdate = new FormData();
            dataUpdate.append('id', id);
            dataUpdate.append('name', updatedProduct.name);
            dataUpdate.append('description', updatedProduct.description);
            dataUpdate.append('brand', updatedProduct.brand);
            dataUpdate.append('price', updatedProduct.price);
            dataUpdate.append('color', updatedProduct.color);
            dataUpdate.append('size', updatedProduct.size);
            dataUpdate.append('category', updatedProduct.category);
            dataUpdate.append('picture', updatedProduct.picture);
            dataUpdate.append('inStock', updatedProduct.inStock);
            dispatch({
                type: UPDATE_USER_PRODUCT_REQUEST,
                payload: dataUpdate
            })
            setShow(false)
        }
    }
            // onChange
    const adminHandleChangeUpdate = ({target}) => {
        setUpdatedProduct({
            ...updatedProduct, [target.name]: target.value
        });
    }
            //validation errors
    const validate = (values) => {
        const errors = {};
        if (values.name.length < 2 || values.name.length > 15) {
            errors.name = 'name must be min 2, max 15 symbols';
        }
        if (values.description.length < 10 || values.description.length > 255) {
            errors.description = 'description must be min 10, max 255 symbols';
        }
        if (values.brand.length < 2 || values.brand.length > 25) {
            errors.brand = 'brand must be min 2, amx 25 symbols';
        }
        if (values.price.length < 1 || values.price.length > 5) {
            errors.price = 'price must be min 1, max 99999 symbols';
        }
        if (values.color.length < 2 || values.color.length > 15) {
            errors.color = 'color must be min 2, max 15 symbols';
        }
        if (values.inStock.length < 1 || values.inStock.length > 5) {
            errors.inStock = 'inStock must be min 1, max 99999 symbols';
        }
        return errors;
    }
    //close modal
    const handleClose = () => {
        setShow(false)
    }
    // delete product
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
                                <th>Published</th>
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
                                                {item.picture
                                                ?
                                                    <img
                                                        className="img-fluid admin-products-image"
                                                        alt="product-images"
                                                        src={`http://localhost:8000/assets/product_images/${item.picture}`}
                                                    />
                                                :
                                                    <img
                                                        className="img-fluid admin-products-image"
                                                        alt="product-images"
                                                        src={NoImage}
                                                    />
                                                }
                                            </th>
                                            <th className="pt-4"><h6>{item.name}</h6></th>
                                            <th className="pt-4"><h6>{item.description}</h6></th>
                                            <th className="pt-4"><h6>{item.brand}</h6></th>

                                            <th className="pt-4">
                                                <ul>
                                                    <h6>
                                                        <li>
                                                            <span className="text-danger">Color:<br /></span>
                                                            <span
                                                                className="centering-objects admin-product-color-box"
                                                                style={{backgroundColor: `${item.color}`}}
                                                            >
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
                                                <h6>
                                                    {item.published === 1
                                                    ?
                                                        <span className="text-success">Published</span>
                                                    :
                                                        <span className="text-danger">Unpublished</span>
                                                    }
                                                </h6>
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
                    {!updatedProduct
                        ?
                        <LoadingSpinner /> :
                        (<>
                                <label htmlFor="name" className="labels">Name</label>
                                 <h6 className="errors text-danger labels">{formErrors.name}</h6>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="form-control my-3"
                                    placeholder="Name"
                                    onChange={adminHandleChangeUpdate}
                                    value={updatedProduct.name}
                                />

                                <label htmlFor="description" className="labels">Description</label>
                                <h6 className="errors text-danger labels">{formErrors.description}</h6>
                                <input
                                    id="description"
                                    type="text"
                                    name="description"
                                    className="form-control my-3"
                                    placeholder="Description"
                                    onChange={adminHandleChangeUpdate}
                                    value={updatedProduct.description}
                                />

                                <label htmlFor="brand" className="labels">Brand</label>
                                <h6 className="errors text-danger labels">{formErrors.brand}</h6>
                                <input
                                    id="brand"
                                    type="text"
                                    name="brand"
                                    className="form-control my-3"
                                    placeholder="Brand"
                                    onChange={adminHandleChangeUpdate}
                                    value={updatedProduct.brand}
                                />

                                <label htmlFor="price" className="labels">Price</label>
                                <h6 className="errors text-danger labels">{formErrors.price}</h6>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    className="form-control my-3"
                                    placeholder="Price"
                                    onChange={adminHandleChangeUpdate}
                                    value={updatedProduct.price}
                                />

                                <label htmlFor="in-stock" className="labels">In stock</label>
                                <h6 className="errors text-danger labels">{formErrors.inStock}</h6>
                                <input
                                    id="in-stock"
                                    type="number"
                                    name="inStock"
                                    className="form-control my-3"
                                    placeholder="In stock"
                                    onChange={adminHandleChangeUpdate}
                                    value={updatedProduct.inStock}
                                />

                                <label htmlFor="color" className="labels">Color</label>
                                <h6 className="errors text-danger labels">{formErrors.color}</h6>
                                <input
                                    id="color"
                                    type="color"
                                    name="color"
                                    className="form-control my-3"
                                    placeholder="Color"
                                    onChange={adminHandleChangeUpdate}
                                    value={updatedProduct.color}
                                />

                                <label htmlFor="size" className="labels">Size</label>
                                <select
                                        id="size"
                                        onChange={adminHandleChangeUpdate}
                                        className="form-select my-3"
                                        name="size"
                                        aria-label="Default select example"
                                        value={updatedProduct.size}
                                >
                                    <option defaultValue>Select size</option>
                                    {
                                        getProductSizes && getProductSizes.map((item) => {
                                            return (<option key={uuid()} value={item.size}>{item.size}</option>)
                                        })
                                    }
                                </select>

                                <label htmlFor="category" className="labels">Category</label>
                                <select
                                        id="category"
                                        onChange={adminHandleChangeUpdate}
                                        className="form-select my-3"
                                        name="category"
                                        aria-label="Default select example"
                                        value={updatedProduct.category}
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
