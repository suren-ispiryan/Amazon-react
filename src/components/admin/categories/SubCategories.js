import {useEffect, useState} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import uuid from "react-uuid";
import {
    ADD_SUBCATEGORY_REQUEST,
    GET_PRODUCT_SUBCATEGORIES_REQUEST,
    REMOVE_SUBCATEGORY_REQUEST
} from "../../../redux/adminProductParameters/actions";
import {useDispatch, useSelector} from "react-redux";
const categoryInitial = '';

const SubCategories = () => {
    const dispatch = useDispatch();
    //get parent categories
    const {categories} = useSelector((state) => state.categories)
    //create
    const [subCategory, setSubCategory] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    //get subcategories
    const {subCategories, loadingSub} = useSelector((state) => state.subCategories)
    const [getCategories, setGetCategories] = useState([])
    const [createSubcategory, setCreateSubcategory] = useState('')

    //create
    const adminHandleChangeCategory = ({target}) => {
        setParentCategory(target.value)
    }

    const handleChange = ({target}) => {
        setSubCategory(target.value)
    }

    const addSubCategory = () => {
        if (subCategory && parentCategory) {
            dispatch({
                type: ADD_SUBCATEGORY_REQUEST,
                payload: {
                    subCategory: subCategory,
                    parentCategory: parentCategory
                }
            })
            setSubCategory(categoryInitial)
            setParentCategory(categoryInitial)
            setCreateSubcategory('')
        } else {
            setCreateSubcategory('Category and subcategory are required')
        }
    }

    //show
    useEffect(() => {
        dispatch({
            type: GET_PRODUCT_SUBCATEGORIES_REQUEST
        })
    }, [])

    useEffect(() => {
        if (!loadingSub) {
            setGetCategories(subCategories)
        }
    }, [loadingSub])

    //remove
    const removeSubcategory = (event, id) => {
        dispatch({
            type: REMOVE_SUBCATEGORY_REQUEST,
            payload: id
        })
    }

    const clearError = () => {
        setCreateSubcategory('')
    }

    return(
        <>
            <h5 className="text-primary">subcategories</h5>

            <div className="row">
                <div className="text-danger mb-2">{ createSubcategory ? createSubcategory : '' }</div>
                <div className="col-md-4">
                    <select
                        id="categories"
                        onChange={adminHandleChangeCategory}
                        className="form-select"
                        name="categories"
                        aria-label="Default select example"
                        value={parentCategory}
                    >
                        <option defaultValue>Select category</option>
                        {
                            categories && categories.map((item) => {
                                return (<option key={uuid()} value={item.category}>{item.category}</option>)
                            })
                        }
                    </select>
                </div>


                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        name="categories"
                        placeholder="Category"
                        onChange={handleChange}
                        value={subCategory}
                    />
                </div>

                <div className="col-md-3">
                    <button
                        className="form-control btn btn-primary"
                        onClick={addSubCategory}
                        onBlur={clearError}
                    >
                        Add
                    </button>
                </div>
            </div>


                <hr/>

            <div className="row mt-3">
                <div className="col-md-12">
                    <ListGroup horizontal className="d-flex flex-wrap">
                        {
                            getCategories.map((item) => {
                                    return (
                                        <ListGroup.Item
                                            key={uuid()}
                                            className="bg-primary text-white mx-1 my-1 admin-product-items"
                                        >
                                            {item.subcategory} -> {item.category.category}
                                            <button
                                                className="admin-delete-category btn btn-danger"
                                                onClick={event => removeSubcategory(event, item.id)}
                                            >
                                                &#x2716;
                                            </button>
                                        </ListGroup.Item>
                                    )
                                }
                            )
                        }
                    </ListGroup>
                </div>
            </div>
        </>
    )
}

export default SubCategories;
