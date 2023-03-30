import { useState } from 'react';

export const useListeler = () => {
    const [malzemeListesi, setMalzemeListesi] = useState([]);
    const [birimListesi, setBirimListesi] = useState([]);
    const [cariListesi, setCariListesi] = useState([]);
    const [kalemIslemListesi, setKalemIslemListesi] = useState([]);
    const [listeDetay, setListeDetay] = useState([]);

    return {
        malzemeListesi,
        setMalzemeListesi,
        birimListesi,
        setBirimListesi,
        cariListesi,
        setCariListesi,
        kalemIslemListesi,
        setKalemIslemListesi,
        listeDetay, setListeDetay
    }
}