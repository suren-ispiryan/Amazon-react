import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GET_ALLPRODUCTS_REQUEST, GET_SEARCH_FOR_PRODUCT_REQUEST } from '../redux/allProducts/actions';
import { ADD_TO_CART_REQUEST } from '../redux/userCart/actions';
import uuid from 'react-uuid';
import { Link } from 'react-router-dom';
import LoadingSpinner from './helpers/LoadingSpinner';
import { GetColorName } from 'hex-color-to-color-name';
import { Modal, Button } from 'react-bootstrap';
import { SAVE_PRODUCT_FOR_LATER_REQUEST } from '../redux/saveForLater/actions';
import NoImage from '../assets/No-Image.jpg';
import Pagination from './helpers/Pagination';

const AllProducts = () => {
    const {allProducts, loading} = useSelector((state) => state.allProducts)
    const {searchedCategories} = useSelector((state) => state.searchedCategories)
    const dispatch = useDispatch();
    const [allUsersProducts, setAllUsersProducts] = useState([]);
    const [searchParameter, setSearchParameter] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [chosenId, setChosenId] = useState(null);
    const [productCount, setProductCount] = useState(1);
    const [show, setShow] = useState(false);
    const [stock, setStock] = useState();
    // Pagination Posts
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allUsersProducts.slice(indexOfFirstPost, indexOfLastPost);

    // order product
    const handleClose = () => setShow(false);

    const handleShow = (event, id, inStock) => {
        setShow(true);
        setProductCount(1)
        setStock(inStock)
        setChosenId(id)
    }

    useEffect(() => {
        dispatch({
            type: GET_ALLPRODUCTS_REQUEST
        })
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
            setAllUsersProducts(allProducts)
        }
    }, [loading, allProducts])

    const handleChange = ({ target }) => {
        setSearchParameter(target.value)
    }

    const searchedCategory = ({ target }) => {
        setSearchCategory(target.value)
    }

    const searchProduct = () => {
        dispatch({
            type: GET_SEARCH_FOR_PRODUCT_REQUEST,
            payload: {
                searchParameter: searchParameter,
                searchCategory: searchCategory
            }
        })
        setSearchParameter('')
    }

    const handleCount = ({ target }) => {
        setProductCount(target.value)
    }

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
    // saved for later
    const saveForLater = (event, id) => {
        dispatch({
            type: SAVE_PRODUCT_FOR_LATER_REQUEST,
            payload: id
        })
    }

    const guestSaveForLater = (event, id) => {
        let savedForLater = [];

        if (!JSON.parse(localStorage.getItem('savedForLater'))) {
            savedForLater.push(id);
            localStorage.setItem('savedForLater', JSON.stringify(savedForLater));
        } else {
            let exist = false
            savedForLater = JSON.parse(localStorage.getItem('savedForLater'));
            savedForLater.forEach(myFunction)
            function myFunction (item) {
                if (item === id) {
                    exist = true
                }
            }
            if (exist === false){
                savedForLater.push(id);
                localStorage.setItem('savedForLater', JSON.stringify(savedForLater));
            }
        }
    }

    //pagination
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="col-md-12 px-5">
            {loading
                ?
                    <LoadingSpinner />
                :
                (<>
                    <h4 className="my-4">All products</h4>
{/*search*/}
                    <div className="row search-parent-row">
                        <div className="col-md-2 mt-1">
                            <input
                                type="text"
                                name="search"
                                className="form-control"
                                placeholder="Search for..."
                                value={searchParameter}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-2 mt-1">
                            <select
                                id="categories"
                                onChange={searchedCategory}
                                className="form-select"
                                name="categories"
                                aria-label="Default select example"
                                value={searchCategory}
                            >
                                <option value="all">Select category</option>
                                     {
                                         searchedCategories && searchedCategories.map((item) => {
                                             return (<option key={uuid()} value={item.category}>{item.category}</option>)
                                         })
                                     }
                            </select>
                        </div>

                        <div className="col-md-2 col-xl-1 mt-1">
                            <button
                                className="btn btn-primary form-control"
                                type="submit"
                                onClick={searchProduct}
                            >
                                Search
                            </button>
                        </div>
                    </div>
{/*products list*/}
                    <div className="row my-store-parent-row">
                        {
                            currentPosts.length > 0 ? currentPosts.map((product) => {
                                return (
                                    product.published === 1 &&
                                            <div className="col-md-4 col-xl-3 users-products" key={uuid()}>
                                                <div className="ro w">
                                                    <div className="text-success col-md-6 px-4 text-start">
                                                        <span className="text-danger">Name: </span>
                                                        {product.name}
                                                    </div>
                                                    <div className="text-success col-md-6">
                                                        <p className="products-count p-2 mx-3">{product.in_stock} pcs left</p>
                                                    </div>
                                                </div>
                                                <hr />

                                                <div className="product-images">
                                                    {product.picture
                                                        ?
                                                        <img
                                                            className="img-fluid product-image"
                                                            alt="product images"
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
                                                                className="mx-1 btn btn-primary"
                                                            >
                                                                See details
                                                            </button>
                                                        </Link>

                                                        {localStorage.getItem('token')
                                                         ?
                                                             <button
                                                                 className="mx-1 btn btn-warning"
                                                                 onClick={event => saveForLater(event, product.id)}
                                                             >
                                                                 <img src="../../../assets/icons/saveForLater.svg" alt="save for later"/>
                                                             </button>
                                                         :
                                                             <button
                                                                 className="mx-1 btn btn-warning"
                                                                 onClick={event => guestSaveForLater(event, product.id)}
                                                             >
                                                                 <img src="../../../assets/icons/saveForLater.svg" alt="save for later"/>
                                                             </button>
                                                        }

                                                        <button
                                                            className="mx-1 btn btn-success"
                                                            onClick={event => handleShow(event, product.id, product.in_stock)}
                                                        >
                                                            Add to cart
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
{/* MODAL */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Choose product count, in stock {stock} pcs</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input
                                type="number"
                                name="count"
                                className="form-control"
                                value={productCount}
                                max={stock}
                                placeholder={"Count of product, max" + stock}
                                onChange={handleCount}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={addToCart}>
                                Add to cart
                            </Button>
                        </Modal.Footer>
                    </Modal>
{/*Pagination*/}
                    <Pagination
                        allUsersProducts={allUsersProducts}
                        postsPerPage={postsPerPage}
                        paginate={paginate}
                    />
                </>)
            }
        </div>
    );
}

export default AllProducts;
