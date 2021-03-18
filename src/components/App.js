import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getUsersRequest } from '../actions/users';


const fetchUsers = fetchUserAction => {
  useEffect(() => {
    fetchUserAction()
  }, [])
}

const App = ({ getUsersRequest, users }) => {

  fetchUsers(getUsersRequest)

  const REACT_VERSION = React.version;
  console.log(users)

	return <div>React version: {REACT_VERSION}</div>;
};

export default connect(
	({ users }) => ({ users }),
	{ getUsersRequest }
)(App);