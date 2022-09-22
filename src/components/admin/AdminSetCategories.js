import Categories from './categories/Categories';
import SubCategories from './categories/SubCategories';
import Sizes from './categories/Sizes';

const AdminSetCategories = () => {


    return (
        <div className="container">
            <h4 className="m-4">Set product parameters</h4>

            <div className="row">
                <div className="col-md-6">
                    <Categories />
                </div>

                <div className="col-md-6 mb-5">
                    <Sizes />
                </div>

                <div className="col-md-6 mt-5">
                    <SubCategories />
                </div>

            </div>
        </div>
    )
}

export default AdminSetCategories;
