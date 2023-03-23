import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Icon from '../../icons';
import Modal from '../../components/Modal';
import CariTipiModal from '../../components/Modal';
import { cariKaydet, ulkeGetir, cariTipiGetir } from './api'
import { cariGetir } from '../globalApi';
import Bildirim, { basarili } from '../../components/Bildirim';
import ExcelExport from '../../components/ExcelExport';

const FirmaKarti = () => {

    const [malzemeListesi, setMalzemeListesi] = useState([]);
    const [ulkeListesi, setUlkeListesi] = useState([]);
    const [cariListesi, setCariListesi] = useState([]);
    const [cariTipiListesi, setCariTipiListesi] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [cariTipiModal, setCariTipiModal] = useState(false);

    const filtered = malzemeListesi.filter((item) => {
        return Object.keys(item).some((key) => {
            return item[key].toString().toLowerCase().includes(filterText.toLowerCase());
        })
    })

    const formik = useFormik({
        initialValues: {
            FIRMA_KODU: '',
            FIRMA_ADI1: '',
            ADRES1: '',
            ADRES2: '',
            ULKE: '',
            ULKE_KODU: '',
            SEHIR: '',
            ILCE: '',
            POSTA_KODU: '',
            VERGI_DAIRESI: '',
            VERGI_NO: '',
            TELEFON: '',
            GIB_MAIL: '',
            CARI_TIPI: '',
        },
        onSubmit: async (values, bag) => {
            const result = await cariKaydet(values);
            basarili(result.message);
            bag.resetForm();
        },
    });

    const firmaSec = (item) => {
        formik.values.ULKE = item.ULKE_ADI
        formik.values.ULKE_KODU = item.KISA_KODU
    }

    const cariTipiSec = (item) => {
        formik.values.CARI_TIPI = item.CARI_TIPI
    }

    const formaEkle = (item) => {
        formik.values.ADRES1 = item.ADRES1;
        formik.values.ADRES2 = item.ADRES2;
        formik.values.CARI_TIPI = item.CARI_TIPI;
        formik.values.FIRMA_KODU = item.FIRMA_KODU;
        formik.values.FIRMA_ADI1 = item.FIRMA_UNVANI;
        formik.values.GIB_MAIL = item.GIB_MAIL;
        formik.values.ILCE = item.ILCE;
        formik.values.POSTA_KODU = item.POSTA_KODU;
        formik.values.SEHIR = item.SEHIR;
        formik.values.TELEFON = item.telefon;
        formik.values.ULKE = item.ULKE;
        formik.values.ULKE_KODU = item.ULKE_KODU;
        formik.values.VERGI_DAIRESI = item.VERGI_DAIRESI;
        formik.values.VERGI_NO = item.VERGI_NO;
    }

    useEffect(() => {
        ulkeGetir().then(data => setUlkeListesi(data.data))
        cariGetir().then(data => setCariListesi(data.data))
        cariTipiGetir().then(data => setCariTipiListesi(data.data))
    }, [cariListesi])

    return (
        <div className='bg-slate-300 w-full h-full'>
            <div className='p-2 max-w-md '>
                <form>
                    <div className='flex gap-1 my-2'>
                        <button title='Kaydet' onClick={formik.handleSubmit} type="submit" className='border p-2 rounded-lg bg-white hover:bg-slate-200'>
                            <Icon name="save" size={35} />
                        </button>
                        <ExcelExport excelData={cariListesi} fileName="Firma Listesi" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Firma Kodu : </label>
                        <input value={formik.values.FIRMA_KODU} onChange={formik.handleChange} name="FIRMA_KODU" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Firma Adı 1 : </label>
                        <input value={formik.values.FIRMA_ADI1} onChange={formik.handleChange} name="FIRMA_ADI1" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Adres 1 : </label>
                        <input value={formik.values.ADRES1} onChange={formik.handleChange} name="ADRES1" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Adres 2 : </label>
                        <input value={formik.values.ADRES2} onChange={formik.handleChange} name="ADRES2" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Ülke : </label>
                        <div className='flex border'>
                            <input value={formik.values.ULKE} onChange={formik.handleChange} name="ULKE" className='w-full outline-none px-1' type="text" />
                            <button type='button' className='bg-white' onClick={() => setModalShow(true)}><Icon name="dots" /></button>
                        </div>
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Ülke Kodu : </label>
                        <input value={formik.values.ULKE_KODU} onChange={formik.handleChange} name="ULKE_KODU" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Şehir : </label>
                        <input value={formik.values.SEHIR} onChange={formik.handleChange} name="SEHIR" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Cari İlçe : </label>
                        <input value={formik.values.ILCE} onChange={formik.handleChange} name="ILCE" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Posta Kodu : </label>
                        <input value={formik.values.POSTA_KODU} onChange={formik.handleChange} name="POSTA_KODU" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Vergi Dairesi : </label>
                        <input value={formik.values.VERGI_DAIRESI} onChange={formik.handleChange} name="VERGI_DAIRESI" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Vergi Numarası : </label>
                        <input value={formik.values.VERGI_NO} onChange={formik.handleChange} name="VERGI_NO" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Telefon : </label>
                        <input value={formik.values.TELEFON} onChange={formik.handleChange} name="TELEFON" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Gib-Mail : </label>
                        <input value={formik.values.GIB_MAIL} onChange={formik.handleChange} name="GIB_MAIL" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Cari Tipi : </label>
                        <div className='flex border'>
                            <input value={formik.values.CARI_TIPI} onChange={formik.handleChange} name="CARI_TIPI" className='w-full outline-none px-1' type="text" />
                            <button type='button' className='bg-white' onClick={() => setCariTipiModal(true)}><Icon name="dots" /></button>
                        </div>
                    </div>

                </form>
            </div>
            <div className='px-2'>
                <h1 className='font-semibold'>Mevcut Firma Listesi</h1>
                <table className='overscroll-auto w-full'>
                    <thead className='bg-blue-300 border'>
                        <tr>
                            <td>Firma Kodu</td>
                            <td>Firma Adı</td>
                            <td>Adres</td>
                            <td>Ülke</td>
                            <td>Şehir</td>
                            <td>İlçe</td>
                            <td>Telefon</td>
                            <td>İşlem</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cariListesi.map(item => (
                                <tr key={item.ID} className='hover:bg-gray-200 cursor-pointer border divide-x'>
                                    <td className={`${!item.FIRMA_KODU && 'bg-red-600'}`}>{item.FIRMA_KODU}</td>
                                    <td className={`${!item.FIRMA_UNVANI && 'bg-red-600'}`}>{item.FIRMA_UNVANI}</td>
                                    <td className={`${!item.ADRES1 && 'bg-red-600'}`}>{item.ADRES1}</td>
                                    <td className={`${!item.ULKE && 'bg-red-600'}`}>{item.ULKE}</td>
                                    <td className={`${!item.SEHIR && 'bg-red-600'}`}>{item.SEHIR}</td>
                                    <td className={`${!item.ILCE && 'bg-red-600'}`}>{item.ILCE}</td>
                                    <td className={`${!item.TELEFON && 'bg-red-600'}`}>{item.TELEFON}</td>
                                    <td className={``}>
                                        <div className='flex items-center justify-evenly'>
                                            <button onClick={() => formaEkle(item)}><Icon name="update" /></button>
                                            {/*<button onClick={() => sil(item.id)}><Icon name="trash" /></button> */}
                                        </div></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Modal title="Ülke Seçiniz" modalShow={modalShow} setModalShow={setModalShow}>
                <table className='w-full'>
                    <thead className='bg-blue-200'>
                        <tr className='py-2'>
                            <td>Ülke Adı</td>
                            <td>Ülke Kodu</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ulkeListesi.map(item => (
                                <tr key={item.ID} className='hover:bg-gray-200 duration-150 select-none cursor-pointer'
                                    onDoubleClick={() => {
                                        firmaSec(item)
                                        setModalShow(false)
                                    }}>
                                    <td>{item.ULKE_ADI}</td>
                                    <td>{item.KISA_KODU}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Modal>
            <CariTipiModal title="Cari Tipi Seçiniz" modalShow={cariTipiModal} setModalShow={setCariTipiModal}>
                <table className=''>
                    <thead className='bg-blue-200'>
                        <tr className='py-2'>
                            <td>Cari Tipi</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cariTipiListesi.map(item => (
                                <tr key={item.CARI_TIPI} className='hover:bg-gray-200 duration-150 select-none cursor-pointer'
                                    onDoubleClick={() => {
                                        cariTipiSec(item);
                                        setCariTipiModal(false)
                                    }}>
                                    <td>{item.CARI_TIPI}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </CariTipiModal>
            <Bildirim />
        </div>
    )
}

export default FirmaKarti