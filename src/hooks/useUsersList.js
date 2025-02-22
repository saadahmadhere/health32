import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUsersList = (url) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(
					'https://jsonplaceholder.typicode.com/users'
				);
				console.log(response);
				if (response.status !== 200) throw new Error(response.statusText);

				setData(response.data);
			} catch (err) {
				setError(err.message || 'An error occurred');
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, isLoading, error };
};
