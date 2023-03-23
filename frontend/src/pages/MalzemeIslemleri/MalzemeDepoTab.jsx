import React, { useState, useEffect } from 'react';
import formatDate from '../../utils/formatDate';

const MalzemeDepoTab = ({ filtered, setKalem, filterText, setFilterText }) => {

    const handleSelectRow = (selectedItem) => {
        setKalem(kalems => [...kalems,
        {
            KALEM_ISLEM: selectedItem.KALEM_ISLEM,
            MALZEME_KODU: selectedItem.MALZEME_KODU,
            MALZEME_ADI: selectedItem.MALZEME_ADI,
            MIKTAR: selectedItem.KALAN_MIKTAR,
            BIRIM: selectedItem.BIRIM,
            TAKIP_NO: selectedItem.TAKIP_NO,
        }])
    }

    useEffect(() => {

    }, [filtered])

    const [selectedRow, setSelectedRow] = useState(null);
    function handleRowClick(i) {
        setSelectedRow(i);
    }

    return (
        <div>
            <div className='flex gap-4 items-center my-2 sticky top-0 bg-gray-200'>
                <div>
                    <label className='mr-2'>Ara : </label>
                    <input type="text" className='border outline-none pl-1' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                    <button className='border px-1' onClick={() => setFilterText("")}>X</button>
                </div>
            </div>
            <table className='w-full'>
                <thead className='bg-green-200 w-full  sticky top-8'>
                    <tr className='py-2'>
                        <td className='border'>Tarih</td>
                        <td className='border'>Firma Kodu</td>
                        <td className='border'>Malzeme Kodu</td>
                        <td className='border'>Malz. Adı</td>
                        <td className='border'>Kalan Mik.</td>
                        <td className='border'>Birim</td>
                        <td className='border'>Takip No</td>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        filtered.map((item, i) => (
                            <tr
                                key={i}
                                className={`hover:bg-blue-500 hover:text-white duration-150 select-none cursor-pointer text-center ${selectedRow === i && 'bg-blue-500 text-white'}`}
                                onDoubleClick={() => handleSelectRow(item)}
                                onClick={() => handleRowClick(i)}

                            >
                                <td className='border'>{formatDate(item.TARIH)}</td>
                                <td className='border'>{item.FIRMA_KODU}</td>
                                <td className='border'>{item.MALZEME_KODU}</td>
                                <td className='border'>{item.MALZEME_ADI}</td>
                                <td className={`${item.KALAN_MIKTAR < 0 && 'bg-red-600 text-white'} border`}>{item.KALAN_MIKTAR}</td>
                                <td className='border'>{item.BIRIM}</td>
                                <td className='border'>{item.TAKIP_NO}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MalzemeDepoTab