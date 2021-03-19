import { useEffect } from 'react';

export default function useFetchUsers(fetchUsersAction) {
	useEffect(() => {
		fetchUsersAction();
	}, []);
}
