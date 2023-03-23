import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { girisYap } from '../../redux/Auth/services';
import Bildirim, { basarili, hatali } from '../../components/Bildirim'
import logo from '../../assets/img/logo.png';



const Giris = () => {

    const history = useHistory();
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [KULLANICI_ADI, setKULLANICI_ADI] = useState("");
    const [SIFRE, setSIFRE] = useState("");

    const giris = async (e) => {
        e.preventDefault();
        if (!KULLANICI_ADI && !SIFRE) {
            hatali("Kullanıcı Adı ve Şifre boş geçilemez");
            return;
        }
        try {
            const { payload } = await dispatch(girisYap({ KULLANICI_ADI, SIFRE }));
            payload.code === 200 && history.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    if (user.error) {
        hatali(user.error);
    }
    return (
        <>
            <Bildirim />
            <div className='bg-gray-200 h-full flex'>
                <div className='flex items-center h-full w-full relative'>
                    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <div className='bg-white flex items-center justify-center h-full w-full'>
                    <div className=''>
                        <h4 className='text-2xl font-semibold mb-3'>Giriş Formu</h4>
                        <form className='flex flex-col gap-3' onSubmit={giris}>
                            <div>
                                <label className='block mb-1 font-semibold'>Kullanıcı Adı</label>
                                <input name='KULLANICI_ADI' className='border p-2' value={KULLANICI_ADI} onChange={e => setKULLANICI_ADI(e.target.value)} />
                            </div>
                            <div>
                                <label className='block mb-1 font-semibold'>Şifre</label>
                                <input name='SIFRE' type="password" className='border p-2' value={SIFRE} onChange={e => setSIFRE(e.target.value)} />
                            </div>
                            <div className=''>
                                <button type='submit' className='bg-blue-500 hover:bg-blue-600 p-2 w-full font-bold text-white rounded'>
                                    {user.loading ? '...' : 'Giriş Yap'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Giris