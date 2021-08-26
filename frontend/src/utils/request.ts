/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL_DEV || 'http://localhost:3001'}`,
  timeout: 10000,
  params: {} // do not remove this, its added to add params later in the config
});

// Add a request interceptor

const request = {
  getData(action: string, data?: any) {
    const url = `${process.env.REACT_APP_API_URL_DEV || 'http://localhost:3001'}` + action;
    return instance.get(url, data);
  },
  postData(action: string, data?: any) {
    const url = `${process.env.REACT_APP_API_URL_DEV || 'http://localhost:3001'}` + action;
    return instance.post(url, data);
  },
  putData(action: string, data?: any) {
    const url = `${process.env.REACT_APP_API_URL_DEV || 'http://localhost:3001'}` + action;
    return instance.put(url, data);
  }
};

export default request;
