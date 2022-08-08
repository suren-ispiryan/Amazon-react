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
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();
    const {categories, loading} = useSelector((state) => state.categories)
    const [getCategories, setGetCategories] = useState([]);

    // add data
    const handleChange = ({target}) => {
        setCategory(target.value)
    }

    const addCategory = () => {
        dispatch({
            type: ADD_CATEGORY_REQUEST,
            payload: {
                category: category
            }
        })
        setCategory(categoryInitial)
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

    return(
        <>
            <h5 className="text-primary">categories</h5>

            <div className="row">
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
                    >
                        Add category
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
