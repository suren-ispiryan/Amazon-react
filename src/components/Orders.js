import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import uuid from 'react-uuid';
import { GET_ORDERS_REQUEST } from "../redux/userCart/actions";
import {GetColorName} from "hex-color-to-color-name";

const Orders = ({ client }) => {
  const dispatch = useDispatch();
  const [ordered, setOrdered] = useState([])
  const {orderedProducts, loading} = useSelector((state) => state.orderedProducts)

  useEffect(() => {
    dispatch({
      payload: client,
      type: GET_ORDERS_REQUEST
    })
  }, []);

  useEffect(() => {
    if (!loading) {
      setOrdered(orderedProducts)
    }
  }, [loading])

  return (
      <>
        <div className="m-3">
          <h4 className="mt-5 mb-4">Ordered products</h4>

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
              <th>Ordered</th>
            </tr>
            </thead>
            <tbody>
            {/* Product */}
            {
              ordered.map((item, index) => {
                return (
                    <tr key={uuid()}>
                      <th className="pt-4">{index + 1}</th>
                      <th className="product-images">
                        <img
                            className="img-fluid buy-product-image"
                            alt="product-images"
                            src={`http://localhost:8000/assets/product_images/${item.cart.product.picture}`}
                        />
                      </th>
                      <th className="pt-4">{item.cart.product.name}</th>
                      <th className="pt-4">{item.cart.product.description}</th>
                      <th className="pt-4">{item.cart.product.brand}</th>
                      <th className="pt-4">
                        <div className="centering-objects product-color-box" style={{backgroundColor: `${item.cart.product.color}`}}>
                          {GetColorName(item.cart.product.color)}
                        </div>
                      </th>
                      <th className="pt-4">{item.cart.product.size}</th>
                      <th className="pt-4">{item.cart.product.category}</th>
                      <th className="pt-4">{item.cart.product_count}</th>
                      <th className="pt-4">{item.cart.product.price}$</th>
                      <th className="pt-4">{item.created_at.slice(0,10).split('-').reverse().join('-')}</th>
                    </tr>
                )
              })
            }
            </tbody>
          </Table>
        </div>
      </>
  )
}

export default Orders
