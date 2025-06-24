import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000';

export const registerUser = async (name, matriculationNumber, password, confirmPassword) => {
  try {
    const res = await axios.post(`${API_URL}/auth/api/register`, {name, matriculationNumber, password, confirmPassword});
    return res.data;
  } catch (error) {
    throw error.response.data.msg;
  }
};

export const loginUser = async (matriculationNumber, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/api/login`, { matriculationNumber, password });
    return res.data;
  } catch (error) {
    throw error.response.data.msg;
  }
};