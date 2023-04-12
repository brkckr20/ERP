import React, { useState, useEffect } from 'react';
import RaporModal from '../../../components/Modal/RaporModal';
import { gorselRaporGetir } from '../../globalApi';
import { Link } from 'react-router-dom';

const raporListesi = [
    {
        id: 1,
        raporAdi: "Güven Bilgisayar İşlem Raporu",
        slug: "guven-bilgisayar-islem-raporu"
    }
]


const GorselRapor = () => {

    const [modalShow, setModalShow] = useState(true);

    useEffect(() => {
        gorselRaporGetir().then(data => console.log(data));
    }, [])

    return (
        <RaporModal modalShow={modalShow} setModalShow={setModalShow} title="Görsel Rapor Listesi">
            <ul className='mt-2'>
                {
                    raporListesi.map(rapor => (
                        <li key={rapor.id} className='hover:bg-blue-600 duration-150 cursor-pointer hover:text-white px-2 rounded'>
                            <Link to={`/gorsel-rapor/${rapor.slug}`}>{rapor.raporAdi}</Link>
                        </li>
                    ))
                }
            </ul>
        </RaporModal>
    )
}

export default GorselRapor