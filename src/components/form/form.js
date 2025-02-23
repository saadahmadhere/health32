import { Modal, Form, Input, Button } from 'antd';
import { useEffect } from 'react';

const UserForm = ({
	formData,
	onCancelCb,
	onOkCb,
	isModalOpen,
	initialFormData,
}) => {
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(formData);
	}, [formData, form, isModalOpen]);

	const handleOk = () => {
		form
			.validateFields()
			.then((values) => {
				onOkCb({ values, id: formData.id });
			})
			.catch((info) => {
				console.log('Validate Failed:', info);
			});
	};

	const handleCancel = () => {
		onCancelCb();
		form.resetFields();
	};

	return (
		<Modal
			title='Edit Form'
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<Button key='cancel' onClick={handleCancel}>
					Cancel
				</Button>,
				<Button key='submit' type='primary' onClick={handleOk}>
					OK
				</Button>,
			]}
		>
			<Form
				name='basic'
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				style={{
					maxWidth: 600,
				}}
				form={form}
				initialValues={initialFormData}
			>
				<Form.Item
					label='Name'
					name='name'
					rules={[
						{
							required: true,
							message: 'Please input your name!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Email'
					name='email'
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
						{ type: 'email', message: 'Please enter a valid email address' },
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Phone'
					name='phone'
					rules={[
						{
							required: true,
							message: 'Please input your phone number!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Website'
					name='website'
					rules={[
						{
							required: true,
							message: 'Please input your website!',
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default UserForm;
