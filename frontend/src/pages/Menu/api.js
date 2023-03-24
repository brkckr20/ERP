import axios from 'axios';
import { API_URL } from '../../config/api';

export const menuKaydet = async (input) => {
    try {
        const { data } = await axios.post(`${API_URL}/menuler`, input);
        return data;
    } catch (error) {
        console.log(error);
    }
}