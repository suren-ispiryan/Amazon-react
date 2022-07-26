import { all } from 'redux-saga/effects';
import myStore from './myStore/saga';
import userProfile from './userProfile/saga'

function* rootSaga() {
    yield all([
        myStore(),
        userProfile()
    ])
}
export default rootSaga
