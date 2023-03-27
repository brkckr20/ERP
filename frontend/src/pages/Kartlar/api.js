import axios from 'axios';
import { API_URL } from '../../config/api'
// const API = "http://localhost:3001";
const API = API_URL;

export const cariKaydet = async (values) => {
    try {
        const { data } = await axios.post(`${API}/cari`, values);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const cariTipiGetir = async () => {
    try {
        const { data } = await axios.get(`${API}/cari/tipi`);
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const ulkeGetir = async () => {
    try {
        const { data } = await axios.get(`${API}/ulke`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const ulkeKaydet = async (values) => {
    try {
        const { data } = await axios.post(`${API}/ulke`, values);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const aksesuarKartiKaydet = async (values) => {
    try {
        const { data } = await axios.post(`${API}/aksesuar/kart`, values);
        return data;
    } catch (error) {
        console.log(error);
    }
}