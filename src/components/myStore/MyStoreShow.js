import uuid from 'react-uuid';

const MyStoreShow = ({
    allProducts,
    client,
    setShow,
    setAllProducts,
    setUpdatedProduct
}) => {

    const getUpdatePostData = (event, id) => {
        setShow(true);
        client.get('/update-product-data/'+id)
            .then(function (response) {
                if (response.status === 200) {
                    setUpdatedProduct(response.data)
                }
            })
    }

    const deletePost = (event, id) => {
        client.get('/delete-auth-user-products/'+id)
            .then(function (response) {
                client.get('/get-auth-user-products')
                    .then(function (response) {
                        if (response.status === 200) { setAllProducts(response.data)}
                    })
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
                                        <div className="centering-objects">{product.color}</div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row auth-user-posts-action">
                                    <div className="col-md-5">
                                        <div className="text-danger centering-objects">owner:</div>
                                        <div className="centering-objects">{product.user.name}</div>
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
