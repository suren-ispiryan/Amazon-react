import { all } from 'redux-saga/effects';
import myStore from './myStore/saga';
import userProfile from './userProfile/saga';
import allProducts from './allProducts/saga';
import userCart from './userCart/saga';
import adminDashboard from './adminDashboard/saga';
import adminOrders from './adminOrders/saga';

function* rootSaga() {
    yield all([
        myStore(),
        userProfile(),
        allProducts(),
        userCart(),
        adminDashboard(),
        adminOrders()
    ])
}
export default rootSaga
