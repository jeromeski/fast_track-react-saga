import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const NewUserForm = ({ onSubmit }) => {
	const [values, setValues] = useState({
		firstName: '',
		lastName: ''
	});

	const { firstName, lastName } = values;

	const handleNameChange = (name) => (e) => setValues({ ...values, [name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({
			firstName: values.firstName,
			lastName: values.lastName
		});
		setValues({
			firstName: '',
			lastName: ''
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<FormGroup>
				<Label>First Name</Label>
				<Input
					placeholder='First name'
					onChange={handleNameChange('firstName')}
					value={firstName}
					name='firstName'
				/>
			</FormGroup>
			<FormGroup>
				<Label>Last Name</Label>
				<Input
					placeholder='Last name'
					onChange={handleNameChange('lastName')}
					value={lastName}
					name='lastName'
				/>
			</FormGroup>
			<FormGroup>
				<Button block outline type='submit'>
					Create
				</Button>
			</FormGroup>
		</Form>
	);
};

export default NewUserForm;
