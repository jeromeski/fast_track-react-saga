import { takeEvery, call, fork, put, takeLatest, take } from 'redux-saga/effects';
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
	} catch (e) {
    yield put(action.usersError({
      error: 'An error occurred while trying to retrieve the users'
    }));
  }
}

function* createUser(action) {
  try{
    yield call(api.createUser, {firstName: action.payload.firstName, lastName: action.payload.lastName});
    yield call(getUsers);
  } catch(e) {
    yield put(action.usersError({
      error: 'An error occurred while trying to create the user'
    }));
  }
}

function* deleteUser({userId}){
  try{
    yield call(api.deleteUser, userId);
    yield call(getUsers);
  }catch(e){
    yield put(action.usersError({
      error: 'An error occurred while trying to delete the user'
    }));
  }
}

function* watchGetUsersRequest() {
	// takeEvery → listens for every action of a specific type we pass to it.
	// saga will now pause the function for each action type, then call  another saga (worker). Once (worker) resolves its value.
	//  for every yield we are yielding control to the saga middleware
	yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* watchCreateUsersRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* watchDeleteUserRequest() {
  while(true){
    const action = yield take(actions.Types.DELETE_USER_REQUEST)
    yield call(deleteUser, {
      userId: action.payload.userId
    })
  }
}

const usersSagas = [fork(watchGetUsersRequest), fork(watchCreateUsersRequest), fork(watchDeleteUserRequest)];

export default usersSagas;
