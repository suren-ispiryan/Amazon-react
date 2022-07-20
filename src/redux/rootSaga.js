import { all } from 'redux-saga/effects';

import todo from './myStore/saga'

export default function* rootSaga() {
    yield all([
        todo()
    ]);
}
