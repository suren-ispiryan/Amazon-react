import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { UPDATE_PRODUCT_REQUEST } from '../../../redux/myStore/actions';
import LoadingSpinner from '../../helpers/LoadingSpinner';
import {useEffect, useState} from "react";
import {GET_PRODUCT_CATEGORIES_REQUEST, GET_PRODUCT_SIZES_REQUEST} from "../../../redux/adminProductParameters/actions";
import uuid from "react-uuid";

const MyStoreUpdate = ({ initialValues, show, setShow, productImage, updatedProduct, setUpdatedProduct }) => {
    const { categories, loading } = useSelector((state) => state.categories)
    const [getCategories, setGetCategories] = useState([])
    const [getProductSizes, setGetProductSizes] = useState([]);
    const { sizes } = useSelector((state) => state.sizes)
    const dispatch = useDispatch();

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
    }, [sizes])
    //change product
    const handleChangeUpdate = ({target}) => {
        setUpdatedProduct({
            ...updatedProduct,
            [target.name]: target.value,
        })
        if (target.name === 'picture') {
            setUpdatedProduct({
                ...updatedProduct,
                [target.name]: target.files[0],
            })
        }
    }

    const update = (event, id) => {
        setShow(false)
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
        dataUpdate.append('in_stock', updatedProduct.in_stock);
        productImage.current.value = ''
        dispatch({
            type: UPDATE_PRODUCT_REQUEST,
            payload: dataUpdate
        })
    }
    // close modal
    const handleClose = () => {
        setShow(false);
        setUpdatedProduct(initialValues)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!updatedProduct.name
                    ?
                        <LoadingSpinner /> :
                    (<>
                        <label htmlFor="name" className="labels">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            className="form-control my-3"
                            placeholder="Name"
                            onChange={handleChangeUpdate}
                            value={updatedProduct.name}
                        />
                        <label htmlFor="description" className="labels">Description</label>
                        <input
                            id="description"
                            type="text"
                            name="description"
                            className="form-control my-3"
                            placeholder="Description"
                            onChange={handleChangeUpdate}
                            value={updatedProduct.description}
                        />
                        <label htmlFor="bread" className="labels">Brand</label>
                        <input
                            id="brand"
                            type="text"
                            name="brand"
                            className="form-control my-3"
                            placeholder="Brand"
                            onChange={handleChangeUpdate}
                            value={updatedProduct.brand}
                        />
                        <label htmlFor="price" className="labels">Price</label>
                        <input
                            id="price"
                            type="number"
                            name="price"
                            className="form-control my-3"
                            placeholder="Price"
                            onChange={handleChangeUpdate}
                            value={updatedProduct.price}
                        />
                        <label htmlFor="in_stock" className="labels">In stock</label>
                        <input
                            id="in_stock"
                            type="number"
                            name="in_stock"
                            className="form-control my-3"
                            placeholder="In stock"
                            min="0"
                            onChange={handleChangeUpdate}
                            value={updatedProduct.in_stock}
                        />
                        <label htmlFor="color" className="labels">Color</label>
                        <input
                            id="color"
                            type="color"
                            name="color"
                            className="form-control my-3"
                            placeholder="Color"
                            onChange={handleChangeUpdate}
                            value={updatedProduct.color}
                        />
                        <label htmlFor="size" className="labels">Size</label>
                        <select
                                id="size"
                                onChange={handleChangeUpdate}
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
                                onChange={handleChangeUpdate}
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
                                onChange={handleChangeUpdate}
                            />
                        </div>
                    </>
                )}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={event => update(event, updatedProduct.id)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyStoreUpdate;
