import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Icon from '../../icons';
import { getData, malzemeGirisKaydet, malzemeGirisGetir, malzemeDepoListeDetay, malzemeDepoGirisTekKayitGetir } from './api';
import { kalemIslemGetir, cariGetir, birimGetir, oncekiKayitGetir, sonrakiKayitGetir, depoKaydet, vazgec, depoStokGetir } from '../globalApi';
import Modal from '../../components/Modal';
import ListModal from '../../components/Modal';
import globalFilter from '../../utils/globalFilter';
import LabelInput from '../../components/Inputs/LabelInput';
import { converDate } from '../../utils/converDate';
import Bildirim, { basarili, hatali, bilgi } from '../../components/Bildirim';
import MalzemeDepoTab from './MalzemeDepoTab';

const MalzemeCikis = () => {

    const [malzemeStokListesi, setMalzemeStokListesi] = useState([]);
    const [birimListesi, setBirimListesi] = useState([]);
    const [cariListesi, setCariListesi] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [filterCompany, setFilterCompany] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [listModalShow, setListModalShow] = useState(false);
    const [secilenKalem, setSecilenKalem] = useState({});
    const [kalem, setKalem] = useState([]);
    const [kalemIslemListesi, setKalemIslemListesi] = useState([]);
    const [viewedTab, setViewedTab] = useState("malzemedepostok")

    // önceki kayıtların listelenmesi işlemleri
    const [listeDetay, setListeDetay] = useState([]);
    const [oncekiKayit, setOncekiKayit] = useState([]);
    const [gosterilenKayitId, setGosterilenKayitId] = useState(0);
    const [ilkKayitVar, setIlkKayitVar] = useState(true);
    const [sonKayitVar, setSonKayitVar] = useState(true);

    const filtered = globalFilter(malzemeStokListesi, filterText);
    const firmaFiltrele = globalFilter(cariListesi, filterCompany);

    const initialValues = {
        ISLEM_CINSI: 'MALZEME_CIKIS',
        TARIH: '',
        TEDARIKCI_KODU: '',
        TEDARIKCI_ADI: '',
        FATURA_NO: '',
        kalem,
        ACIKLAMA: "",
        TAKIP_NO: ""
    }

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            const veri = await depoKaydet("malzemedepo", values, kalem, "giris", gosterilenKayitId);
            basarili(veri.message);
        },
    });

    const firmaSec = (item) => {
        formik.values.TEDARIKCI_KODU = item.FIRMA_KODU
        formik.values.TEDARIKCI_ADI = item.FIRMA_UNVANI
    }

    useEffect(() => {
        birimGetir().then(val => setBirimListesi(val.data));
        cariGetir().then(val => setCariListesi(val.data))
        kalemIslemGetir(formik.values.ISLEM_CINSI).then(val => {
            setKalemIslemListesi(val.data)
        });
        depoStokGetir("malzemedepo", formik.values.ISLEM_CINSI).then(({ data }) => setMalzemeStokListesi(data));
    }, [formik.handleSubmit])

    const handleBirimUpdate = async (event, kod) => {
        secilenKalem.MIKTAR = event.target.value;
    }
    const handleKalemIslem = async (event, i) => {
        secilenKalem.KALEM_ISLEM = event.target.value;
    }

    const handleFocus = (i) => {
        const s = kalem.find(item => item.MALZEME_KODU === i.MALZEME_KODU)
        setSecilenKalem(s)
    }

    const satirSil = (kod) => {
        const result = kalem.filter(item => item.MALZEME_KODU !== kod);
        setKalem(result);
    }

    const kayitGetir = async (depoTipi, depoAdi) => {
        const { data } = await vazgec(depoTipi, depoAdi);
        setGosterilenKayitId(data[0].ID)
        setOncekiKayit(data);
        setSonKayitVar(false);
        setIlkKayitVar(true);
    }

    const eskiKayitGetir = async (depoAdi, depoTipi, kayitNo) => {
        const veri = await oncekiKayitGetir(depoAdi, depoTipi, kayitNo);
        /* ilk kayıt yok ise */
        if (veri.code === 400) {
            setIlkKayitVar(false);
            return;
        }
        setGosterilenKayitId(veri.data[0].ID);
        setOncekiKayit(veri.data);
        setSonKayitVar(true)
    }

    const sonrakiKayit = async (depoAdi, depoTipi, kayitNo) => {
        const veri = await sonrakiKayitGetir(depoAdi, depoTipi, kayitNo);
        /* SON kayıt yok ise */
        if (veri.code === 400) {
            setSonKayitVar(false);
            return;
        }
        setGosterilenKayitId(veri.data[0].ID)
        setOncekiKayit(veri.data);
        setIlkKayitVar(true);
    }

    const listeDetayGetir = async (depoTipi) => {
        setListModalShow(true)
        // const veri = await malzemeDepoListeDetay(depoTipi);
        // setListeDetay(veri);
    }

    const yeniFisOlustur = () => {
        setOncekiKayit([]);
        setGosterilenKayitId(0)
    }

    // const idYeGoreKayitGetir = async (id) => {
    //     setSonKayitVar(true);
    //     const veri = await malzemeDepoGirisTekKayitGetir(id);
    //     setGosterilenKayitId(veri[0].ID)
    //     setOncekiKayit(veri);
    //     setListModalShow(false);
    // }

    return (
        <>
            <Bildirim />
            <div className='p-2'>
                <form action="">
                    <div className='flex gap-1 my-2'>
                        <button title='Yeni' onClick={yeniFisOlustur} type="button" className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="new" size={35} />
                        </button>
                        <button title='Kaydet' onClick={formik.handleSubmit} type="submit" className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="save" size={35} />
                        </button>
                        <button title='Güncelle' type='button' className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="update" size={35} />
                        </button>
                        <button title='Geri' type="button" onClick={() => eskiKayitGetir("malzemedepo", "giris", gosterilenKayitId)} disabled={ilkKayitVar ? false : true} className='border p-2 rounded-lg hover:bg-slate-200 disabled:bg-slate-300 disabled:cursor-not-allowed'>
                            <Icon name="arrowBack" size={35} />
                        </button>
                        <button title='İleri' type="button" onClick={() => sonrakiKayit("malzemedepo", "giris", gosterilenKayitId)} disabled={sonKayitVar ? false : true} className='border p-2 rounded-lg hover:bg-slate-200 disabled:bg-slate-300 disabled:cursor-not-allowed'>
                            <Icon name="arrowNext" size={35} />
                        </button>
                        <button title='Liste' type="button" onClick={() => listeDetayGetir("giris")} className='border p-2 rounded-lg hover:bg-slate-200 disabled:bg-slate-300 disabled:cursor-not-allowed'>
                            <Icon name="list" size={35} />
                        </button>
                        <button title='Vazgeç' type="button" onClick={() => kayitGetir("giris", "malzemedepo")} className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="giveUp" size={35} />
                        </button>
                        <button title='Sil' type="button" className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="trash" size={35} />
                        </button>
                    </div>
                    <div className='flex w-full gap-x-2 bg-orange-200 p-2'>
                        <div>
                            <LabelInput label="İşlem Cinsi : " value={formik.values.ISLEM_CINSI} disabled="disabled" onChange={formik.handleChange} name="ISLEM_CINSI" className='w-full border outline-none px-1' type="text" />
                            <LabelInput label="Tarih : " value={oncekiKayit.length > 0 ? converDate(oncekiKayit[0].TARIH) : formik.values.TARIH} onChange={formik.handleChange} name="TARIH" className='w-full border outline-none px-1' type="date" />
                            <div className='flex'>
                                <label className='inline-block max-w-[200px] w-full'>Tedarikçi Firma Kodu : </label>
                                <div className='flex border'>
                                    <input value={oncekiKayit.length > 0 ? oncekiKayit[0].FIRMA_KODU : formik.values.TEDARIKCI_KODU} onChange={formik.handleChange} name="TEDARIKCI_KODU" className='w-full outline-none px-1' type="text" />
                                    <button type='button' className='bg-white' onClick={() => setModalShow(true)}><Icon name="dots" /></button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <LabelInput label="Tedarikçi Firma Adı : " value={oncekiKayit.length > 0 ? oncekiKayit[0].FIRMA_ADI : formik.values.TEDARIKCI_ADI} onChange={formik.handleChange} name="TEDARIKCI_ADI" className='w-full border outline-none px-1' type="text" />
                            <LabelInput label="Fatura No : " value={formik.values.FATURA_NO} onChange={formik.handleChange} name="FATURA_NO" className='w-full border outline-none px-1' type="text" />
                            <LabelInput label="Kayıt No : " disabled value={oncekiKayit.length > 0 ? oncekiKayit[0].ID : ""} name="KAYIT_NO" className='w-full border outline-none px-1' type="text" />
                        </div>
                        <div>
                            <div className='flex h-full'>
                                <label className='inline-block max-w-[200px] w-full'>Açıklama : </label>
                                <textarea name="ACIKLAMA" value={oncekiKayit.length > 0 ? oncekiKayit[0].ACIKLAMA : formik.values.ACIKLAMA} onChange={formik.handleChange} className='h-full pl-1 max-w-[200px] w-full'></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='h-80 border mt-1'>
                        <div className='flex h-full'>
                            <div className='bg-gray-200 text-center w-6 shrink-0'>
                                <div className='my-1'>
                                    {/* <button title="Yeni Satır Ekle">
                                        <Icon name="new" />
                                    </button> */}
                                </div>
                            </div>
                            <div className='w-full overflow-x-auto'>
                                <table className='relative'>
                                    <thead className='bg-blue-800 sticky top-0'>
                                        <tr className='text-white text-center overflow-x-scroll'>
                                            <td className='w-[40px] bg-red-600'>Sil</td>
                                            <td className='w-[200px]'>Kalem İşlem</td>
                                            <td className='w-[200px]'>Malzeme Kodu</td>
                                            <td className='w-[300px]'>Malzeme Adı</td>
                                            <td className='w-[75px]'>Miktar</td>
                                            <td className='w-[200px]'>Birim</td>
                                            <td className='w-[200px]'>Takip No</td>
                                        </tr>
                                    </thead>
                                    <tbody className='overflow-x-scroll'>
                                        {
                                            !oncekiKayit.length > 0 ?
                                                kalem.map((i, k) => (
                                                    <tr key={k} className="overflow-x-scroll">
                                                        <td className='w-[40px] flex justify-center'><button type='button' onClick={() => satirSil(i.MALZEME_KODU)}><Icon name="trash" /></button></td>
                                                        <td className='w-[200px]'>
                                                            <select className='h-[23.98px] w-[200px]' onClick={() => handleFocus(i)} onChange={(e) => handleKalemIslem(e, i)} name="islemcinsi" id="">
                                                                <option value="">Seçiniz</option>
                                                                {
                                                                    kalemIslemListesi.map(item => (
                                                                        <option key={item.KALEM_ISLEM} value={item.KALEM_ISLEM}>{item.KALEM_ISLEM}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </td>
                                                        <td className='w-[200px]'><input type="text" placeholder='Malzeme Kodu' value={i.MALZEME_KODU} disabled="disabled" /></td>
                                                        <td className='w-[300px]'><input className='w-full' type="text" placeholder='Malzeme Adı' value={i.MALZEME_ADI} title={i.MALZEME_ADI} disabled="disabled" /></td>
                                                        <td className='w-[75px]'><input type="number" className='w-[75px] border'
                                                            onChange={(e) => handleBirimUpdate(e, i)}
                                                            onFocus={() => handleFocus(i)}
                                                        /></td>
                                                        {/* <td className='w-[200px]'>
                                                            <input type="text" placeholder='Birim' value={i.BIRIM} disabled="disabled" />
                                                        </td> */}
                                                        <td className='w-[200px]'>
                                                            <select className='w-[200px]' value={i.BIRIM} name="birim" id="">
                                                                <option value="">Seçiniz</option>
                                                                {
                                                                    birimListesi.map(item => (
                                                                        <option key={item.ad} value={item.ad}>{item.ad}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </td>
                                                        <td className='w-[200px]'><input type="text" placeholder='Takip No' value={i.TAKIP_NO} disabled="disabled" /></td>
                                                    </tr>
                                                ))
                                                : oncekiKayit.map((i, k) => (
                                                    <tr key={k} className="overflow-x-scroll">
                                                        <td className='w-[40px] flex justify-center'><button type='button' onClick={() => satirSil(i.MALZEME_KODU)}><Icon name="trash" /></button></td>
                                                        <td className='w-[200px]'>
                                                            <select className='h-[23.98px] w-[200px]' onClick={() => handleFocus(i)} onChange={(e) => handleKalemIslem(e, i)} name="islemcinsi" id="">
                                                                <option value={i.KALEM_ISLEM}>{i.KALEM_ISLEM}</option>
                                                            </select>
                                                        </td>
                                                        <td className='w-[200px]'><input type="text" placeholder='Malzeme Kodu' value={i.MALZEME_KODU} disabled="disabled" /></td>
                                                        <td className='w-[300px]'><input className='w-full' type="text" placeholder='Malzeme Adı' value={i.MALZEME_ADI} title={i.MALZEME_ADI} disabled="disabled" /></td>
                                                        <td className='w-[200px]'><input type="number" placeholder='Miktar' value={i.MIKTAR}
                                                            onChange={(e) => handleBirimUpdate(e, i)}
                                                            onFocus={() => handleFocus(i)}
                                                        /></td>
                                                        <td className='w-[200px]'><input type="text" placeholder='Birim' value={i.BIRIM} disabled="disabled" /></td>
                                                        <td className='w-[200px]'><input type="text" placeholder='Takip No' value={i.TAKIP_NO} disabled="disabled" /></td>
                                                    </tr>
                                                ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className='border-t border-gray-200 px-2 overflow-x-auto max-h-[410px]'>
                <div className='flex gap-2 my-1'>
                    <button className={`${viewedTab === 'malzemedepostok' ? 'bg-orange-300' : 'bg-orange-100'} p-1`} onClick={() => setViewedTab("malzemedepostok")}>Malzeme Depo & Stok</button>
                    <button className={`${viewedTab === 'test' ? 'bg-orange-300' : 'bg-orange-100'} p-1`} onClick={() => setViewedTab("test")}>Test</button>
                </div>
                {viewedTab === 'malzemedepostok' && <MalzemeDepoTab filtered={filtered} filterText={filterText} setFilterText={setFilterText} setKalem={setKalem} />}
                {viewedTab === 'test' && <span>test</span>}
            </div>
            <Modal title="Firma Seçiniz" modalShow={modalShow} setModalShow={setModalShow} firmaSec={firmaSec}>
                <div>
                    <span>Ara : </span>
                    <input type="text" className='border outline-none pl-1' value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)} />
                </div>
                <table className='w-full'>
                    <thead className='bg-blue-200'>
                        <tr className='py-2'>
                            <td>Firma Kodu</td>
                            <td>Firma Adı</td>
                            <td>Adres</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            firmaFiltrele.map(item => (
                                <tr key={item.ID} className='hover:bg-gray-200 duration-150 select-none cursor-pointer'
                                    onDoubleClick={() => {
                                        firmaSec(item)
                                        setModalShow(false)
                                    }}>
                                    <td>{item.FIRMA_KODU}</td>
                                    <td>{item.FIRMA_UNVANI}</td>
                                    <td>{item.ADRES1}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Modal>
            <ListModal title="Liste Detay" modalShow={listModalShow} setModalShow={setListModalShow} firmaSec={firmaSec}>
                <div>
                    <span>Ara : </span>
                    <input type="text" className='border outline-none pl-1 mb-1' value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)} />
                </div>
                <table className='w-full'>
                    <thead className='bg-blue-200'>
                        <tr className='py-2'>
                            <td className='w-32'>Tarih</td>
                            <td className='w-32'>Firma Kodu</td>
                            <td>Firma Adı</td>
                            <td className='w-32'>Kalem İşlem</td>
                            <td className='w-32'>Malzeme Kodu</td>
                            <td className='w-32'>Malzeme Adı</td>
                            <td className='w-16'>Miktar</td>
                            <td>Birim</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listeDetay.map((item, key) => (
                                <tr key={key} className='hover:bg-gray-200 duration-150 select-none cursor-pointer border divide-x'
                                    onDoubleClick={() => idYeGoreKayitGetir(item.ID)}>
                                    <td>{converDate(item.TARIH)}</td>
                                    <td>{item.FIRMA_KODU}</td>
                                    <td>{item.FIRMA_ADI}</td>
                                    <td>{item.KALEM_ISLEM}</td>
                                    <td>{item.MALZEME_KODU}</td>
                                    <td>{item.MALZEME_ADI}</td>
                                    <td>{item.MIKTAR}</td>
                                    <td>{item.BIRIM}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </ListModal>
        </>
    )
}

export default MalzemeCikis