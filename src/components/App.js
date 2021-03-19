import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { getUsersRequest, createUserRequest, deleteUserRequest, usersError } from '../actions/users';
import useFetchUsers from '../hooks/useFetchUsers';
import NewUserForm from './UserForm';
import UsersList from './UsersList';

const App = ({ getUsersRequest, createUserRequest, users, deleteUserRequest }) => {


	useFetchUsers(getUsersRequest);

  const handleSubmit = (e) => {
    const {firstName, lastName} = e
    createUserRequest({
      firstName: firstName,
      lastName: lastName
    })
  }

  const handleDeleteUserClick = (userId) => {
    deleteUserRequest(userId)
  }

  const onDismiss = () => {
    userError({
      error: ''
    })
  }

	return (
		<div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
			<Alert color='info' isOpen={!!users.error} toggle={onDismiss}>
				I am an alert and I can be dismissed!
			</Alert>
			<NewUserForm onSubmit={handleSubmit} />
			<UsersList onDeleteUser={handleDeleteUserClick} users={users.items} />
		</div>
	);
};

export default connect(({ users }) => ({ users }), { getUsersRequest, createUserRequest, deleteUserRequest, usersError })(App);
