import React, { useEffect, useState } from 'react';
import HomeCard from '../../components/HomeCard';
import { birimGetir, cariGetir } from '../globalApi';

const Anasayfa = () => {

    const [firma, setFirma] = useState(0)
    const [birim, setBirim] = useState(0)

    useEffect(() => {
        birimGetir().then(data => setBirim(data.data.length))
        cariGetir().then(data => setFirma(data.data.length))
    }, [])

    return (
        <div className='bg-gray-200 h-full'>
            <div className='p-2'>
                <div className='grid grid-cols-6 gap-x-4'>
                    <HomeCard color='bg-green-600' sayi={birim} isim="Birim Sayısı" />
                    <HomeCard color='bg-purple-600' sayi={firma} isim="Cari Sayısı" />
                </div>
            </div>
        </div>
    )
}

export default Anasayfa