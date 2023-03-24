import React, { useEffect, useState } from 'react';
import ListElement from './ListElement';
import { depoYonetimi } from '../process/DepoYonetimi'
import { Link } from 'react-router-dom';
import Icon from '../icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/Auth/authSlice';
import { menuGetir } from '../pages/globalApi'
import Menu from './Menu/Menu';
import pj from '../../package.json';

const Navbar = () => {

    const [menuListesi, setMenuListesi] = useState([]);
    const anaMenuler = menuListesi.filter(menu => menu.PARENT === 0);

    const handleFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    };

    useEffect(() => {
        document.title = `Portal v.${pj.version}`
    }, [])

    const kullanici_id = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        menuGetir(kullanici_id.ID).then(({ data }) => {
            setMenuListesi(data)
            localStorage.setItem("menu", JSON.stringify(data))
        });
    }, [menuGetir])

    const dispath = useDispatch();

    const handleLogout = () => {
        if (confirm("Çıkış yapılacak\n Emin misiniz?")) {
            dispath(logout());
        }
    }

    return (
        <nav className='max-w-xs w-full h-full border-r border-gray-300 shrink-0 flex flex-col'>
            <div className='flex justify-between items-center px-2'>
                <Link className='text-center p-2 text-3xl text-purple-700 font-bold' to="/">Portal v.{pj.version}</Link>
                <button onClick={handleFullscreen}><Icon name="fullScreen" /></button>
            </div>
            <div className='mx-2 flex-1'>
                {
                    anaMenuler.map((menu, index) => (
                        <Menu key={index} menu={menu} menuListesi={menuListesi} anaMenuler={anaMenuler} />
                    ))
                }
                {/* <ListElement iconName="wareHouse" title="Sarf Malzeme İşlemleri" subTitles={depoYonetimi} /> */}
            </div>
            <div className='mb-8 mx-2'>
                <button onClick={handleLogout} className='w-full bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 duration-200 flex items-center justify-center'>
                    <span>Çıkış </span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar