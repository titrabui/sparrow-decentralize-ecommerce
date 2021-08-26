import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import App from './App';

require('dotenv').config()

ReactDOM.render(<App />, document.getElementById('root'));
