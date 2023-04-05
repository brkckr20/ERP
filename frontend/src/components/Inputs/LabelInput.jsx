import React from 'react'
import Icon from '../../icons'

const LabelInput = ({ label, filteredInput = false, ...rest }) => {
    return (
        <div className='flex relative w-full'>
            <label className='inline-block max-w-[200px] w-full'>{label} </label>
            {
                !filteredInput ? (

                    <input {...rest} className='w-full border outline-none px-1 disabled:bg-gray-400 disabled:text-white' />
                ) : (
                    <React.Fragment>
                        <input name="" className='w-full border outline-none px-1 disabled:bg-gray-400 disabled:text-white' type="text" />
                        <button type='button' className='bg-white absolute right-[3px] bottom-[0.5px]'><Icon name="dots" /></button>
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default LabelInput