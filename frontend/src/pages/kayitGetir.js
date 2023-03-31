import { listeDetay, vazgec } from "./globalApi"

export const vazgecGetir = async (depoTipi, depoAdi, setGosterilenKayitId, setOncekiKayit, setSonKayitVar, setIlkKayitVar) => {
    const { data } = await vazgec(depoTipi, depoAdi);
    setGosterilenKayitId(data[0].ID);
    setOncekiKayit(data);
    setSonKayitVar(false);
    setIlkKayitVar(true);
}

export const listeDetayGetir = async (depoAdi, depoTipi, setListModalShow, setListeDetay) => {
    setListModalShow(true);
    const response = await listeDetay(depoAdi, depoTipi);
    setListeDetay(response.data);
}

export const idYeGoreFiltreleVeFormaYansit = (id, listeDetay, setOncekiKayit, setListModalShow, setGosterilenKayitId) => {
    const x = listeDetay.filter(item => item.ID === id);
    setOncekiKayit(x);
    setListModalShow(false);
    setGosterilenKayitId(id)
}
