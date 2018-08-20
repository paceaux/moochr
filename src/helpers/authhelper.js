import axios from 'axios';

const API_URL = process.env.API_URL || 'https://localhost:3001/api/v1';

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('MUT')}`,
    },
});
