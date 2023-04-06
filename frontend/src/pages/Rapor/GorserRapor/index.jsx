import React, { useState, useEffect } from 'react';
import RaporModal from '../../../components/Modal/RaporModal';
import { gorselRaporGetir } from '../../globalApi';


const GorselRapor = () => {

    const [modalShow, setModalShow] = useState(true);

    useEffect(() => {
        gorselRaporGetir().then(data => console.log(data));
    }, [])

    return (
        <RaporModal modalShow={modalShow} setModalShow={setModalShow} title="Görsel Rapor Listesi">
            ads
        </RaporModal>
    )
}

export default GorselRapor