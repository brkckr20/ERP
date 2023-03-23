import React from 'react'
import Icon from '../../icons';
import { jsPDF } from "jspdf";

const PdfExport = ({ pdfData, fileName }) => {
    const handlePdf = () => {
        const doc = new jsPDF();
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="./style.css">
        </head>
        <body>
            <main>
                <h1>Welcome to My Website</h1>  
            </main>
        </body>
        </html>
        `;
        doc.html(document.body, {
            callback: function (doc) {
                doc.save();
            },
            x: 10,
            y: 10
        });
        doc.save(`${fileName}.pdf`);
    }

    return (
        <button title='Pdf Aktar' onClick={handlePdf} type='button' className='border p-2 rounded-lg hover:bg-slate-200'>
            <Icon name="pdf" size={25} />
        </button>
    )
}

export default PdfExport