import axios from 'axios';
import { API_URL } from '../config/api';

// const API = "http://localhost:3001";

const API = API_URL;

export const menuGetir = async (kullanici_id) => {
    try {
        const { data } = await axios.get(`${API}/menuler/${kullanici_id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const kullanicilariGetir = async () => {
    try {
        const { data } = await axios.get(`${API}/kullanici`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const menuleriGetir = async (kullanici_id = 1) => {
    try {
        const { data } = await axios.get(`${API}/menuler/${kullanici_id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const cariGetir = async () => {
    try {
        const { data } = await axios.get(`${API}/cari`);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const kayitlariListele = async (tabloAdi) => {
    try {
        const { data } = await axios.get(`${API}/${tabloAdi}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const dbGetir = async () => {
    try {
        const { data } = await axios.get(`${API}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const birimGetir = async () => {
    try {
        const { data } = await axios.get(`${API}/birim`);
        return data;
    } catch (error) {
        console.log(error)
    }
}


/* kalem islem getir */
export const kalemIslemGetir = async (depoAdi) => {
    try {
        const { data } = await axios.get(`${API}/kalem-islem/${depoAdi}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const oncekiKayitGetir = async (depoAdi, depoTipi, id) => {
    //depo tipi - giris mi cikis mi
    //depo adi - malzemegiris
    try {
        const { data } = await axios.get(`${API}/${depoAdi}/${depoTipi}/onceki/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const sonrakiKayitGetir = async (depoAdi, depoTipi, id) => {
    //depo tipi - giris mi cikis mi
    //depo adi - malzemegiris
    try {
        const { data } = await axios.get(`${API}/${depoAdi}/${depoTipi}/sonraki/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const depoKaydet = async (depoAdi, values, kalem, depoTipi, id) => {
    //id varsa güncelleme, yoksa yeni kayıt
    try {
        const { data } = await axios.post(`${API}/${depoAdi}/${depoTipi}/${id}`, { values, kalem });
        return data;
    } catch (error) {
        console.log(error.message);
    }
}


export const kartVeyaKodlamaKaydet = async (depoAdi, values, id) => {
    //id varsa güncelleme, yoksa yeni kayıt
    try {
        const { data } = await axios.post(`${API}/${depoAdi}/${id}`, { values });
        return data;
    } catch (error) {
        console.log(error.message);
    }
}



export const vazgec = async (depoTipi, depoAdi) => {
    /*
        eğer alan boş ise ve eski kayıtları görmek istiyorsak kullanılacak
        depoTipi = giriş depo mu çıkış depo mu olduğu
        depoAdi = hangi depodan verilerin getireleceği 
                - server isteklerinde routelara denk geliyor (frontendde kod kalabalığını azaltmak için)
    */
    try {
        const { data } = await axios.get(`${API}/${depoAdi}/${depoTipi}`);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}


export const depoStokGetir = async (depoAdi, depoTipi) => {
    try {
        const { data } = await axios.get(`${API}/${depoAdi}/${depoTipi}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const listeDetay = async (depoAdi, depoTipi) => {
    try {
        const { data } = await axios.get(`${API}/${depoAdi}/${depoTipi}/listedetay`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fisIslemSil = async (depoAdi, id) => {
    try {
        const { data } = await axios.delete(`${API}/${depoAdi}/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
} 