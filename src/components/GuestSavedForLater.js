import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GET_SAVEDFORLATER_REQUEST} from '../redux/guestSavedForLater/actions';
import LoadingSpinner from "./LoadingSpinner";
import uuid from "react-uuid";
import NoImage from "../assets/No-Image.jpg";
import {GetColorName} from "hex-color-to-color-name";
import {Link} from "react-router-dom";

const GuestSavedForLater = () => {
    const dispatch = useDispatch();
    const [savedProducts, setSavedProducts] = useState([]);
    const {guestSavedForLaterProducts, loading} = useSelector((state) => state.guestSavedForLaterProducts)
    const [allSavedProducts, setAllSavedProducts] = useState([]);
    const [localstorageData, setLocalstorageData] = useState([]);

    useEffect(() => {
        setSavedProducts(JSON.parse(localStorage.getItem('savedForLater')))
    }, [localstorageData]);

    useEffect(() => {
        dispatch({
            type: GET_SAVEDFORLATER_REQUEST,
            payload: {
                savedProducts: savedProducts
            }
        })
    }, [savedProducts]);

    useEffect(() => {
        if (!loading) {
            setAllSavedProducts(guestSavedForLaterProducts)
        }
    }, [loading])

    const removeFromSaved = (event, productId) => {
        let productIdArr = [];
        productIdArr = JSON.parse(localStorage.getItem('savedForLater'));
        for(let i=0; i<productIdArr.length; i++){
            if(productIdArr[i] === productId){
                productIdArr.splice(i, 1);
            }
        }
        localStorage.setItem('savedForLater', JSON.stringify(productIdArr));
        setLocalstorageData(productIdArr)
    }

    const removeFromSavedLs = (event, id) => {
        let productIdArr = [];

        productIdArr = JSON.parse(localStorage.getItem('savedForLater'));
        for(let i=0; i<productIdArr.length; i++){
            if(i == id){
                productIdArr.splice(i, 1);
            }
        }
        localStorage.setItem('savedForLater', JSON.stringify(productIdArr));
        setLocalstorageData(productIdArr)
    }


    return (
        <div className="col-md-12 px-5">
            {loading
                ?
                <LoadingSpinner />
                :
                (<>
                    <h4 className="my-4">All products</h4>

                    <div className="row my-store-parent-row">
                        {
                            allSavedProducts.length > 0 ?
                                allSavedProducts.map((product, index) => {
                                    return (
                                        product !== null && product.published === 1 ?
                                            <div className="col-md-4 col-xl-2 users-products" key={uuid()}>
                                                <div className="row">
                                                    <div className="text-success col-md-6 px-4 text-start">
                                                        <span className="text-danger">Name: </span>
                                                        {product.name}
                                                    </div>
                                                    <div className="text-success col-md-6">
                                                        <p className="products-count p-2 mx-2">{product.in_stock} pcs left</p>
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
                                                            onClick={event => removeFromSaved(event, product.id)}
                                                            className="btn btn-danger"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="col-md-4 col-xl-2 users-products" key={uuid()}>
                                                <div>
                                                    <img
                                                        className="img-fluid admin-products-image"
                                                        alt="product-images"
                                                        src={NoImage}
                                                    />
                                                </div>
                                                <div key={uuid()}>Sorry, owner deleted product</div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-md-12 auth-user-posts-action-btn">
                                                        <button
                                                            onClick={event => removeFromSavedLs(event, index)}
                                                            className="btn btn-danger"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                    )
                                })
                            :
                            (<div className="no-item text-danger">No product</div>)
                        }
                    </div>
                </>)
            }
        </div>
    );
}

export default GuestSavedForLater;
