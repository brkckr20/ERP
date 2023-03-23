import React from 'react';
import Icon from '../../icons';
import * as XLSX from 'xlsx';

const ExcelExport = ({ excelData, fileName }) => {

    const handleExport = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(wb, ws, "Sayfa1");
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    }

    return (
        <button title='Excel Aktar' onClick={() => handleExport()} type="button" className='border p-2 bg-white rounded-lg hover:bg-slate-200'>
            <Icon name="excel" size={25} />
        </button>
    )
}

export default ExcelExport