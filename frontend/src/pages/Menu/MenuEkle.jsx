import React from 'react';
import { useFormik } from 'formik';
import ProcessButton from '../../components/ProcessButton/ProcessButton';
import Bildirim, { basarili } from '../../components/Bildirim';

import { menuKaydet } from './api';

const MenuEkle = () => {

    const menuler = JSON.parse(localStorage.getItem("menu"));
    const parent = menuler.filter(menu => menu.PARENT === 0);

    const formik = useFormik({
        initialValues: {
            ID: 0,
            MENU_ADI: '',
            LINK: '',
            PARENT: 0,
            ACIKLAMA: '',
            ICON: '',
        },
        onSubmit: async (values, bag) => {
            const response = await menuKaydet(values);
            if (response.code === 200) {
                basarili(response.message);
            }
        }
    });

    return (
        <div className='p-2'>
            <Bildirim />
            <h1 className='font-semibold text-xl'>Menü Ekleme Formu</h1>
            <form className='max-w-lg py-2 px-1' onSubmit={formik.handleSubmit}>
                <div className='mb-2'>
                    <label className='block'>Menü Adı</label>
                    <input type="text" name="MENU_ADI" value={formik.values.MENU_ADI} onChange={formik.handleChange} className='border py-1 outline-none w-full' />
                </div>
                <div className='mb-2'>
                    <label className='block'>Menü Linki</label>
                    <input type="text" name="LINK" value={formik.values.LINK} onChange={formik.handleChange} placeholder='Örn: /malzeme-karti' className='border py-1 outline-none w-full' />
                </div>
                <div className='mb-2' value={formik.values.PARENT} onChange={formik.handleChange}>
                    <label className='block'>Üst Menü</label>
                    <select name="PARENT" className='border py-1 outline-none w-full'>
                        {parent.map(item => (
                            <option key={item.ID} value={item.ID}>{item.MENU_ADI}</option>
                        ))}
                    </select>
                </div>
                <div className='mb-2'>
                    <label className='block'>Açıklama</label>
                    <input type="text" name="ACIKLAMA" value={formik.values.ACIKLAMA} onChange={formik.handleChange} className='border py-1 outline-none w-full' />
                </div>
                <div className='mb-2'>
                    <label className='block'>Icon (`Parent olan menülerde icon ismi oluyor`)</label>
                    <input type="text" name="ICON" value={formik.values.ICON} onChange={formik.handleChange} id="" placeholder='' className='border py-1 outline-none w-full' />
                </div>
                <div className='mb-2'>
                    <ProcessButton icon="save" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default MenuEkle