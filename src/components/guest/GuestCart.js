import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import { GUEST_PRODUCT_GET_REQUEST } from '../../redux/userCart/actions';
import LoadingSpinner from "../helpers/LoadingSpinner";
import {Link} from "react-router-dom";
import NoImage from "../../assets/No-Image.jpg";

const GuestCart = () => {
    const dispatch = useDispatch();
    const {addedToCart, loading, message} = useSelector((state) => state.addedToCart)
    const [allGuestProducts, setAllGuestProducts] = useState([])
    const [productNewIds, setProductNewIds] = useState(null)

    useEffect(() => {
        const guestCartProducts = (JSON.parse(localStorage.getItem('addedToCart')))
        dispatch({
            type: GUEST_PRODUCT_GET_REQUEST,
            payload: {guestCartProducts: guestCartProducts}
        })
    }, [productNewIds]);

    useEffect(() => {
        if (!loading) {
            setAllGuestProducts(addedToCart)
        }
    }, [loading])

    const removeFromGuestCart = (event, id) => {
        let productIds;
        productIds = JSON.parse(localStorage.getItem('addedToCart'));
        for(let i=0; i < productIds.length; i++){
            if(productIds[i].id === id){
                productIds.splice(i, 1);
            }
        }
        localStorage.setItem('addedToCart', JSON.stringify(productIds));
        setProductNewIds(productIds);
    }

    return (
        <div className="col-md-12 px-5">
            {loading
                ?
                <LoadingSpinner />
                :
                (<>
                    <h4 className="my-4">Products on cart</h4>

                    <div className="row my-store-parent-row">
                        {
                            allGuestProducts.length ? allGuestProducts.map((item) => {
                                return (
                                    <div className="col-md-4 col-lg-3 users-products" key={uuid()}>
                                        <div className="row">
                                            <div className="text-success col-md-6">
                                                <span className="text-danger">Name: </span>
                                                <span>{item.name}</span>
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="product-images">
                                            { item.picture ?
                                                <img
                                                    className="img-fluid product-image"
                                                    alt="product-images"
                                                    src={`http://localhost:8000/assets/product_images/${item.picture}`}
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
                                        <div>{item.description}</div>
                                        <hr/>

                                        <div className="row auth-user-posts-action">
                                            <div className="col-md-5">
                                                <div className="text-danger centering-objects">size:</div>
                                                <div className="centering-objects">{item.size}</div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="text-danger centering-objects">color:</div>
                                                <div className="centering-objects product-color-box" style={{backgroundColor: `${item.color}`}} />
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
                                                <div className="centering-objects">{item.price}$</div>
                                            </div>
                                        </div>

                                        <hr/>
                                        <div className="row">
                                            <div className="col-md-12 auth-user-posts-action-btn">
                                                <Link to={"/product-details/"+item.id}>
                                                    <button
                                                        className="mx-2 btn btn-primary"
                                                    >
                                                        See details
                                                    </button>
                                                </Link>
                                                <button
                                                    className="mx-2 btn btn-danger"
                                                    onClick={event => removeFromGuestCart(event, item.id)}
                                                >
                                                    Remove from cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : (
                                <h4 className="text-danger my-5">{message}</h4>
                            )
                        }
                    </div>
                </>)
            }
        </div>
    )
}

export default GuestCart
