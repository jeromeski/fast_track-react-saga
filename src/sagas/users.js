import { takeEvery, call, fork, put } from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

function* getUsers() {
	try {
		//  call - calls an async fn and waiting for it to resolve
		const result = yield call(api.getUsers);
		yield put(
			actions.getUsersSuccess({
				items: result.data.data
			})
		);
	} catch (e) {}
}

function* watchGetUsersRequest() {
	// takeEvery → listens for every action of a specific type we pass to it.
	// saga will now pause the function for each action type, then call  another saga (worker). Once (worker) resolves its value.
	//  for every yield we are yielding control to the saga middleware
	yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

const usersSagas = [fork(watchGetUsersRequest)];

export default usersSagas;
