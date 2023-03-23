import React from 'react'

const LabelInput = ({ label, ...rest }) => {
    return (
        <div className='flex'>
            <label className='inline-block max-w-[200px] w-full'>{label} </label>
            <input {...rest} />
        </div>
    )
}

export default LabelInput