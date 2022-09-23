import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    ADD_CATEGORY_REQUEST,
    GET_PRODUCT_CATEGORIES_REQUEST,
    REMOVE_CATEGORY_REQUEST
} from '../../../redux/adminProductParameters/actions';
import ListGroup from 'react-bootstrap/ListGroup';
import uuid from 'react-uuid';

const categoryInitial = '';

const Categories = () => {
    const dispatch = useDispatch();
    // create
    const [category, setCategory] = useState('');
    // show
    const {categories, loading} = useSelector((state) => state.categories)
    const [getCategories, setGetCategories] = useState([]);
    const [createCategory, setCreateCategory] = useState('');

    // add data
    const handleChange = ({target}) => {
        setCategory(target.value)
    }

    const addCategory = () => {
        if (category) {
            dispatch({
                type: ADD_CATEGORY_REQUEST,
                payload: {
                    category: category
                }
            })
            setCategory(categoryInitial)
            setCreateCategory('')
        } else {
            setCreateCategory('Category is required')
        }
    }

    // show data
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

    // remove data
    const removeCategory = (event, id) => {
        dispatch({
            type: REMOVE_CATEGORY_REQUEST,
            payload: id
        })
    }

    const clearError = () => {
        setCreateCategory('')
    }

    return(
        <>
            <h5 className="text-primary">categories</h5>

            <div className="row">
                <div className="text-danger mb-2">{ createCategory ? createCategory : '' }</div>
                <div className="col-md-9">
                    <input
                        type="text"
                        className="form-control"
                        name="categories"
                        placeholder="Category"
                        onChange={handleChange}
                        value={category}
                    />
                </div>

                <div className="col-md-3">
                    <button
                        className="form-control btn btn-primary"
                        onClick={addCategory}
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
                                        {item.category}
                                        <button
                                            className="admin-delete-category btn btn-danger"
                                            onClick={event => removeCategory(event, item.id)}
                                        >
                                            &#x2716;
                                        </button>
                                    </ListGroup.Item>
                                )
                            }
                        )}
                    </ListGroup>
                </div>
            </div>
        </>
    )
}

export default Categories;
