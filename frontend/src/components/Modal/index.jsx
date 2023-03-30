import React from 'react'
import Icon from '../../icons'

const Modal = ({ title, modalShow, setModalShow, children }) => {
    return (
        <div className={`fixed inset-0 bg-black/40 flex items-center justify-center ${modalShow ? 'opacity-100 visible' : 'opacity-0 invisible'} duration-200`}>
            <div className='max-w-[1400px] bg-white w-full p-2 rounded max-h-[600px] h-full overflow-x-scroll bg-white'>
                <div className='flex justify-between items-center sticky top-0 bg-white'>
                    <h1 className=''>{title}</h1>
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

export default Modal