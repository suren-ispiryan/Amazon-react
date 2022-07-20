import { useState } from 'react';

const initialValues = {
        name: '',
        description: '',
        brand: '',
        price: '',
        color: '',
        size: '',
        category: ''
}

const MyStoreCreate = ({client, createProductItem, setCreateProductItem, productImage}) => {
    const [productAttributes, setProductAttributes] = useState({});
    const [formErrors, setFormErrors ] = useState({});
    const [isSubmited, setIsSubmited ] = useState(false);

    const handleChange = ({target}) => {
        setProductAttributes({
            ...productAttributes,
            [target.name]: target.value,
        })
        if (target.name === 'picture') {
            setProductAttributes({
                ...productAttributes,
                [target.name]: target.files[0],
            })
        }
    }

    const createProduct = () => {
        setCreateProductItem({
            ...productAttributes
        })
        setFormErrors(validate(productAttributes));
        setIsSubmited(true);
        if (Object.keys(formErrors).length === 0 && isSubmited) {
            const data = new FormData();
            data.append('name', createProductItem.name);
            data.append('description', createProductItem.description);
            data.append('brand', createProductItem.brand);
            data.append('price', createProductItem.price);
            data.append('color', createProductItem.color);
            data.append('size', createProductItem.size);
            data.append('category', createProductItem.category);
            data.append('picture', createProductItem.picture);
            client.post('/create-product', data)
                .then(function (response) {
                    if (response.status === 200) {
                        productImage.current.value = ''
                        setProductAttributes(initialValues);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    }

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'name is required';
        }
        if (!values.description) {
            errors.description = 'description is required';
        }
        if (!values.brand) {
            errors.brand = 'brand is required';
        }
        if (!values.price) {
            errors.price = 'price is required';
        }
        if (!values.color) {
            errors.color = 'color is required';
        }
        if (!values.size) {
            errors.size = 'size is required';
        }
        if (!values.category) {
            errors.category = 'category is required';
        }
        if (!values.picture) {
            errors.picture = 'picture is required';
        }
        return errors;
    }

    return (
        <div className="col-lg-4 col-md-12 product-create-parent">
            <div className="row d-flex justify-content-center">
                <div className="col-md-10 m-1 create-product-form">
                    <h4 className="my-4">Create a product</h4>

                    <input
                        type="text"
                        name="name"
                        className="form-control my-2"
                        placeholder="Name"
                        onChange={handleChange}
                        value={productAttributes.name || ''}
                    />
                    <h6 className="errors text-danger">{formErrors.name}</h6>

                    <input
                        type="text"
                        name="description"
                        className="form-control my-2"
                        placeholder="Description"
                        onChange={handleChange}
                        value={productAttributes.description || ''}
                    />
                    <h6 className="errors text-danger">{formErrors.description}</h6>

                    <input
                        type="text"
                        name="brand"
                        className="form-control my-2"
                        placeholder="Brand"
                        onChange={handleChange}
                        value={productAttributes.brand || ''}
                    />
                    <h6 className="errors text-danger">{formErrors.brand}</h6>

                    <input
                        type="number"
                        name="price"
                        className="form-control my-2"
                        placeholder="Price"
                        onChange={handleChange}
                        value={productAttributes.price || ''}
                    />
                    <h6 className="errors text-danger">{formErrors.price}</h6>

                    <input
                        type="color"
                        name="color"
                        className="form-control my-2"
                        placeholder="Color"
                        onChange={handleChange}
                        value={productAttributes.color || '#000000'}
                    />
                    <h6 className="errors text-danger">{formErrors.color}</h6>
                    <select

                        className="form-select my-2"
                        name="size"
                        aria-label="Default select example"
                        onChange={handleChange}
                        value={productAttributes.size || ''}
                    >
                        <option defaultValue>Select size</option>
                        <option value="small">small</option>
                        <option value="medium">medium</option>
                        <option value="big">big</option>
                    </select>
                    <h6 className="errors text-danger">{formErrors.size}</h6>

                    <select
                            className="form-select my-2"
                            name="category"
                            aria-label="Default select example"
                            onChange={handleChange}
                            value={productAttributes.category || ''}
                    >
                        <option defaultValue>Select category</option>
                        <option value="toys">toys</option>
                        <option value="clothes">clothes</option>
                        <option value="furniture">furniture</option>
                        <option value="phones">phones</option>
                        <option value="food">food</option>
                    </select>
                    <h6 className="errors text-danger">{formErrors.category}</h6>

                    <div className="form-group">
                        <input
                            name="picture"
                            type="file"
                            className="form-control-file my-3"
                            id="exampleFormControlFile1"
                            ref={productImage}
                            onChange={handleChange}
                        />
                    </div>
                    <h6 className="errors text-danger">{formErrors.picture}</h6>

                    <button
                        onClick={createProduct}
                        className="btn btn-success my-3"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyStoreCreate;
