import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../icons';

const ListElement = ({ iconName, title, subTitles }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`mb-1 cursor-pointer ${isOpen ? 'bg-white rounded-lg overflow-hidden' : ''} duration-150`} onClick={() => setIsOpen(!isOpen)}>
            <div className='flex px-4 justify-between items-center '>
                <div className='flex'>
                    <span>
                        <Icon name={iconName} size={20} />
                    </span>
                    <div className='ml-3 font-semibold select-none'>
                        {title}
                    </div>
                </div>
                <span className={`${isOpen ? 'rotate-180' : ''} duration-150`}>
                    <Icon name="arrowDown" size={20} />
                </span>
            </div>
            <div className={`px-4 py-1 select-none ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                <ul>
                    {
                        subTitles.map(item => (
                            <li className='text-sm mb-2 p-1 hover:bg-gray-200 duration-150 rounded' key={item.isim}><Link to={item.slug}>{item.isim}</Link></li>
                        ))
                    }

                </ul>
            </div>
        </div>
    )
}

export default ListElement