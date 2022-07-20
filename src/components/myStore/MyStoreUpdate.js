import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MyStoreUpdate = ({
    client,
    show,
    setShow,
    setUpdateProductItem,
    updateProductItem,
    productImage,
    updatedProduct
}) => {

    const [productUpdateAttributes, setProductUpdateAttributes] = useState({});

    const handleChangeUpdate = ({target}) => {
        setProductUpdateAttributes({
            ...productUpdateAttributes,
            [target.name]: target.value,
        })
        if (target.name === 'picture') {
            setProductUpdateAttributes({
                ...productUpdateAttributes,
                [target.name]: target.files[0],
            })
        }
    }

    const handleClose = () => setShow(false);

    const update = () => {
        setUpdateProductItem({
            ...productUpdateAttributes,
            id: updatedProduct.id
        })
        setShow(false)
        const dataUpdate = new FormData();
        dataUpdate.append('id', updateProductItem.id);
        dataUpdate.append('name', updateProductItem.name);
        dataUpdate.append('description', updateProductItem.description);
        dataUpdate.append('brand', updateProductItem.brand);
        dataUpdate.append('price', updateProductItem.price);
        dataUpdate.append('color', updateProductItem.color);
        dataUpdate.append('size', updateProductItem.size);
        dataUpdate.append('category', updateProductItem.category);
        dataUpdate.append('picture', updateProductItem.picture);
        client.post('/update-product', dataUpdate)
            .then(function (response) {
                if (response.status === 200) { console.log(response.data) }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    name="name"
                    className="form-control my-3"
                    placeholder="Name"
                    onChange={handleChangeUpdate}
                    value={productUpdateAttributes.name || updatedProduct.name}
                />

                <input
                    type="text"
                    name="description"
                    className="form-control my-3"
                    placeholder="Description"
                    onChange={handleChangeUpdate}
                    value={productUpdateAttributes.description || updatedProduct.description}
                />

                <input
                    type="text"
                    name="brand"
                    className="form-control my-3"
                    placeholder="Brand"
                    onChange={handleChangeUpdate}
                    value={productUpdateAttributes.brand || updatedProduct.brand}
                />

                <input
                    type="number"
                    name="price"
                    className="form-control my-3"
                    placeholder="Price"
                    onChange={handleChangeUpdate}
                    value={productUpdateAttributes.price || updatedProduct.price}
                />

                <input
                    type="color"
                    name="color"
                    className="form-control my-3"
                    placeholder="Color"
                    onChange={handleChangeUpdate}
                    value={productUpdateAttributes.color || updatedProduct.color}
                />

                <select onChange={handleChangeUpdate}
                        className="form-select my-3"
                        name="size"
                        aria-label="Default select example"
                        value={productUpdateAttributes.size || updatedProduct.size}
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
                        value={productUpdateAttributes.category || updatedProduct.category}
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={update}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyStoreUpdate;
