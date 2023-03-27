import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Icon from '../../icons';
import { aksesuarKartiKaydet, ulkeGetir } from './api';
import Bildirim, { basarili } from '../../components/Bildirim';
import LabelInput from '../../components/Inputs/LabelInput';

const AksesuarKarti = () => {

    const [ulkeListesi, setUlkeListesi] = useState([]);
    const [filterText, setFilterText] = useState("");

    const filtered = ulkeListesi.filter((item) => {
        return Object.keys(item).some((key) => {
            return item[key].toString().toLowerCase().includes(filterText.toLowerCase());
        })
    })

    const formik = useFormik({
        initialValues: {
            ID: 0,
            AKSESUAR_KODU: '',
            AKSESUAR_CINSI: '',
            AKSESUAR_GRUP: '',
            AKSESUAR_EBAT: '',
            AKSESUAR_RENK: '',
            OZELLIK1: '',
            OZELLIK2: '',
            OZELLIK3: '',
            OZELLIK4: '',
            ACIKLAMA: '',
            BIRIM: '',
            BARKOD: '',
            DOVIZ_CINSI: '',
            BIRIM_FIYAT: 0.0,
            CARPAN: 0,
            BOLEN: 1,
            AKSESUAR_HACIM: 0,
            AKSESUAR_AGIRLIK: 0,
            MINIMUM_STOK: 0,
            MAXIMUM_STOK: 0,
            EN: 0,
            BOY: 0,
            YUKSEKLIK: 0,
            TEDARIKCI_FIRMA: '',
            TEDARIKCI_FIRMA_AD: '',
            MUSTERI_FIRMA: '',
            MUSTERI_FIRMA_AD: '',
            STOK_KODU: '',
            MICRON: '',
            PASIF: false,
        },
        onSubmit: async (values, bag) => {
            const response = await aksesuarKartiKaydet(values);
            if (response.code === 200) {
                basarili(message);
            }
            /*bag.resetForm(); */
        },
    });

    useEffect(() => {
        ulkeGetir().then(({ data }) => {
            setUlkeListesi([]);
        })
    }, [ulkeListesi])

    return (
        <>
            <div className='p-2 max-w-md'>
                <form action="">
                    <div className='flex gap-1 my-2'>
                        <button title='Kaydet' onClick={formik.handleSubmit} type="submit" className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="save" size={35} />
                        </button>
                    </div>
                    <LabelInput label="Kayıt No" value={formik.values.ID} onChange={formik.handleChange} name="ID" disabled={true} />
                    <LabelInput label="Aksesuar Kodu" value={formik.values.AKSESUAR_KODU} onChange={formik.handleChange} name="AKSESUAR_KODU" />
                    <LabelInput label="Aksesuar Cinsi" value={formik.values.AKSESUAR_CINSI} onChange={formik.handleChange} name="AKSESUAR_CINSI" />
                    <LabelInput label="Aksesuar Grup" value={formik.values.AKSESUAR_GRUP} onChange={formik.handleChange} name="AKSESUAR_GRUP" />
                    <LabelInput label="Aksesuar Ebat" value={formik.values.AKSESUAR_EBAT} onChange={formik.handleChange} name="AKSESUAR_EBAT" disabled={true} />
                    <LabelInput label="Aksesuar Renk" value={formik.values.AKSESUAR_RENK} onChange={formik.handleChange} name="AKSESUAR_RENK" />
                    <LabelInput label="Özellik 1" value={formik.values.OZELLIK1} onChange={formik.handleChange} name="OZELLIK1" />
                    <LabelInput label="Özellik 2" value={formik.values.OZELLIK2} onChange={formik.handleChange} name="OZELLIK2" />
                    <LabelInput label="Özellik 3" value={formik.values.OZELLIK3} onChange={formik.handleChange} name="OZELLIK3" />
                    <LabelInput label="Özellik 4" value={formik.values.OZELLIK4} onChange={formik.handleChange} name="OZELLIK4" />
                    <LabelInput label="Açıklama" value={formik.values.ACIKLAMA} onChange={formik.handleChange} name="ACIKLAMA" />
                    <LabelInput label="Birim" value={formik.values.BIRIM} onChange={formik.handleChange} name="BIRIM" />
                    <LabelInput label="Barkod" value={formik.values.BARKOD} onChange={formik.handleChange} name="BARKOD" />
                    <LabelInput label="Döviz Cinsi" value={formik.values.DOVIZ_CINSI} onChange={formik.handleChange} name="DOVIZ_CINSI" />
                    <LabelInput label="Birim Fiyat" value={formik.values.BIRIM_FIYAT} onChange={formik.handleChange} name="BIRIM_FIYAT" />
                    <LabelInput label="Çarpan" value={formik.values.CARPAN} onChange={formik.handleChange} name="CARPAN" />
                    <LabelInput label="Bölen" value={formik.values.BOLEN} onChange={formik.handleChange} name="BOLEN" />
                    <LabelInput label="Aksesuar Hacim (m3)" value={formik.values.AKSESUAR_HACIM} onChange={formik.handleChange} name="AKSESUAR_HACIM" disabled={true} />
                    <LabelInput label="Aksesuar Ağırlık" value={formik.values.AKSESUAR_AGIRLIK} onChange={formik.handleChange} name="AKSESUAR_AGIRLIK" />
                    <LabelInput label="Minimum Stok" value={formik.values.MINIMUM_STOK} onChange={formik.handleChange} name="MINIMUM_STOK" />
                    <LabelInput label="Maximum Stok" value={formik.values.MAXIMUM_STOK} onChange={formik.handleChange} name="MAXIMUM_STOK" />
                    <LabelInput label="En (W=Cm)" value={formik.values.EN} onChange={formik.handleChange} name="EN" />
                    <LabelInput label="Boy (L=Cm)" value={formik.values.BOY} onChange={formik.handleChange} name="BOY" />
                    <LabelInput label="Yükseklik (H=Cm)" value={formik.values.YUKSEKLIK} onChange={formik.handleChange} name="YUKSEKLIK" />
                    <LabelInput label="Tedarikçi Firma" value={formik.values.TEDARIKCI_FIRMA} onChange={formik.handleChange} name="TEDARIKCI_FIRMA" />
                    <LabelInput label="Tedarikçi Firma Adı" value={formik.values.TEDARIKCI_FIRMA_AD} onChange={formik.handleChange} name="TEDARIKCI_FIRMA_AD" />
                    <LabelInput label="Müşteri Firma" value={formik.values.MUSTERI_FIRMA} onChange={formik.handleChange} name="MUSTERI_FIRMA" />
                    <LabelInput label="Müşteri Firma Adı" value={formik.values.MUSTERI_FIRMA_AD} onChange={formik.handleChange} name="MUSTERI_FIRMA_AD" />
                    <LabelInput label="Stok Kodu" value={formik.values.STOK_KODU} onChange={formik.handleChange} name="STOK_KODU" />
                    <LabelInput label="Micron" value={formik.values.MICRON} onChange={formik.handleChange} name="MICRON" />
                    <LabelInput label="Pasif?" value={formik.values.PASIF} onChange={formik.handleChange} name="PASIF" type="checkbox" />
                </form>
            </div>
            <Bildirim />
        </>
    )
}

export default AksesuarKarti