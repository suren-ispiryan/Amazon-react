import { all } from 'redux-saga/effects';
import myStore from './myStore/saga';
import userProfile from './userProfile/saga'
import allProducts from './allProducts/saga'

function* rootSaga() {
    yield all([
        myStore(),
        userProfile(),
        allProducts()
    ])
}
export default rootSaga
