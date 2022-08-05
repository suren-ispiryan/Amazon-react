import { combineReducers } from 'redux';
import myStore from './myStore/reducer';
import userProfile from './userProfile/reducer';
import allProducts from './allProducts/reducer';
import userCart from './userCart/reducer';
import adminDashboardReducer from './adminDashboard/reducer';


const rootReducer = combineReducers({
    products: myStore,
    addresses: userProfile,
    allProducts: allProducts,
    addedToCart: userCart,
    orders: userCart,
    orderedProducts: userCart,
    adminProducts: adminDashboardReducer
})
export default rootReducer
