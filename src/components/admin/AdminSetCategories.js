import Categories from './categories/Categories';
import Sizes from './categories/Sizes';

const AdminSetCategories = () => {


    return (
        <div className="container">
            <h4 className="m-4">Set product parameters</h4>

            <div className="row">
                <div className="col-md-6">
                    <Categories />
                </div>

                <div className="col-md-6">
                    <Sizes />
                </div>
            </div>
        </div>
    )
}

export default AdminSetCategories;
