import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-burger-builder-86f6b.firebaseio.com/"
});

export default instance;