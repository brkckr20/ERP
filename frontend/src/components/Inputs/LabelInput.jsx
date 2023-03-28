import React from 'react'

const LabelInput = ({ label, ...rest }) => {
    return (
        <div className='flex'>
            <label className='inline-block max-w-[200px] w-full'>{label} </label>
            <input {...rest} className='w-full border outline-none px-1 disabled:bg-gray-400 disabled:text-white' />
        </div>
    )
}

export default LabelInput