import {useEffect, useState} from "react";
import {GET_ALL_USER_PRODUCTS_REQUEST} from '../../redux/adminDashboard/actions';
import {useDispatch, useSelector} from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import Table from "react-bootstrap/Table";
import uuid from "react-uuid";
import {GetColorName} from "hex-color-to-color-name";

const AdminDashboard = () => {
    const {adminProducts, loading} = useSelector((state) => state.adminProducts)
    const dispatch = useDispatch();
    const [ownersProducts, setOwnersProducts] = useState([]);

    useEffect(() => {
        dispatch({
            type: GET_ALL_USER_PRODUCTS_REQUEST
        })
    }, []);

    useEffect(() => {
        if (!loading) {
            setOwnersProducts(adminProducts)
        }
    }, [loading])

    return (
        <>
            <div className="m-3">
                <h4 className="mt-5 mb-4">All products</h4>

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
                            </tr>
                            </thead>
                            <tbody>
                            {/* Product */}
                            {
                                ownersProducts.map((item, index) => {
                                    return (
                                        <tr key={uuid()}>
                                            <th className="pt-4">{index + 1}</th>
                                            <th className="product-images">
                                                <img
                                                    className="img-fluid admin-products-image"
                                                    alt="product-images"
                                                    src={`http://localhost:8000/assets/product_images/${item.picture}`}
                                                />
                                            </th>
                                            <th className="pt-4"><h5>{item.name}</h5></th>
                                            <th className="pt-4"><h5>{item.description}</h5></th>
                                            <th className="pt-4"><h5>{item.brand}</h5></th>

                                            <th className="pt-4">
                                                <ul>
                                                <h5>
                                                    <li>
                                                        <span className="text-danger">Color: </span>
                                                        <span className="centering-objects admin-product-color-box"
                                                             style={{backgroundColor: `${item.color}`}}>
                                                            {GetColorName(item.color)}
                                                        </span>
                                                    </li>
                                                    <li className="pt-2">
                                                        <span className="text-danger">Size: </span>
                                                        {item.size}
                                                    </li>
                                                    <li className="pt-2">
                                                        <span className="text-danger">Category: </span>
                                                        {item.category}
                                                    </li>
                                                </h5>
                                                </ul>
                                            </th>


                                            <th className="pt-4">
                                                <ul>
                                                    <h5>
                                                    <li>
                                                        <span className="text-danger">Bought: </span>
                                                        {item.carts[0].order.product_count}
                                                    </li>
                                                    <li className="pt-2">
                                                        <span className="text-danger">Price for 1 pcs: </span>
                                                        {item.carts[0].order.price}$
                                                    </li>
                                                    </h5>
                                                </ul>
                                            </th>

                                            <th className="pt-4">
                                                <ul>
                                                    <h5>
                                                        <li>
                                                            <span className="text-danger">Name: </span>
                                                            {item.user.name}
                                                        </li>
                                                        <li className="pt-2">
                                                            <span className="text-danger">Surname: </span>
                                                            {item.user.surname}
                                                        </li>
                                                        <li className="pt-2">
                                                            <span className="text-danger">Email: </span>
                                                            {item.user.email}
                                                        </li>
                                                        <li className="pt-2">
                                                            <span className="text-danger">Role: </span>
                                                            {item.user.role}
                                                        </li>
                                                    </h5>
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

export default AdminDashboard;
