import { useEffect, useState, useRef } from 'react';
import MyStoreCreate from './myStore/MyStoreCreate';
import MyStoreUpdate from './myStore/MyStoreUpdate';
import MyStoreShow from './myStore/MyStoreShow';
import { GET_PRODUCTS_REQUEST } from '../redux/myStore/actions';
import { useDispatch, useSelector } from 'react-redux';

const initialValues = {
    name: '',
    description: '',
    brand: '',
    price: '',
    color: '#000000',
    size: '',
    category: ''
}

const MyStore = ({ client }) => {
    const {products, loading} = useSelector((state) => state.products)
    const dispatch = useDispatch();
    const productImage = useRef('');
    const [allProducts, setAllProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [updateProductItem, setUpdateProductItem] = useState({});
    const [updatedProduct, setUpdatedProduct] = useState(initialValues);

    useEffect(() => {
        dispatch({
            type: GET_PRODUCTS_REQUEST,
            payload: client
        })
    }, []);

    useEffect(() => {
        if (!loading) {
            setAllProducts(products)
        }
    }, [loading])

    return (
        <div className="my-store container-fluid">
           <div className="row centering-objects">
                <h3 className="my-4">My store</h3>

                <MyStoreShow
                    allProducts={allProducts}
                    client={client}
                    setShow={setShow}
                    setUpdatedProduct={setUpdatedProduct}
                />

                <MyStoreCreate
                    initialValues={initialValues}
                    client={client}
                    productImage={productImage}
                />

               <MyStoreUpdate
                   products={products}
                    loading={loading}
                    setUpdatedProduct={setUpdatedProduct}
                    initialValues={initialValues}
                    client={client}
                    show={show}
                    setShow={setShow}
                    updatedProduct={updatedProduct}
                    setUpdateProductItem={setUpdateProductItem}
                    updateProductItem={updateProductItem}
                    productImage={productImage}
                />
           </div>
        </div>
    );
}

export default MyStore;

