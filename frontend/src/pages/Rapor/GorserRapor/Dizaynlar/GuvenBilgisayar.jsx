import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { API_URL } from '../../../../config/api';
import formatDate from '../../../../utils/formatDate';
import Montserrat from './Montserrat-Regular.ttf'
import { kisalt } from '../../../../utils/metinKisalt';

Font.register({
    family: "Montserrat",
    fonts: [
        { src: Montserrat }
    ]
})

const BORDER_COLOR = '#bfbfbf'
const BORDER_STYLE = 'solid'
const COL1_WIDTH = 40
const COLN_WIDTH = 100 / 7 // field sayısı
// const COLN_WIDTH = (100 - COL1_WIDTH) / 6
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        fontSize: 12,
        padding: 10,
    },
    section: {
        margin: 5,
        padding: 5,
        textAlign: "center",
    },
    pdfContainer: {
        width: '100%',
        height: '100vh',
    },
    pageTitle: {
        fontSize: 14,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        fontFamily: "Montserrat",
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
    },
    tableCol1Header: {
        width: COLN_WIDTH + '%',
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColHeader: {
        width: COLN_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol1: {
        width: COLN_WIDTH + '%',
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol: {
        width: COLN_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCellHeader: {
        margin: 2,
        fontSize: 10,
        fontWeight: 500,
        fontFamily: "Montserrat",
    },
    tableCell: {
        margin: 3,
        fontSize: 10,
        fontFamily: "Montserrat",
    },
    bg: {
        backgroundColor: "#34495e",
        color: "#fff"
    },
});

const TarihSec = ({ startDate, setStartDate, endDate, setEndDate, setInputVisible, setValues }) => {

    const raporGetir = async () => {
        const response = await axios.get(`${API_URL}/rapor/malzemedepo?baslangic=${startDate}&bitis=${endDate}`);
        setValues(response.data.data);
        setInputVisible(false)
    }

    return <div className='p-2'>
        <label>Başlangıç Tarihi : </label>
        <DatePicker dateFormat="dd.MM.yyyy" className='border' selected={startDate} onChange={(date) => setStartDate(date)} />
        <label>Bitiş Tarihi : </label>
        <DatePicker dateFormat="dd.MM.yyyy" className='border' selected={endDate} onChange={(date) => setEndDate(date)} />
        <button className='p-1 bg-black text-white mt-2' onClick={raporGetir}>Rapor</button>
    </div>
}

const GuvenBilgisayar = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [inputVisible, setInputVisible] = useState(true);
    const [values, setValues] = useState([]);
    // console.log(values);

    return (
        <div className='w-full'>
            {
                inputVisible ? (<TarihSec setValues={setValues} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setInputVisible={setInputVisible} />) : (
                    <div style={styles.pdfContainer}>
                        <button className='bg-blue-600 text-white px-2 py-1 m-1 rounded' onClick={() => setInputVisible(true)}>Yeni Rapor</button>
                        <PDFViewer width="100%" height="100%">
                            <Document title='GüvenBilgisayarIslemRaporu.pdf'>
                                <Page size="A4" style={styles.page} orientation='landscape'>
                                    <View style={styles.section}>
                                        <Text style={styles.pageTitle}>Güven Bilgisayar İşlem Raporu</Text>
                                    </View>
                                    <View style={styles.table}>
                                        <View style={[styles.tableRow, styles.bg]}>
                                            <View style={styles.tableCol1Header}>
                                                <Text style={styles.tableCellHeader}>Tarih</Text>
                                            </View>
                                            <View style={styles.tableColHeader}>
                                                <Text style={styles.tableCellHeader}>Firma Adi</Text>
                                            </View>
                                            <View style={styles.tableColHeader}>
                                                <Text style={styles.tableCellHeader}>Islem Cinsi</Text>
                                            </View>
                                            <View style={styles.tableColHeader}>
                                                <Text style={styles.tableCellHeader}>Ürün Adi</Text>
                                            </View>
                                            <View style={styles.tableColHeader}>
                                                <Text style={styles.tableCellHeader}>Miktar</Text>
                                            </View>
                                            <View style={styles.tableColHeader}>
                                                <Text style={styles.tableCellHeader}>Not 1</Text>
                                            </View>
                                            <View style={styles.tableColHeader}>
                                                <Text style={styles.tableCellHeader}>Açıklama</Text>
                                            </View>
                                        </View>
                                        {
                                            values.map((item, index) => (
                                                <View key={index} style={styles.tableRow}>
                                                    <View style={styles.tableCol1}>
                                                        <Text style={styles.tableCell}>{formatDate(item.TARIH)}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{kisalt(item.FIRMA_ADI)}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{item.KALEM_ISLEM}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{item.MALZEME_ADI}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{item.MIKTAR}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{item.BIRIM}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{item.ACIKLAMA}</Text>
                                                    </View>
                                                </View>
                                            ))
                                        }
                                    </View>
                                </Page>
                            </Document>
                        </PDFViewer>
                    </div>
                )
            }
        </div>
    )
}

export default GuvenBilgisayar