import axios from 'axios';

const apiProducts = axios.create({
    baseURL: `http://localhost:3000/products`,
    validateStatus: (status: number): boolean => {
        return status >= 200 && status < 300;
    },
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiProducts;
