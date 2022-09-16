import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_PRODUCTDETAILS_REQUEST } from '../redux/allProducts/actions';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import LoadingSpinner from './LoadingSpinner';
import { ADD_TO_CART_REQUEST } from '../redux/userCart/actions';
import { Button, Modal } from 'react-bootstrap';
import NoImage from "../assets/No-Image.jpg";

const ProductDetails = () => {
    let { id } = useParams();
    const { productDetail, loading } = useSelector((state) => state.allProducts)
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [productDetails, setProductDetails] = useState([]);
    const [chosenId, setChosenId] = useState(null);
    const [stock, setStock] = useState();
    const [productCount, setProductCount] = useState(null);

    const handleClose = () => setShow(false);

    const handleShow = (event, id, inStock) => {
        setShow(true);
        setStock(inStock)
        setChosenId(id)
    }

    const handleCount = ({ target }) => {
        setProductCount(target.value)
    }

    useEffect(() => {
        dispatch({
            type: GET_PRODUCTDETAILS_REQUEST,
            payload: id
        })
    }, []);

    useEffect(() => {
        if (!loading) {
            setProductDetails(productDetail)
        }
    }, [loading])

    const addToCart = () => {
        if (localStorage.getItem('token')) {
            // registered user
            dispatch({
                type: ADD_TO_CART_REQUEST,
                payload: chosenId, productCount
            })
        } else {
            // not registered user
            let addedToCart = []
            if(!JSON.parse(localStorage.getItem('addedToCart'))){
                addedToCart.push({
                    id: chosenId,
                    count: productCount
                });
                localStorage.setItem('addedToCart', JSON.stringify(addedToCart));
            }else{
                addedToCart = JSON.parse(localStorage.getItem('addedToCart'));
                let test = addedToCart.filter( key => key['id'] === chosenId )
                if (test) {
                    addedToCart.push({
                        id: chosenId,
                        count: productCount
                    });
                    localStorage.setItem('addedToCart', JSON.stringify(addedToCart));
                }
            }
        }
        setShow(false);
    }

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
                                                {productDetailItem.picture
                                                ?
                                                    <img
                                                        className="img-fluid "
                                                        alt="product-images"
                                                        width="80%"
                                                        src={`http://localhost:8000/assets/product_images/${productDetailItem.picture}`}
                                                    />
                                                :
                                                    <img
                                                        className="img-fluid admin-products-image"
                                                        alt="product-images"
                                                        src={NoImage}
                                                    />
                                                }
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

                                    <div className="product-details-columns-add-to-cart">
                                        <button
                                            className="btn btn-success"
                                            onClick={event => handleShow(event, productDetailItem.id, productDetailItem.in_stock)}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            )
                        }

                        {/* MODAL */}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Choose product count, max {stock}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input
                                    type="number"
                                    name="count"
                                    className="form-control"
                                    defaultValue="1"
                                    max={stock}
                                    placeholder={"Count of product, max" + stock}
                                    onChange={handleCount}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant= "primary" onClick={addToCart}>
                                    Add to cart
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>)
            }
        </div>
    )
}

export default ProductDetails
