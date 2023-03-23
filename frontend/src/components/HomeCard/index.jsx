import React from 'react'
import Icon from '../../icons'

const HomeCard = ({ color, sayi, isim, iconName }) => {
    return (
        <div className={`${color} rounded p-2`}>
            <div className='flex justify-between items-center'>
                <span className='font-semibold text-lg text-white'>{isim || "No Named"}</span>
                <span>
                    <Icon name="unit" size={30} />
                </span>
            </div>
            <h2 className='text-3xl text-right mt-3 text-white'>{sayi || 0}</h2>
        </div>
    )
}

export default HomeCard