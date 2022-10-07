import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    GET_PRODUCTDETAILS_REQUEST
} from '../redux/allProducts/actions';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import LoadingSpinner from './LoadingSpinner';
import { ADD_TO_CART_REQUEST } from '../redux/userCart/actions';
import { Button, Modal } from 'react-bootstrap';
import NoImage from "../assets/No-Image.jpg";
import {
    CREATE_PRODUCT_COMMENT_REQUEST,
    DELETE_PRODUCTS_COMMENT_REQUEST,
    GET_PRODUCTS_COMMENT_REQUEST,
    LIKE_PRODUCTS_COMMENT_REQUEST,
    DISLIKE_PRODUCTS_COMMENT_REQUEST
} from "../redux/productComments/actions";
import Like from './Like';
import Dislike from './Dislike';

const ProductDetails = () => {
    let { id } = useParams();
    const { productDetail, loading } = useSelector((state) => state.allProducts)
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [productDetails, setProductDetails] = useState([]);
    const [chosenId, setChosenId] = useState(null);
    const [stock, setStock] = useState();
    const [productCount, setProductCount] = useState(null);
    //comment
    const [productComment, setProductComment] = useState({comment: ''});
    const {productComments, authUserId, loadingComents} = useSelector((state) => state.productComments)
    const [authId, setAuthId] = useState(null)

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

    const likeProduct = (event, productId) => {
        alert(1)
    }

    const dislikeProduct = (event, productId) => {
        alert(1)
    }
// comments
    // get
    useEffect(() => {
        dispatch({
            type: GET_PRODUCTS_COMMENT_REQUEST,
            payload: id
        })
    }, []);

    useEffect(() => {
        if (!loadingComents) {
            setAuthId(authUserId)
        }
    }, [loadingComents])
    // add
    const handleChangeComment = (field, value) => {
        setProductComment(prevState => ({
            ...prevState,
            [field]:value
        }))
    }

    const addComment = (event, id) => {
        if (localStorage.getItem('token')) {
            // registered user
            dispatch({
                type: CREATE_PRODUCT_COMMENT_REQUEST,
                payload: {
                    productComment: productComment.comment,
                    id: id
                }
            })
        } else {
            // not registered user
            alert('not registered')
        }
        setProductComment({comment: ''})
    }
    // delete
    const deleteComment = (event, productId) => {
        dispatch({
            type: DELETE_PRODUCTS_COMMENT_REQUEST,
            payload: productId
        })
    }
    // like / dislike
    const likeComment = (event, productId) => {
        dispatch({
            type: LIKE_PRODUCTS_COMMENT_REQUEST,
            payload: productId
        })
    }

    const unLikeComment = (event, productId) => {
        dispatch({
            type: DISLIKE_PRODUCTS_COMMENT_REQUEST,
            payload: productId
        })
    }

    return (
        <div>
            {loading
                ?
                    <LoadingSpinner />
                :
                    (<>
{/*product details*/}
                        <h3 className="mt-3">Product Number {id}</h3>
                        {
                            productDetails.map(productDetailItem =>
                                <div className="container" key={ uuid()}>
                                    <div className="row py-2">
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
                                                    className="col-md-6 centering-objects product-details-color-box mt-2"
                                                    style={{backgroundColor: `${productDetailItem.color}`}}/>
                                            </div><hr/>
                                            <div className="product-details-columns">Price: {productDetailItem.price} $</div><hr/>
                                        </div>
                                    </div>

                                    <div className="product-details-columns-add-to-cart">
                                        <button
                                            className='mx-2 btn btn-primary likeDislikeProduct'
                                            onClick={event => likeProduct(event, productDetailItem.id)}
                                        >
                                            <Like/>
                                            <p className='like-dislike-finger'>Like product</p>
                                        </button>

                                        <button
                                            className='mx-2 btn btn-danger likeDislikeProduct'
                                            onClick={event => dislikeProduct(event, productDetailItem.id)}
                                        >
                                            <Dislike/>
                                            <p className="like-dislike-finger">Dislike product</p>
                                        </button>

                                        <button
                                            className="mx-2 btn btn-success"
                                            onClick={event => handleShow(event, productDetailItem.id, productDetailItem.in_stock)}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            )
                        }
{/*comments*/}
                        {/*add comment*/}
                        <div className="container pt-4 px-5">
                            <div className="row">
                                <div className="col-md-12">
                                    <h4 className="my-3">Comments</h4>
                                </div>

                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Comment"
                                        value={productComment['comment']}
                                        onChange={(e) => handleChangeComment('comment', e.target.value)}
                                    />
                                </div>

                                <div className="col-md-2">
                                    <button
                                        className="form-control btn btn-primary"
                                        onClick={event => addComment(event, productDetails[0].id)}
                                    >
                                        Add comment
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/*delete, like, dislike comment*/}
                        <div className="container py-3 px-5">
                            {productComments.length ? productComments.map((item) => (
                                <div className="row" key={uuid()}>
                                    <div className="col-md-12 comments-show">
                                        <h6 className='text-info comment-text'>
                                            {item.user.name}:
                                        </h6>
                                        <h6 className='comment-text'>
                                            {item.comment}
                                        </h6>
                                    </div>
                                    {localStorage.getItem('token') ?
                                        <div className="col-md-12 comments-show">
                                            {item.likes.length ? (
                                                    item.likes.find(({ user_id }) => user_id === authId) ? (
                                                        <div>
                                                            <button
                                                                className='mx-2 btn btn-danger'
                                                                onClick={event => unLikeComment(event, item.id)}
                                                            >
                                                                <Like/>
                                                            </button>
                                                        </div>
                                                        ) : (
                                                        <div>
                                                            <button
                                                                className='mx-2 btn btn-primary'
                                                                onClick={event => likeComment(event, item.id)}
                                                            >
                                                                <Like/>
                                                            </button>
                                                        </div>
                                                    )
                                                ) : (
                                                    <div>
                                                        <button
                                                            className='mx-2 btn btn-primary'
                                                            onClick={event => likeComment(event, item.id)}
                                                        >
                                                            <Like/>
                                                        </button>
                                                    </div>
                                                )
                                            }
                                            <p className="mt-3">
                                                likes: {item.likes.length}
                                            </p>
                                            {item.user.id === authId ?
                                                <button
                                                    className='mx-2 btn btn-secondary delete-comment'
                                                    onClick={event => deleteComment(event, item.id)}
                                                >
                                                    Delete comment
                                                </button>
                                                :
                                                <div/>
                                            }
                                        </div>
                                        :
                                        <div/>
                                    }
                                    <hr />
                                </div>
                            ))
                            : (
                                <div>No comments</div>
                            )}
                        </div>

                        {/* add to cart MODAL */}
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
