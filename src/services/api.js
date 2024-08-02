import axios from 'axios';

const API_URL = 'http://your-api-url';

export const fetchChefs = async () => {
    const response = await axios.get(`${API_URL}/chefs`);
    return response.data;
};

export const fetchChefById = async (id) => {
    const response = await axios.get(`${API_URL}/chefs/${id}`);
    return response.data;
};

export const fetchBlogs = async () => {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
};

export const fetchBlogById = async (id) => {
    const response = await axios.get(`${API_URL}/blogs/${id}`);
    return response.data;
};
