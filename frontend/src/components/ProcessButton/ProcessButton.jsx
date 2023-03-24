import React from 'react'
import Icon from '../../icons'

const ProcessButton = ({ type, title, onClick, icon = "save", size = 35 }) => {
    return (
        <button type={type} title={title} onClick={onClick} className='border p-2 rounded-lg hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-300'>
            <Icon name={icon} size={size} />
        </button>
    )
}

export default ProcessButton