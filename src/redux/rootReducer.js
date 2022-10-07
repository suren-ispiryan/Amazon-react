import { combineReducers } from 'redux';
import myStore from './myStore/reducer';
import userProfile from './userProfile/reducer';
import allProducts from './allProducts/reducer';
import userCart from './userCart/reducer';
import adminDashboardReducer from './adminDashboard/reducer';
import adminOrdersReducer from './adminOrders/reducer';
import adminUsersReducer from './adminUsers/reducer';
import adminProductParametersReducer from './adminProductParameters/reducer';
import loginReducer from './login/reducer';
import savedForLaterReducer from './saveForLater/reducer';
import searchedCategories from './allProducts/reducer';
import guestSavedForLaterReducer from './guestSavedForLater/reducer';
import productCommentsReducer from './productComments/reducer';

const rootReducer = combineReducers({
    products: myStore,
    addresses: userProfile,
    allProducts: allProducts,
    searchedCategories: searchedCategories,
    addedToCart: userCart,
    orders: userCart,
    orderedProducts: userCart,
    adminProducts: adminDashboardReducer,
    adminOrders: adminOrdersReducer,
    adminUsers: adminUsersReducer,
    categories: adminProductParametersReducer,
    subCategories: adminProductParametersReducer,
    sizes: adminProductParametersReducer,
    login: loginReducer,
    savedForLater: savedForLaterReducer,
    guestSavedForLaterProducts: guestSavedForLaterReducer,
    productSubCategories: myStore,
    productComments: productCommentsReducer,
    authUserId: productCommentsReducer
})

export default rootReducer
