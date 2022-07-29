import { useEffect, useState } from 'react';
import { GET_FROM_CART_REQUEST, REMOVE_FROM_CART_REQUEST } from '../redux/userCart/actions';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import LoadingSpinner from './LoadingSpinner';

const MyCart = ({ client }) => {
    const {addedToCart, loading} = useSelector((state) => state.addedToCart)
    const dispatch = useDispatch();
    const [allInCardProducts, setAllInCardProducts] = useState([])

    useEffect(() => {
        dispatch({
            type: GET_FROM_CART_REQUEST,
            payload: client
        })
    }, []);

    useEffect(() => {
        if (!loading) {
            setAllInCardProducts(addedToCart)
        }
    }, [loading])

    const removeFromCart = (event, id) => {
        dispatch({
            type: REMOVE_FROM_CART_REQUEST,
            payload: id, client
        })
    }

    return(
        <div className="col-md-12 px-5">
            {loading
                ?
                <LoadingSpinner />
                :
                (<>
                    <h4 className="my-4">Products on cart</h4>

                    <div className="row my-store-parent-row">
                        {
                            allInCardProducts.map((item) => {
                                return (
                                    <div className="col-md-2 users-products" key={uuid()}>
                                        <div className="row">
                                            <div className="text-success col-md-6">
                                                <span className="text-danger">Name: </span>
                                                <span>{item.product.name}</span>
                                            </div>
                                            <div className="text-success col-md-6">
                                                <span className="text-danger">Count: </span>
                                                <span>{item.product_count} pcs</span>
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="product-images">
                                            <img
                                                className="img-fluid product-image"
                                                alt="product-images"
                                                src={`http://localhost:8000/assets/product_images/${item.product.picture}`}
                                            />
                                        </div>
                                        <hr/>

                                        <div className="text-danger">description:</div>
                                        <div>{item.product.description}</div>
                                        <hr/>

                                        <div className="row auth-user-posts-action">
                                            <div className="col-md-5">
                                                <div className="text-danger centering-objects">size:</div>
                                                <div className="centering-objects">{item.product.size}</div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="text-danger centering-objects">color:</div>
                                                <div className="centering-objects product-color-box" style={{backgroundColor: `${item.product.color}`}} />
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row auth-user-posts-action">
                                            <div className="col-md-5">
                                                <div className="text-danger centering-objects">owner:</div>
                                                <div className="centering-objects">{item.user && item.user.name}</div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="text-danger centering-objects">price:</div>
                                                <div className="centering-objects">{item.product.price}$</div>
                                            </div>
                                        </div>

                                        <hr/>
                                        <div className="row">
                                            <div className="col-md-12 auth-user-posts-action-btn">
                                                <Link to={"/product-details/"+item.product.id}>
                                                    <button
                                                        className="btn btn-primary"
                                                    >
                                                        See details
                                                    </button>
                                                </Link>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={event => removeFromCart(event, item.product.id)}
                                                >
                                                    Remove from cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>)
            }
        </div>
    )
}

export default MyCart;
