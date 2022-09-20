import { useEffect, useState } from 'react';
import {
    GET_PRODUCTS_FOR_LATER_REQUEST,
    REMOVE_PRODUCT_FOR_LATER_REQUEST
} from '../redux/saveForLater/actions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import uuid from 'react-uuid';
import { GetColorName } from 'hex-color-to-color-name';
import { Link } from 'react-router-dom';
import NoImage from "../assets/No-Image.jpg";

const SavedForLater = () => {
    const {savedForLater, loading} = useSelector((state) => state.savedForLater)
    const [allSavedForLaterProducts, setAllSavedForLaterProducts] = useState([])
    const dispatch = useDispatch();

    //add product to save for later
    useEffect(() => {
        dispatch({
            type: GET_PRODUCTS_FOR_LATER_REQUEST
        })
    }, []);

    useEffect(() => {
        if (!loading) {
            setAllSavedForLaterProducts(savedForLater)
        }
    }, [loading])

    //remove product from save for later
    const removeProduct = (event, id) => {
        dispatch({
            type: REMOVE_PRODUCT_FOR_LATER_REQUEST,
            payload: id
        })
    }

    return (
        <div className="col-md-12 px-5">
            {loading
                ?
                <LoadingSpinner />
                :
                (<>
                    <h4 className="my-4">Favorite products</h4>

                    <div className="row my-store-parent-row">
                        {
                            allSavedForLaterProducts.map((product) => {
                                return (
                                    <div className="col-md-4 col-xl-2 users-products" key={uuid()}>
                                        <div className="row">
                                            <div className="text-success col-md-6 px-4 text-start">
                                                <span className="text-danger">Name: </span>
                                                {product.name}
                                            </div>
                                            <div className="text-success col-md-6">
                                                <i className="products-count p-2">{product.in_stock} pcs left</i>
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="product-images">
                                            {product.picture
                                                ?
                                                <img
                                                    className="img-fluid product-image"
                                                    alt="product-images"
                                                    src={`http://localhost:8000/assets/product_images/${product.picture}`}
                                                />
                                                :
                                                <img
                                                    className="img-fluid admin-products-image"
                                                    alt="product-images"
                                                    src={NoImage}
                                                />
                                            }
                                        </div>
                                        <hr/>

                                        <div className="text-danger">description:</div>
                                        <div>{product.description}</div>
                                        <hr/>

                                        <div className="row auth-user-posts-action">
                                            <div className="col-md-5">
                                                <div className="text-danger centering-objects">size:</div>
                                                <div className="centering-objects">{product.size}</div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="text-danger centering-objects">color:</div>
                                                <div className="centering-objects product-color-box" style={{backgroundColor: `${product.color}`}}>
                                                    {GetColorName(product.color)}
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row auth-user-posts-action">
                                            <div className="col-md-5">
                                                <div className="text-danger centering-objects">owner:</div>
                                                <div className="centering-objects">{product.user && product.user.name}</div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="text-danger centering-objects">price:</div>
                                                <div className="centering-objects">{product.price}$</div>
                                            </div>
                                        </div>

                                        <hr/>
                                        <div className="row">
                                            <div className="col-md-12 auth-user-posts-action-btn">
                                                <Link to={"/product-details/"+product.id}>
                                                    <button
                                                        className="btn btn-primary"
                                                    >
                                                        See details
                                                    </button>
                                                </Link>

                                                <button
                                                    className="btn btn-danger"
                                                    onClick={event => removeProduct(event, product.id)}
                                                >
                                                    Remove
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
    );
}

export default SavedForLater;
