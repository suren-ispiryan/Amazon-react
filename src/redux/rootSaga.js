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
        guestSavedForLater()
    ])
}
export default rootSaga
