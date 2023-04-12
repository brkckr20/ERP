import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Icon from '../../icons';
import { ulkeKaydet, ulkeGetir } from './api';
import Bildirim, { basarili } from '../../components/Bildirim';

const FirmaKarti = () => {

    const [ulkeListesi, setUlkeListesi] = useState([]);
    const [filterText, setFilterText] = useState("");

    const filtered = ulkeListesi.filter((item) => {
        return Object.keys(item).some((key) => {
            return item[key].toString().toLowerCase().includes(filterText.toLowerCase());
        })
    })

    const formik = useFormik({
        initialValues: {
            ULKE_ADI: '',
            ORJ_ULKE_ADI: '',
            ALAN_KODU: '',
            KISA_KODU: '',

        },
        onSubmit: async (values, bag) => {
            if (!values.ULKE_ADI || !values.ORJ_ULKE_ADI || !values.ALAN_KODU || !values.KISA_KODU) {
                alert("Uyarı! \nKayıt yapabilmek için tüm alanları doldurunuz.");
                return false;
            }
            const { message, code } = await ulkeKaydet(values);
            if (code === 200) {
                basarili(message);
            }
            bag.resetForm();
        },
    });

    useEffect(() => {
        ulkeGetir().then(({ data }) => {
            setUlkeListesi(data);
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
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Ülke Adı : </label>
                        <input value={formik.values.ULKE_ADI} onChange={formik.handleChange} name="ULKE_ADI" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Orj. Ülke Adı : </label>
                        <input value={formik.values.ORJ_ULKE_ADI} onChange={formik.handleChange} name="ORJ_ULKE_ADI" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Alan Kodu : </label>
                        <input value={formik.values.ALAN_KODU} onChange={formik.handleChange} name="ALAN_KODU" className='w-full border outline-none px-1' type="text" />
                    </div>
                    <div className='flex'>
                        <label className='inline-block max-w-[200px] w-full'>Kısa Kod : </label>
                        <input value={formik.values.KISA_KODU} onChange={formik.handleChange} name="KISA_KODU" className='w-full border outline-none px-1' type="text" />
                    </div>
                </form>
            </div>
            <div className='border-t border-gray-200 px-2 overflow-y-scroll max-h-[820px] relative'>
                <div className='flex gap-4 items-center justify-between my-2 border-b pb-2 sticky top-[8px] bg-white'>
                    <h1 className=' text-lg font-semibold'>Ülke Listesi</h1>
                    <div>
                        <input type="text" className='border outline-none pl-1' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                        <label className='ml-2'>Ara</label>
                    </div>
                </div>
                <table className=''>
                    <thead className='bg-green-200 sticky top-[58px]'>
                        <tr className='py-2 divide-x'>
                            {/* <td className='w-[50px] text-center'>ID #</td> */}
                            <td className='w-[200px] text-center'>Ülke Adı</td>
                            <td className='w-[200px] text-center'>Orj. Ülke Adı</td>
                            <td className='w-[100px] text-center'>Alan Kodu</td>
                            <td className='w-[100px] text-center'>Kısa Kod</td>
                            <td className='w-[100px] text-center'>İşlem</td>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            filtered.map(item => (
                                <tr key={item.ID} className='hover:bg-gray-200 duration-150 select-none cursor-pointer border divide-x '>
                                    {/* <td className='w-[50px]  text-center'>{item.ID}</td> */}
                                    <td className='w-[200px]  text-center'>{item.ULKE_ADI}</td>
                                    <td className='w-[200px]  text-center'>{item.ORJ_ULKE_ADI}</td>
                                    <td className='w-[50px]  text-center'>{item.ALAN_KODU}</td>
                                    <td className='w-[50px]  text-center'>{item.KISA_KODU}</td>
                                    <td className='w-[50px]'>
                                        <div className='flex items-center justify-evenly'>
                                            <button onClick={() => console.log("update button clicked")}><Icon name="update" /></button>
                                            <button onClick={() => console.log("trash button clicked")}><Icon name="trash" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Bildirim />
        </>
    )
}

export default FirmaKarti