import { GET_ALL_ORDERED_PRODUCTS_REQUEST } from '../../redux/adminOrders/actions';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import Table from 'react-bootstrap/Table';
import uuid from 'react-uuid';
import {GetColorName} from 'hex-color-to-color-name';
import axiosInstance from '../../config/axiosInstance';

const AdminOrderedProducts = () => {
    const {adminOrders, loading} = useSelector((state) => state.adminOrders);
    const dispatch = useDispatch();
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [allUsers, setAllUsers] = useState([]);


    useEffect(() => {
        axiosInstance.get('all-users')
                     .then(function (response) {
                         setAllUsers(response.data)
                         dispatch({
                             type: GET_ALL_ORDERED_PRODUCTS_REQUEST
                         })
                     })
                     .catch(function (error) {console.log(error)})
    }, [])

    useEffect(() => {
        if (!loading) {
            setOrderedProducts(adminOrders)
        }
    }, [loading])


    return (
        <>
            <div className="m-3">
                <h4 className="mt-5 mb-4">Orders</h4>

                {loading
                    ?
                    <LoadingSpinner/>
                    :
                    (<>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Picture</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Brand</th>
                                    <th>Details</th>
                                    <th>Info</th>
                                    <th>Owner info</th>
                                    <th>Buyer info</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderedProducts.map((item, index) => {
                                        return (
                                            <tr key={uuid()}>
                                                <th className="pt-4">{index + 1}</th>
                                                <th className="product-images">
                                                    <img
                                                        className="img-fluid admin-products-image"
                                                        alt="product-images"
                                                        src={`http://localhost:8000/assets/product_images/${item.cart.product.picture}`}
                                                    />
                                                </th>
                                                <th className="pt-4"><h6>{item.cart.product.name}</h6></th>
                                                <th className="pt-4"><h6>{item.cart.product.description}</h6></th>
                                                <th className="pt-4"><h6>{item.cart.product.brand}</h6></th>

                                                <th className="pt-4">
                                                    <ul>
                                                        <h6>
                                                            <li>
                                                                <span className="text-danger">Color: </span>
                                                                <span className="centering-objects admin-product-color-box"
                                                                      style={{backgroundColor: `${item.cart.product.color}`}}>
                                                                {GetColorName(item.cart.product.color)}
                                                            </span>
                                                            </li>
                                                            <li className="pt-2">
                                                                <span className="text-danger">Size: </span>
                                                                {item.cart.product.size}
                                                            </li>
                                                            <li className="pt-2">
                                                                <span className="text-danger">Category: </span>
                                                                {item.cart.product.category}
                                                            </li>
                                                        </h6>
                                                    </ul>
                                                </th>

                                                <th className="pt-4">
                                                    <ul>
                                                        <h5>
                                                            <li>
                                                                <span className="text-danger">In stock: </span>
                                                                {item.cart.product.in_stock} pcs
                                                            </li>
                                                            <li className="pt-2">
                                                                <span className="text-danger">Price for 1 pcs: </span>
                                                                {item.cart.product.price}$
                                                            </li>
                                                        </h5>
                                                    </ul>
                                                </th>

                                                <th className="pt-4">
                                                    <ul>
                                                        <h6>
                                                            <li>
                                                                <span className="text-danger">Name: </span>
                                                                {item.cart.product.user.name}
                                                            </li>
                                                            <li className="pt-2">
                                                                <span className="text-danger">Surname: </span>
                                                                {item.cart.product.user.surname}
                                                            </li>
                                                            <li className="pt-2">
                                                                <span className="text-danger">Email: </span>
                                                                {item.cart.product.user.email}
                                                            </li>
                                                            <li className="pt-2">
                                                                <span className="text-danger">Role: </span>
                                                                {item.cart.product.user.role}
                                                            </li>
                                                        </h6>
                                                    </ul>
                                                </th>

                                                <th className="pt-4">
                                                    <ul>
                                                        <h6>

                                                            {
                                                                allUsers.map((user) => {
                                                                    return (
                                                                        <>
                                                                        { user.id === item.customer_id
                                                                            ?
                                                                                <>
                                                                                    <li>
                                                                                        <span className="text-danger">Name: </span>
                                                                                        {user.name}
                                                                                    </li>
                                                                                    <li className="pt-2">
                                                                                        <span className="text-danger">Surname: </span>
                                                                                        {user.surname}
                                                                                    </li>
                                                                                    <li className="pt-2">
                                                                                        <span className="text-danger">Email: </span>
                                                                                        {user.email}
                                                                                    </li>
                                                                                    <li className="pt-2">
                                                                                        <span className="text-danger">Role: </span>
                                                                                        {user.role}
                                                                                    </li>
                                                                                </>
                                                                            :
                                                                                <div />
                                                                            }
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </h6>
                                                    </ul>
                                                </th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </>)
                }
            </div>
        </>
    )
}

export default AdminOrderedProducts;
