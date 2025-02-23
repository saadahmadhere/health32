import { Form, Input } from 'antd';
const onFinish = (values) => {
	console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
	console.log('Failed:', errorInfo);
};

const UserForm = ({ formInitialValues }) => (
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
		// initialValues={{
		// 	remember: true,
		// }}
		onFinish={onFinish}
		onFinishFailed={onFinishFailed}
		autoComplete='off'
		onValuesChange={(e) => console.log(e)}
		initialValues={formInitialValues}
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
			<Input value={'test'} />
		</Form.Item>

		<Form.Item
			label='Email'
			name='email'
			rules={[
				{
					required: true,
					message: 'Please input your password!',
				},
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
);
export default UserForm;
