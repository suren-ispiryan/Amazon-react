import {BUY_PRODUCTS_FROM_CART_REQUEST, GET_FROM_CART_REQUEST} from '../redux/userCart/actions';
import {DEFAULT_ADDRESS_REQUEST, GET_ADDRESS_REQUEST} from '../redux/userProfile/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import uuid from 'react-uuid';
import { useNavigate } from "react-router-dom";
import { GetColorName } from 'hex-color-to-color-name';
import axiosInstance from "../config/axiosInstance";
import NoImage from "../assets/No-Image.jpg";

const BuyDetails = () => {
    const {addedToCart, loading} = useSelector((state) => state.addedToCart)
    const dispatch = useDispatch();
    const [allInCardProducts, setAllInCardProducts] = useState([])
    const [usersAddresses, setUsersAddresses] = useState([])
    const {addresses} = useSelector((state) => state.addresses)
    const navigate = useNavigate()
    const [update, setUpdate] = useState({})

    useEffect(() => {
        dispatch({
            type: GET_ADDRESS_REQUEST
        })
        dispatch({
            type: GET_FROM_CART_REQUEST
        })
    }, [update]);

    useEffect(() => {
        if (!loading) {
            setAllInCardProducts(addedToCart)
            setUsersAddresses(addresses)
        }
    }, [addresses, loading, update])

    const countTotalPrice = () => {
        let totalPrice = 0;
        allInCardProducts.map((item, index) => {
            totalPrice += item.product_count * item.product.price
        })
        return totalPrice;
    }

    const makeDefaultAddress = (event, id) => {
        dispatch({
            type: DEFAULT_ADDRESS_REQUEST,
            payload: id
        })
    }

    const BuyProductsFromCart = () => {
        dispatch({
            type: BUY_PRODUCTS_FROM_CART_REQUEST
        })
        navigate('/orders')
    }

    const reduceProduct = (event, id) => {
        axiosInstance.get('/reduce-product/'+id)
              .then(response => setUpdate(response.data))
    }

    const addProduct = (event, id) => {
        axiosInstance.get('/add-product/'+id)
              .then(response => setUpdate(response.data))
    }

    return (
        <div className="m-3">
            <h4 className="mt-5 mb-4">On cart products</h4>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Brand</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Category</th>
                        <th>Count</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
        {/* Product */}
                {
                    allInCardProducts.map((item, index) => {
                        return (
                            <tr key={uuid()}>
                                <th className="pt-4">{index + 1}</th>
                                <th className="product-images">
                                    {item.product.picture
                                        ?
                                        <img
                                            className="img-fluid buy-product-image"
                                            alt="product-images"
                                            src={`http://localhost:8000/assets/product_images/${item.product.picture}`}
                                        />
                                        :
                                        <img
                                            className="img-fluid admin-products-image"
                                            alt="product-images"
                                            src={NoImage}
                                        />
                                    }
                                </th>
                                <th className="pt-4">{item.product.name}</th>
                                <th className="pt-4">{item.product.description}</th>
                                <th className="pt-4">{item.product.brand}</th>
                                <th className="pt-4">
                                    <div className="centering-objects product-color-box" style={{backgroundColor: `${item.product.color}`}}>
                                        {GetColorName(item.product.color)}
                                    </div>
                                </th>
                                <th className="pt-4">{item.product.size}</th>
                                <th className="pt-4">{item.product.category}</th>
                                <th className="pt-4 count-control-container">
                                    <button
                                        className="btn btn-danger count-control"
                                        onClick={event => reduceProduct(event, item.product.id)}
                                    >-</button>
                                    {item.product_count}
                                    <button
                                        className="btn btn-success count-control"
                                        onClick={event => addProduct(event, item.product.id)}
                                    >+</button>
                                </th>
                                <th className="pt-4">{item.product.price*item.product_count}$
                                </th>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>

        {/* Addresses */}
            <h4 className="mt-5 mb-4">Available addresses</h4>
            <div className="row">
            {
                usersAddresses.length &&  usersAddresses.map((address) => {
                    return(
                        <div className="col-md-3" key={uuid()}>
                            <ul className="border py-3">
                                <li> <span className="text-danger"> Name: </span> {address.name} </li>
                                <li> <span className="text-danger"> phone: </span> {address.number} </li>
                                <li> <span className="text-danger"> Address: </span> {address.country}/{address.city}/{address.street} </li>
                                <li> <span className="text-danger"> Zip: </span> {address.zip} </li>
                                <li> <span className="text-success"> Make default </span>
                                    {
                                        address.default === 1
                                            ?
                                            <input
                                                defaultChecked
                                                className="make-default-radio-btn"
                                                type="radio"
                                                name="makeDefault"
                                            />
                                            :
                                            <input
                                                className="make-default-radio-btn"
                                                type="radio"
                                                name="makeDefault"
                                                onChange={event => makeDefaultAddress(event, address.id)}
                                            />
                                    }
                                </li>
                            </ul>
                        </div>
                    )
                })
            }
            </div>

            <hr/>

        {/* total */}
            <div className="row px-5">
                <div className="col-md-12 auth-user-products-buy text-end">
                    <h5>Total price: {countTotalPrice()} $</h5>
                </div>
            </div>

            <div className="row px-5">
                <div className="col-md-12 auth-user-products-buy text-end">
                    <button
                        onClick={BuyProductsFromCart}
                        className="btn btn-success"
                    >
                        Order
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BuyDetails
