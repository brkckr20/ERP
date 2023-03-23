import axios from 'axios';
import { API_URL } from '../../config/api';
const API = API_URL

export const birimKaydet = async (values) => {
    try {
        const { data } = await axios.post(`${API}/birim`, values);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const birimSil = async (id) => {
    try {
        const { data } = await axios.delete(`${API}/birim/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}