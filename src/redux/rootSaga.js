import { all } from 'redux-saga/effects';
import myStore from './myStore/saga';
import userProfile from './userProfile/saga';
import allProducts from './allProducts/saga';
import userCart from './userCart/saga';
import adminDashboard from './adminDashboard/saga';
import adminOrders from './adminOrders/saga';
import adminUsers from './adminUsers/saga';
import adminProductParameters from './adminProductParameters/saga';
import login from './login/saga';
import savedForLater from './saveForLater/saga';
import guestSavedForLater from './guestSavedForLater/saga';
import productComment from './productComments/saga';
import productLikes from './productLikes/saga';
import chat from './chat/saga';

function* rootSaga() {
    yield all([
        myStore(),
        userProfile(),
        allProducts(),
        userCart(),
        adminDashboard(),
        adminOrders(),
        adminUsers(),
        adminProductParameters(),
        login(),
        savedForLater(),
        guestSavedForLater(),
        productComment(),
        productLikes(),
        chat()
    ])
}
export default rootSaga
