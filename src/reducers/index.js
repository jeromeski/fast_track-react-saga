import { combineReducers } from 'redux'; // X
import UsersReducer from './users';

export default combineReducers({
	users: UsersReducer
});
