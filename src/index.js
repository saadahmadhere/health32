import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = {
	components: {
		Card: {
			actionsBg: '#fafafa',
		},
	},
};
root.render(
	<React.StrictMode>
		<ConfigProvider theme={theme}>
			<App />
		</ConfigProvider>
	</React.StrictMode>
);
