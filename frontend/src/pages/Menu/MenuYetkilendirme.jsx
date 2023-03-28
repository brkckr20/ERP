import React, { useEffect, useState } from 'react';
import { kullanicilariGetir, menuleriGetir } from '../globalApi';

const MenuYetkilendirme = () => {

    const [kullanicilar, setKullanicilar] = useState([]);
    const [menuler, setMenuler] = useState([]);
    const [secilenKullanici, setSecilenKullanici] = useState(1);

    const kullaniciSec = (id) => {
        setSecilenKullanici(id);
    }

    useEffect(() => {
        kullanicilariGetir().then(({ data }) => {
            setKullanicilar(data);
        })
    }, [])
    useEffect(() => {
        menuleriGetir(secilenKullanici).then(({ data }) => {
            setMenuler(data);
        });
    }, [secilenKullanici])
    return (
        <div className='p-2 flex gap-x-3'>
            <div className='w-1/3'>
                <h3 className='font-semibold mb-2'>Kullanıcı Listesi</h3>
                <table className='border w-full'>
                    <thead>
                        <tr className='border divide-x bg-blue-400 text-white'>
                            <td>Kullanıcı Adı</td>
                            <td>Şifre</td>
                            <td>Ad Soyad</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            kullanicilar.map((kullanici, i) => (
                                <tr key={kullanici.ID} onClick={() => kullaniciSec(kullanici.ID)} className={`border hover:bg-blue-500 duration-200 hover:text-white divide-x cursor-pointer ${secilenKullanici === kullanici.ID && 'bg-blue-500 text-white'}`}>
                                    <td className='border px-1'>{kullanici.KULLANICI_ADI}</td>
                                    <td className='border px-1'>{kullanici.SIFRE}</td>
                                    <td className='border px-1'>{kullanici.TAM_ISIM}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='w-2/3'>
                <h3 className='font-semibold mb-2'>Menü Listesi</h3>
                <table className='border'>
                    <thead>
                        <tr className='border divide-x bg-green-400 text-white'>
                            <td className='px-2'>ID #</td>
                            <td className='px-2'>Menü</td>
                            <td className='px-2'>Yetki Düzeyi</td>
                            <td className='px-2'>Gizle</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menuler.map((menu, i) => (
                                <tr key={menu.ID} className='border hover:bg-gray-300 divide-x cursor-pointer'>
                                    <td className='border px-1'>{menu.ID}</td>
                                    <td className='border px-1'>{menu.MENU_ADI}</td>
                                    <td className='border px-1'>
                                        <select defaultValue={menu.YETKI} className='w-full'>
                                            <option value={1}>{1}</option>
                                            <option value={2}>{2}</option>
                                            <option value={3}>{3}</option>
                                            <option value={4}>{4}</option>
                                        </select>
                                    </td>
                                    <td className='border px-1'>
                                        <select defaultValue={menu.GIZLE} className='w-full'>
                                            <option value="Evet">Evet</option>
                                            <option value="Hayır">Hayır</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MenuYetkilendirme