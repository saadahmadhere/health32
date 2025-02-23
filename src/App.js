import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card } from 'antd';
import {
	DeleteFilled,
	EditOutlined,
	GlobalOutlined,
	HeartFilled,
	HeartOutlined,
	MailOutlined,
	PhoneOutlined,
} from '@ant-design/icons';

import Loader from './components/loader/loader';

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
				console.log(response);
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

	const handleActionIconClick = (action, user) => {
		switch (action) {
			case 'like':
				setUsers((prev) =>
					prev.map((pu) => {
						if (pu.id === user.id) {
							return {
								...pu,
								isLiked: !pu.isLiked,
							};
						}
						return pu;
					})
				);
				break;
			case 'edit':
				console.log('Edit', user.name);
				break;
			case 'delete':
				setUsers((prev) => prev.filter((pu) => pu.id !== user.id));
				break;
			default:
				break;
		}
	};

	return (
		<div className='App'>
			<Row gutter={[16, 16]}>
				{users.map((user) => {
					const heartIcon = user.isLiked ? (
						<HeartFilled
							style={{ color: 'rgb(255, 0, 0)', fontSize: '20px' }}
							onClick={() => handleActionIconClick('like', user)}
						/>
					) : (
						<HeartOutlined
							style={{ color: 'rgb(255, 0, 0)', fontSize: '20px' }}
							onClick={() => handleActionIconClick('like', user)}
						/>
					);

					return (
						<Col key={user.id} xs={24} sm={24} md={8} lg={8} xl={6}>
							<Card
								cover={
									<div className='cardHeaderImage'>
										<img
											alt={`Avatar for ${user.username}`}
											src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${user.username}`}
											style={{ height: '200px', width: '200px' }}
										/>
									</div>
								}
								actions={[
									heartIcon,
									<EditOutlined
										style={{ fontSize: '20px' }}
										onClick={() => handleActionIconClick('edit', user)}
									/>,
									<DeleteFilled
										style={{ fontSize: '20px' }}
										onClick={() => handleActionIconClick('delete', user)}
									/>,
								]}
								size='small'
							>
								<h3>{user.name}</h3>
								<p>
									<MailOutlined /> {user.email}
								</p>
								<p>
									<PhoneOutlined /> {user.phone}
								</p>
								<p>
									<GlobalOutlined />
									{`http://${user.website}`}
									{user.website}
								</p>
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	);
}

export default App;
