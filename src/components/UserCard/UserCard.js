import { useState } from 'react';
import { Col, Card } from 'antd';

import {
	DeleteFilled,
	EditOutlined,
	GlobalOutlined,
	HeartFilled,
	HeartOutlined,
	MailOutlined,
	PhoneOutlined,
} from '@ant-design/icons';
import UserForm from '../form/form';

const UserCard = ({ user, setUsers }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		website: '',
		id: null,
	});

	const initialFormData = {
		name: user.name,
		email: user.email,
		phone: user.phone,
		website: user.website,
		id: user.id,
	};

	const handleOk = (updatedData) => {
		setFormData(updatedData);
		setIsModalOpen(false);
		setUsers((prev) =>
			prev.map((pu) => {
				if (pu.id === updatedData.id) {
					return {
						...pu,
						name: updatedData.values.name,
						email: updatedData.values.email,
						phone: updatedData.values.phone,
						website: updatedData.values.website,
					};
				}
				return pu;
			})
		);
	};

	const handleCancel = () => {
		setFormData(initialFormData);
		setIsModalOpen(false);
	};

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
				setIsModalOpen(true);
				setFormData(initialFormData);
				break;
			case 'delete':
				setUsers((prev) => prev.filter((pu) => pu.id !== user.id));
				break;
			default:
				break;
		}
	};

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

				<UserForm
					onCancelCb={handleCancel}
					onOkCb={handleOk}
					isModalOpen={isModalOpen}
					formData={formData}
					initialFormData={initialFormData}
				/>
			</Card>
		</Col>
	);
};

export default UserCard;
