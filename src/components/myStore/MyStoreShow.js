import uuid from 'react-uuid';
import {DELETE_PRODUCTS_REQUEST, PUBLISH_PRODUCT_REQUEST} from '../../redux/myStore/actions';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../config/axiosInstance';
import NoImage from "../../assets/No-Image.jpg";

const MyStoreShow = ({allProducts, setShow, setUpdatedProduct}) => {
    const dispatch = useDispatch();

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

    return (
        <div className="col-md-8 product-create-user px-5">
            <h4 className="my-4">My products</h4>
            <div className="row my-store-parent-row">
                {
                    allProducts.map((product) => {
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
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default MyStoreShow;
