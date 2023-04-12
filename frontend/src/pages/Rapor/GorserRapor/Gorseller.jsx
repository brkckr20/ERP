import React from 'react';
import GuvenBilgisayar from './Dizaynlar/GuvenBilgisayar';
import { useParams } from 'react-router-dom';

const Gorseller = () => {
    const params = useParams();
    switch (params.id) {
        case 'guven-bilgisayar-islem-raporu':
            return <GuvenBilgisayar />
        default:
            <div>Görsel Rapor</div>
    }

}

export default Gorseller