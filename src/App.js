import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'antd';

import Loader from './components/loader/loader';
import UserCard from './components/UserCard/UserCard';

function App() {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(
					'https://jsonplaceholder.typicode.com/users'
				);
				if (response.status !== 200) throw new Error(response.statusText);

				setUsers(
					response.data.map((data) => ({
						...data,
						isLiked: false,
						isBeingEdited: false,
					}))
				);
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className='App'>
			<Row gutter={[16, 16]}>
				{users.map((user) => (
					<UserCard user={user} setUsers={setUsers} key={user.id} />
				))}
			</Row>
		</div>
	);
}

export default App;
