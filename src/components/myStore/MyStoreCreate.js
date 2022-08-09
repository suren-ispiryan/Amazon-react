import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_PRODUCT_REQUEST } from '../../redux/myStore/actions';
import {
    GET_PRODUCT_CATEGORIES_REQUEST,
    GET_PRODUCT_SIZES_REQUEST
} from '../../redux/adminProductParameters/actions';
import uuid from 'react-uuid';

const MyStoreCreate = ({ productImage, initialValues }) => {
    const dispatch = useDispatch();
    const [productAttributes, setProductAttributes] = useState({});
    const [formErrors, setFormErrors ] = useState({});
    const [isSubmited, setIsSubmited ] = useState(false);
    const { categories, loading } = useSelector((state) => state.categories)
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
    }, [sizes])

    //create product
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
        setFormErrors(validate(productAttributes));
        setIsSubmited(true);
        if (Object.keys(formErrors).length === 0) {
            const data = new FormData();
            data.append('name', productAttributes.name);
            data.append('description', productAttributes.description);
            data.append('brand', productAttributes.brand);
            data.append('price', productAttributes.price);
            data.append('color', productAttributes.color);
            data.append('size', productAttributes.size);
            data.append('category', productAttributes.category);
            data.append('picture', productAttributes.picture);
            data.append('inStock', productAttributes.inStock);
            productImage.current.value = ''
            setProductAttributes(initialValues)
            dispatch({
                type: CREATE_PRODUCT_REQUEST,
                payload: data
            })
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
        if (!values.inStock) {
            errors.inStock = 'inStock is required';
        }
        return errors;
    }

    return (
        <div className="col-lg-4 col-md-12 mt-5 product-create-parent">
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
                        min="0"
                        onChange={handleChange}
                        value={productAttributes.price || ''}
                    />
                    <h6 className="errors text-danger">{formErrors.price}</h6>

                    <input
                        type="number"
                        name="inStock"
                        className="form-control my-2"
                        placeholder="InStock"
                        min="0"
                        onChange={handleChange}
                        value={productAttributes.inStock || ''}
                    />
                    <h6 className="errors text-danger">{formErrors.inStock}</h6>

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
                        {
                            getProductSizes && getProductSizes.map((item) => {
                                return (<option key={uuid()} value={item.size}>{item.size}</option>)
                            })
                        }
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
                        {
                            getCategories && getCategories.map((item) => {
                                return (<option key={uuid()} value={item.category}>{item.category}</option>)
                            })
                        }
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
