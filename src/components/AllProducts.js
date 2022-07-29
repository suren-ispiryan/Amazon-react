import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GET_ALLPRODUCTS_REQUEST, GET_SEARCH_FOR_PRODUCT_REQUEST } from '../redux/allProducts/actions';
import { ADD_TO_CART_REQUEST } from '../redux/userCart/actions';
import uuid from 'react-uuid';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const AllProducts = ({ client }) => {
    const {allProducts, loading} = useSelector((state) => state.allProducts)
    const dispatch = useDispatch();
    const [allUsersProducts, setAllUsersProducts] = useState([]);
    const [searchParameter, setSearchParameter] = useState('');

    useEffect(() => {
        dispatch({
            type: GET_ALLPRODUCTS_REQUEST,
            payload: client
        })
    }, []);

    useEffect(() => {
        if (!loading) {
            setAllUsersProducts(allProducts)
        }
    }, [loading])

    const handleChange = ({ target }) => {
            setSearchParameter(target.value)
    }

    const searchProduct = () => {
        dispatch({
            type: GET_SEARCH_FOR_PRODUCT_REQUEST,
            payload: {searchParameter: searchParameter}, client
        })
        setSearchParameter('')
    }

    const addToCart = (event, id) => {
        if (localStorage.getItem('token')) {
        // registered user
            dispatch({
                type: ADD_TO_CART_REQUEST,
                payload: id, client
            })
        } else {
        // not registered user
            let addedToCart = []
            if(!JSON.parse(localStorage.getItem('addedToCart'))){
                addedToCart.push(id);
                localStorage.setItem('addedToCart', JSON.stringify(addedToCart));
            }else{
                addedToCart = JSON.parse(localStorage.getItem('addedToCart'));
                if (!addedToCart.includes(id)) {
                    addedToCart.push(id);
                    localStorage.setItem('addedToCart', JSON.stringify(addedToCart));
                }
            }
        }
    }

    return (
        <div className="col-md-12 px-5">
            {loading
                ?
                    <LoadingSpinner />
                :
                (<>
                    <h4 className="my-4">All products</h4>

                    <div className="row search-parent-row">
                        <div className="col-md-2">
                            <input
                                type="text"
                                name="search"
                                className="form-control"
                                placeholder="Search for..."
                                value={searchParameter}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-1">
                            <button
                                className="btn btn-primary form-control"
                                type="submit"
                                onClick={searchProduct}
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="row my-store-parent-row">
                        {
                            allUsersProducts.map((product) => {
                                return (
                                    <div className="col-md-2 users-products" key={uuid()}>
                                        <div className="text-success">{product.name}</div>
                                        <hr />

                                        <div className="product-images">
                                            <img
                                                className="img-fluid product-image"
                                                alt="product-images"
                                                src={`http://localhost:8000/assets/product_images/${product.picture}`}
                                            />
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
                                                <div className="centering-objects product-color-box" style={{backgroundColor: `${product.color}`}}></div>
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
                                                        className="btn btn-success"
                                                        onClick={event => addToCart(event, product.id)}
                                                    >
                                                        Add to cart
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

export default AllProducts;
