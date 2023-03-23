import React from 'react'
import Icon from '../../icons'
import firmaSabitleri from '../../config/firmaSabitleri';

const FirmaSabitleri = () => {
    return (
        <div className='p-2'>
            <h1>Firma Sabitleri</h1>
            <form className='flex flex-col items-start max-w-sm'>
                <div className='border flex gap-2 mt-2 p-2'>
                    <button className=''>
                        <Icon name="save" size={35} />
                    </button>
                    <button className=''>
                        <Icon name="update" size={30} />
                    </button>
                </div>
                <div className='inline-flex items-center justify-center mb-1'>
                    <label className='block h-7 w-32'>Firma Kodu : </label>
                    <input value={firmaSabitleri.firmaKodu} type="text" className='border h-7 px-1 outline-none' />
                </div>
                <div className='block items-center justify-center mb-1'>
                    <label className='inline-block h-7 w-32'>Firma Ünvanı :</label>
                    <input value={firmaSabitleri.firmaUnvani} type="text" className='border h-7 px-1 outline-none' />
                </div>
                <div className='flex items-center justify-start mb-1'>
                    <label className='inline-flex h-7 w-32'>Firma Ünvanı :</label>
                    <textarea value={firmaSabitleri.firmaAdres} className='border px-1 outline-none' cols="20" rows="8"></textarea>
                </div>
                <div className='flex items-center'>
                    <label className='inline-block h-7 w-32'>Logo : </label>
                    <img src={firmaSabitleri.firmaLogo} alt="" />
                </div>

            </form>
        </div>
    )
}

export default FirmaSabitleri