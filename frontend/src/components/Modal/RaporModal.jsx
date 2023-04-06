import React from 'react'
import Icon from '../../icons'

const RaporModal = ({ title, modalShow, setModalShow, children }) => {
    return (
        <div className={`fixed inset-0 bg-black/40 flex items-center justify-center ${modalShow ? 'opacity-100 visible' : 'opacity-0 invisible'} duration-200`}>
            <div className='max-w-[500px] bg-white w-full p-2 rounded max-h-[400px] h-full'>
                <div className='flex justify-between items-center sticky top-0 bg-white border-b'>
                    <h1 className='font-semibold'>{title}</h1>
                    <button className='' onClick={() => setModalShow(false)}>
                        <Icon name="close" />
                    </button>
                </div>
                {
                    children
                }
            </div>
        </div>
    )
}

export default RaporModal