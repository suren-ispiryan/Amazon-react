import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_SIZE_REQUEST,
    GET_PRODUCT_SIZES_REQUEST,
    REMOVE_SIZE_REQUEST
} from "../../../redux/adminProductParameters/actions";
import ListGroup from "react-bootstrap/ListGroup";
import uuid from "react-uuid";

const sizeInitial = '';

const Sizes = () => {
    const dispatch = useDispatch();
    // create
    const [size, setSize] = useState('');
    // show
    const [getProductSizes, setGetProductSizes] = useState([]);
    const {sizes, loading} = useSelector((state) => state.sizes)


    // CREATE
    const handleChange = ({target}) => {
        setSize(target.value)
    }

    const addSize = () => {
        dispatch({
            type: ADD_SIZE_REQUEST,
            payload: {
                size: size
            }
        })
        setSize(sizeInitial)
    }

    // SHOW
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

    // REMOVE
    const removeSizes = (event, id) => {
        dispatch({
            type: REMOVE_SIZE_REQUEST,
            payload: id
        })
    }

    return(
        <>
            <h5 className="text-primary">sizes</h5>

            <div className="row">
                <div className="col-md-9">
                    <input
                        type="text"
                        className="form-control"
                        name="sizes"
                        placeholder="Size"
                        onChange={handleChange}
                        value={size}
                    />
                </div>

                <div className="col-md-3">
                    <button
                        className="form-control btn btn-primary"
                        onClick={addSize}
                    >
                        Add size
                    </button>
                </div>
            </div>

            <hr/>

            <div className="row mt-3">
                <div className="col-md-12">
                    <ListGroup horizontal className="d-flex flex-wrap">
                        {
                            getProductSizes.map((item) => {
                                    return (
                                        <ListGroup.Item
                                            key={uuid()}
                                            className="bg-primary text-white mx-1 my-1 admin-product-items"
                                        >
                                            {item.size}
                                            <button
                                                className="admin-delete-category btn btn-danger"
                                                onClick={event => removeSizes(event, item.id)}
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

export default Sizes;
