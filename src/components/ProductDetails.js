import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_PRODUCTDETAILS_REQUEST } from '../redux/allProducts/actions';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import LoadingSpinner from './LoadingSpinner';

const ProductDetails = ({ client }) => {
    let { id } = useParams();
    const { productDetail, loading } = useSelector((state) => state.allProducts)
    const dispatch = useDispatch();

    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        dispatch({
            type: GET_PRODUCTDETAILS_REQUEST,
            payload: id, client
        })
    }, []);

    useEffect(() => {
        if (!loading) {
            setProductDetails(productDetail)
        }
    }, [loading])

    return (
        <div>
            {loading
                ?
                    <LoadingSpinner />
                :
                    (<>
                        <h3 className="mt-3">Product Number {id}</h3>
                        {
                            productDetails.map(productDetailItem =>
                                <div className="container" key={ uuid()}>
                                    <div className="row py-5">
                                        <div className="col-md-6">
                                            <div className="product-details-image-box">
                                                <img
                                                    className="img-fluid "
                                                    alt="product-images"
                                                    width="80%"
                                                    src={`http://localhost:8000/assets/product_images/${productDetailItem.picture}`}
                                                />
                                            </div>

                                            <div className="product-owner-columns">Owner:
                                                 <b> {productDetailItem.user.name} {productDetailItem.user.surname}</b>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <h4 className="mt-3">Detailed description</h4>

                                            <div className="product-details-columns pt-4">Name: {productDetailItem.name}</div><hr/>
                                            <div className="product-details-columns">Brand: {productDetailItem.brand}</div><hr/>
                                            <div className="product-details-columns">Description: {productDetailItem.description}</div><hr/>
                                            <div className="product-details-columns">Category: {productDetailItem.category}</div><hr/>
                                            <div className="product-details-columns">Size: {productDetailItem.size}</div><hr/>
                                            <div className="row">
                                                <div className="col-md-6 mx-3 text-lg-start product-details-columns details-color">Color: </div>
                                                <div
                                                    className="col-md-6 centering-objects product-details-color-box mt-3"
                                                    style={{backgroundColor: `${productDetailItem.color}`}}/>
                                            </div><hr/>
                                            <div className="product-details-columns">Price: {productDetailItem.price} $</div><hr/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </>)
            }
        </div>
    )
}

export default ProductDetails
