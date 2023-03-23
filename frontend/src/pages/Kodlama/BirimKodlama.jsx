import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Icon from '../../icons';
import Bildirim, { basarili, hatali, bilgi } from '../../components/Bildirim';
import { birimKaydet, birimSil } from './api';
import { birimGetir } from '../globalApi'
import ExcelExport from '../../components/ExcelExport';
import PdfExport from '../../components/PdfExport';

const BirimKodlama = () => {

    const [birimListesi, setBirimListesi] = useState([]);
    const [filterText, setFilterText] = useState("");
    /* yeni kayıt mı güncelleme mi  - yeni kayıt ise isnew true olacak */
    const [isNew, setIsNew] = useState(true);

    const filtered = birimListesi.filter((item) => {
        return Object.keys(item).some((key) => {
            return item[key].toString().toLowerCase().includes(filterText.toLowerCase());
        })
    })

    const formik = useFormik({
        initialValues: {
            ID: 0,
            BIRIM_ADI: '',
            KISA_KODU: '',
            DEPO_ADI: '',
            YENI_KAYITMI: isNew,

        },
        onSubmit: async (values, bag) => {
            if (!values.BIRIM_ADI || !values.KISA_KODU) {
                hatali("Birim Adı ve Kısa Kod boş geçilemez!");
                return;
            }
            const { message, code } = await birimKaydet(values);
            if (code === 200) {
                basarili(message);
            }
            if (formik.values.ID === 0) {
                bag.resetForm();
            }
        },
    });

    const formaEkle = (item) => {
        formik.values.ID = item.id;
        formik.values.BIRIM_ADI = item.ad;
        formik.values.KISA_KODU = item.kisa_kod;
        formik.values.DEPO_ADI = item.depo;
        formik.values.YENI_KAYITMI = false;
    }

    const sil = async (id) => {
        if (confirm("Silenecek\nEmin misiniz?\nBu işlem geri alınamaz!!")) {
            const response = await birimSil(id);
            if (response.code === 200) {
                bilgi(response.message);
                return;
            }
        }
    }

    const yeni = () => {
        formik.values.BIRIM_ADI = "";
        formik.values.KISA_KODU = "";
        formik.values.DEPO_ADI = "";
        formik.values.YENI_KAYITMI = true;
    }

    useEffect(() => {
        birimGetir().then(data => {
            setBirimListesi(data.data)
        });
    }, [birimListesi])

    return (
        <>
            <div className='p-2 max-w-md'>
                <form action="">
                    <div className='flex gap-1 my-2'>
                        <button title='Yeni' type="button" onClick={yeni} className='border p-2 rounded-lg hover:bg-slate-200'>
                            <Icon name="new" size={35} />
                        </button>
                        <button title='Kaydet' onClick={formik.handleSubmit} disabled={(!formik.values.BIRIM_ADI || !formik.values.KISA_KODU) && true} type="submit" className='border p-2 rounded-lg hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-300'>
                            <Icon name="save" size={35} />
                        </button>
                        <ExcelExport excelData={birimListesi} fileName="Birim Listesi" />
                        <PdfExport pdfData={birimListesi} fileName="Birim Listesi" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Birim Adı : </label>
                        <input value={formik.values.BIRIM_ADI} onChange={formik.handleChange} name="BIRIM_ADI" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Kısa Kod : </label>
                        <input value={formik.values.KISA_KODU} onChange={formik.handleChange} name="KISA_KODU" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Depo Adı : </label>
                        <input value={formik.values.DEPO_ADI} onChange={formik.handleChange} name="DEPO_ADI" className='w-full border outline-none px-1' type="text" />
                    </div>
                </form>
            </div>
            <div className='border-t border-gray-200 px-2'>
                <div className='flex gap-4 items-center justify-between my-2 border-b py-1 bg-gray-200'>
                    <h1 className=' text-lg font-semibold'>Birim Listesi</h1>
                    <div>
                        <input type="text" className='border outline-none pl-1' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                        <label className='ml-2'>Ara</label>
                    </div>
                </div>
                <table className=''>
                    <thead className='bg-green-200'>
                        <tr className='py-2 divide-x'>
                            {/* <td className='w-[50px] text-center'>ID #</td> */}
                            <td className='w-[100px] text-center'>Birim Adı</td>
                            <td className='w-[100px] text-center'>Kısa Kod</td>
                            <td className='w-[100px] text-center'>Depo Adı</td>
                            <td className='w-[100px] text-center'>İşlem</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filtered.map(item => (
                                <tr key={item.id} className='hover:bg-gray-200 duration-150 select-none cursor-pointer border divide-x'>
                                    {/* <td className='w-[50px]  text-center'>{item.ID}</td> */}
                                    <td className='w-[100px]  text-center'>{item.ad}</td>
                                    <td className='w-[50px]  text-center'>{item.kisa_kod}</td>
                                    <td className='w-[50px]  text-center'>{item.depo}</td>
                                    <td className='w-[50px]'>
                                        <div className='flex items-center justify-evenly'>
                                            <button onClick={() => formaEkle(item)}><Icon name="update" /></button>
                                            <button onClick={() => sil(item.id)}><Icon name="trash" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr className='bg-gray-200 text-center'>
                            <td>Toplam :</td>
                            <td>{filtered.length}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <Bildirim />
        </>
    )
}

export default BirimKodlama