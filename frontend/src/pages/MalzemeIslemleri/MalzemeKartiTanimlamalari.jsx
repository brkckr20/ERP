import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Icon from '../../icons';
import { getData } from './api';
import { kartVeyaKodlamaKaydet, cariGetir/* , birimGetir */, kayitlariListele } from '../globalApi';
import Modal from '../../components/Modal';
import ProcessButtonGroup from '../../components/ProcessButton/ProcessButtonGroup';
import ProcessButton from '../../components/ProcessButton/ProcessButton';
import Bildirim, { basarili } from '../../components/Bildirim';

const MalzemeKartiTanimlamalari = () => {

    const [malzemeListesi, setMalzemeListesi] = useState([]);
    const [birimListesi, setBirimListesi] = useState([]);
    const [cariListesi, setCariListesi] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [modalShow, setModalShow] = useState(false);

    const filtered = malzemeListesi.filter((item) => {
        return Object.keys(item).some((key) => {
            return item[key].toString().toLowerCase().includes(filterText.toLowerCase());
        })
    })

    const formik = useFormik({
        initialValues: {
            ID: 0,
            MALZEME_KODU: '',
            MALZEME_ADI: '',
            BIRIM: '',
            TEDARIKCI_KODU: '',
            TEDARIKCI_ADI: '',
            PASIF: false,
            MALZEME_GRUP: '',
            MALZEME_MARKA: '',
        },
        onSubmit: async (values, bag) => {
            // setData(values);
            const { code, message } = await kartVeyaKodlamaKaydet("malzemekarti", values, values.ID);
            if (code === 200) {
                basarili(message);
            }
            // bag.resetForm();
        },
    });

    const firmaSec = (item) => {
        formik.values.TEDARIKCI_KODU = item.FIRMA_KODU
        formik.values.TEDARIKCI_ADI = item.FIRMA_UNVANI
    }

    const formaAktar = item => {
        formik.values.ID = item.ID;
        formik.values.MALZEME_KODU = item.MALZEME_KODU;
        formik.values.MALZEME_ADI = item.MALZEME_ADI;
        formik.values.MALZEME_GRUP = item.MALZEME_GRUP;
        formik.values.MALZEME_MARKA = item.MALZEME_MARKA;
        formik.values.PASIF = item.PASIF;
        formik.values.BIRIM = item.BIRIM;
        formik.values.TEDARIKCI_KODU = item.TEDARIKCI_KODU;
        formik.values.TEDARIKCI_ADI = item.TEDARIKCI_ADI;
    }

    useEffect(() => {
        getData().then(val => setMalzemeListesi(val.data))
        kayitlariListele("birim").then(val => setBirimListesi(val.data))
        kayitlariListele("cari").then(val => setCariListesi(val.data))
    }, [birimListesi])

    return (
        <>
            <Bildirim />
            <div className='p-2 max-w-md'>
                <form action="">
                    <ProcessButtonGroup>
                        <ProcessButton icon="new" title="Yeni" onClick={() => { }} type="button" />
                        <ProcessButton icon="save" title="Kaydet" onClick={formik.handleSubmit} type="submit" />
                    </ProcessButtonGroup>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Malzeme Kodu : </label>
                        <input value={formik.values.MALZEME_KODU} onChange={formik.handleChange} name="MALZEME_KODU" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Malzeme Adı : </label>
                        <input value={formik.values.MALZEME_ADI} onChange={formik.handleChange} name="MALZEME_ADI" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Birim : </label>
                        <select className='border w-full' name="BIRIM" value={formik.values.BIRIM} onChange={formik.handleChange}>
                            <option value="">{'Seçiniz'}</option>
                            {
                                birimListesi.map((item, index) => (
                                    <option key={index} value={item.ad}/* value={item.ad} */>{item.ad}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Tedarikçi Firma Kodu : </label>
                        <div className='flex border'>
                            <input value={formik.values.TEDARIKCI_KODU} onChange={formik.handleChange} name="TEDARIKCI_KODU" className='w-full outline-none px-1' type="text" />
                            <button type='button' onClick={() => setModalShow(true)}><Icon name="dots" /></button>
                        </div>
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Tedarikçi Firma Adı : </label>
                        <input disabled="disabled" value={formik.values.TEDARIKCI_ADI} onChange={formik.handleChange} name="TEDARIKCI_ADI" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Pasif? : </label>
                        <input value={formik.values.PASIF} onChange={formik.handleChange} name="PASIF" className='w-full border outline-none px-1' type="checkbox" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Malzeme Grup : </label>
                        <input value={formik.values.MALZEME_GRUP} onChange={formik.handleChange} name="MALZEME_GRUP" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Malzeme Marka : </label>
                        <input value={formik.values.MALZEME_MARKA} onChange={formik.handleChange} name="MALZEME_MARKA" className='w-full border outline-none px-1' type="text" />
                    </div>
                </form>
            </div>
            <div className='border-t border-gray-200 px-2'>
                <div className='flex gap-4 items-center my-2'>
                    <h1 className=' text-lg font-semibold'>Malzeme Listesi</h1>
                    <div>
                        <label className='mr-2'>Ara : </label>
                        <input type="text" className='border outline-none pl-1' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                    </div>
                </div>
                <table className='w-full'>
                    <thead className='bg-green-200'>
                        <tr className='py-2'>
                            <td>Malz. Kodu</td>
                            <td>Malz. Adı</td>
                            <td>Malz. Birim</td>
                            <td>Ted. Firma Kodu</td>
                            <td>Ted. Firma Adı</td>
                            <td>Pasif ?</td>
                            <td>Malz. Grup</td>
                            <td>Malz. Marka</td>
                            <td>İşlem</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filtered.map((item, index) => (
                                <tr key={index} className='hover:bg-gray-200 duration-150 select-none cursor-pointer' /* onClick={() => rowSelect(item.ID)} */>
                                    <td>{item.MALZEME_KODU}</td>
                                    <td>{item.MALZEME_ADI}</td>
                                    <td>{item.BIRIM}</td>
                                    <td>{item.TEDARIKCI_KODU}</td>
                                    <td>{item.TEDARIKCI_ADI}</td>
                                    <td>{item.PASIF}</td>
                                    <td>{item.MALZEME_GRUP}</td>
                                    <td>{item.MALZEME_MARKA}</td>
                                    <td onClick={() => formaAktar(item)}>
                                        <Icon name="update" size={20} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot className='bg-green-200 w-full'>
                        <tr>
                            <td>Toplam : </td>
                            <td>{filtered.length}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <Modal title="Firma Seçiniz" modalShow={modalShow} setModalShow={setModalShow} firmaSec={firmaSec}>
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
                            cariListesi.map((item, index) => (
                                <tr key={index} className='hover:bg-gray-200 duration-150 select-none cursor-pointer'
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
        </>
    )
}

export default MalzemeKartiTanimlamalari