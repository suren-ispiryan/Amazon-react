import uuid from 'react-uuid';
import {DELETE_PRODUCTS_REQUEST, PUBLISH_PRODUCT_REQUEST, DELETE_PRODUCT_IMAGE_REQUEST} from '../../../redux/myStore/actions';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../../config/axiosInstance';
import NoImage from "../../../assets/No-Image.jpg";
import Pagination from "../../helpers/Pagination";
import {useState} from "react";

const MyStoreShow = ({allProducts, setShow, setUpdatedProduct, message}) => {
    const dispatch = useDispatch();
// Pagination Posts
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allProducts.slice(indexOfFirstPost, indexOfLastPost);

    //pagination
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const getUpdatePostData = (event, id) => {
        setShow(true);
        axiosInstance.get('/update-product-data/'+id)
            .then(function (response) {
                if (response.status === 200) {
                    setUpdatedProduct(response.data)
                }
            })
    }

    const deletePost = (event, id) => {
        dispatch({
            type: DELETE_PRODUCTS_REQUEST,
            payload: id
        })
    }

    const publishProduct = (target, id) => {
        dispatch({
            type: PUBLISH_PRODUCT_REQUEST,
            payload: id
        })
    }

    const deleteImage = (event, id) => {
        dispatch({
            type: DELETE_PRODUCT_IMAGE_REQUEST,
            payload: id
        })
    }

    return (
        <div className="col-md-8 product-create-user px-5">
            <h4 className="my-4">My products</h4>
            <div className="row my-store-parent-row">
                {currentPosts ?
                    (currentPosts.map((product) => {
                        return (
                            <div className="col-xl-3 col-lg-5 col-md-8 col-sm-8 users-products" key={uuid()}>
                                <div className="text-success d-flex justify-content-between px-3">
                                    <span>{product.name}</span>
                                    <span className="form-switch">
                                        {product.published === 1
                                            ?
                                                <input
                                                    className="form-check-input cursor-pointer"
                                                    type="checkbox"
                                                    defaultChecked
                                                    id="flexSwitchCheckDefault"
                                                    onClick={event => publishProduct(event, product.id)}
                                                />
                                            :
                                                <input
                                                    className="form-check-input cursor-pointer"
                                                    type="checkbox"
                                                    id="flexSwitchCheckDefault"
                                                    onClick={event => publishProduct(event, product.id)}
                                                />
                                        }
                                            <label
                                                className="form-check-label mx-1"
                                                htmlFor="flexSwitchCheckDefault"
                                            >
                                                publish
                                             </label>
                                    </span>
                                </div>
                                <hr />

                                <div className="product-images">
                                    {product.picture
                                    ?
                                        <div style={{position: "relative"}}>
                                            <button
                                                style={{position: "absolute"}}
                                                className="btn btn-danger"
                                                onClick={event => deleteImage(event, product.id)}
                                            >
                                                Delete
                                            </button>
                                            <img
                                                className="img-fluid product-image"
                                                alt="product-images"
                                                src={`http://localhost:8000/assets/product_images/${product.picture}`}
                                            />
                                        </div>
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
                                        <div className="centering-objects product-color-box" style={{backgroundColor: `${product.color}`}}/>
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
                                        <button
                                            className="btn btn-primary"
                                            onClick={ event => getUpdatePostData(event, product.id) }
                                        >
                                            Update
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={ event => deletePost(event, product.id) }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 auth-user-posts-action-btn">
                                        {product.orders.map((item) => {
                                            return(product.id === item.product_id &&
                                                <h5 className="text-success" key={uuid()}>
                                                    Bought: {item.product_count} pcs
                                                </h5>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )})
                    ) : (
                        <h4 className="text-danger mt-5">{message}</h4>
                    )
                }
            </div>
            {/*Pagination*/}
            <Pagination
                allUsersProducts={allProducts}
                postsPerPage={postsPerPage}
                paginate={paginate}
            />
        </div>
    );
}

export default MyStoreShow;
