import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { UPDATE_PRODUCT_REQUEST } from '../../redux/myStore/actions';
import LoadingSpinner from './../LoadingSpinner';

const MyStoreUpdate = ({ initialValues, client, show, setShow, productImage, updatedProduct, setUpdatedProduct }) => {

    const dispatch = useDispatch();

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

    const handleClose = () => {
        setShow(false);
        setUpdatedProduct(initialValues)
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
        dataUpdate.append('inStock', updatedProduct.inStock);
        productImage.current.value = ''
        dispatch({
            type: UPDATE_PRODUCT_REQUEST,
            payload: dataUpdate, client
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update post</Modal.Title>
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
                            onChange={handleChangeUpdate}
                            value={updatedProduct.name}
                        />

                        <input
                            type="text"
                            name="description"
                            className="form-control my-3"
                            placeholder="Description"
                            onChange={handleChangeUpdate}
                            value={updatedProduct.description}
                        />

                        <input
                            type="text"
                            name="brand"
                            className="form-control my-3"
                            placeholder="Brand"
                            onChange={handleChangeUpdate}
                            value={updatedProduct.brand}
                        />

                        <input
                            type="number"
                            name="price"
                            className="form-control my-3"
                            placeholder="Price"
                            onChange={handleChangeUpdate}
                            value={updatedProduct.price}
                        />

                        <input
                            type="number"
                            name="inStock"
                            className="form-control my-3"
                            placeholder="In stock"
                            onChange={handleChangeUpdate}
                            value={updatedProduct.inStock}
                        />

                        <input
                            type="color"
                            name="color"
                            className="form-control my-3"
                            placeholder="Color"
                            onChange={handleChangeUpdate}
                            value={updatedProduct.color}
                        />

                        <select onChange={handleChangeUpdate}
                                className="form-select my-3"
                                name="size"
                                aria-label="Default select example"
                                value={updatedProduct.size}
                        >
                            <option defaultValue>Select size</option>
                            <option value="small">small</option>
                            <option value="medium">medium</option>
                            <option value="big">big</option>
                        </select>

                        <select onChange={handleChangeUpdate}
                                className="form-select my-3"
                                name="category"
                                aria-label="Default select example"
                                value={updatedProduct.category}
                        >
                            <option defaultValue>Select category</option>
                            <option value="toys">toys</option>
                            <option value="clothes">clothes</option>
                            <option value="furniture">furniture</option>
                            <option value="phones">phones</option>
                            <option value="food">food</option>
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
