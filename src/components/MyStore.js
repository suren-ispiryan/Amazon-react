import { useEffect, useState, useRef } from 'react';
import MyStoreCreate from './myStore/MyStoreCreate';
import MyStoreUpdate from './myStore/MyStoreUpdate';
import MyStoreShow from './myStore/MyStoreShow';

const MyStore = ({
    client
}) => {

    const productImage = useRef();
    const [createProductItem, setCreateProductItem] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [updateProductItem, setUpdateProductItem] = useState({});
    const [updatedProduct, setUpdatedProduct] = useState([]);

    useEffect(() => {
            client.get('/get-auth-user-products')
                .then(function (response) {
                    if (response.status === 200) {
                        setAllProducts(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }, [createProductItem, updateProductItem, client]);

    return (
        <div className="my-store container-fluid">
           <div className="row centering-objects">
                <h3 className="my-4">My store</h3>

                <MyStoreShow
                    allProducts={allProducts}
                    client={client}
                    setShow={setShow}
                    setAllProducts={setAllProducts}
                    setUpdatedProduct={setUpdatedProduct}
                />

                <MyStoreCreate
                    createProductItem={createProductItem}
                    setCreateProductItem={setCreateProductItem}
                    client={client}
                    productImage={productImage}
                />

                <MyStoreUpdate
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
