import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const BORDER_COLOR = '#bfbfbf'
const BORDER_STYLE = 'solid'
const COL1_WIDTH = 40
const COLN_WIDTH = 100 / 7 // field sayısı
// const COLN_WIDTH = (100 - COL1_WIDTH) / 6
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        fontSize: 12,
        padding: 10
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
        borderColor: "#ccc"
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
        flexDirection: "row"
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
        margin: 5,
        fontSize: 12,
        fontWeight: 500
    },
    tableCell: {
        margin: 5,
        fontSize: 10
    },
    bg: {
        backgroundColor: "#34495e",
        color: "#fff"
    }
});

const TarihSec = ({ startDate, setStartDate, endDate, setEndDate, setInputVisible }) => {
    return <div className='p-2'>
        <label htmlFor="">Başlangıç Tarihi : </label>
        <DatePicker dateFormat="dd.MM.yyyy" className='border' selected={startDate} onChange={(date) => setStartDate(date)} />
        <label htmlFor="">Bitiş Tarihi : </label>
        <DatePicker dateFormat="dd.MM.yyyy" className='border' selected={endDate} onChange={(date) => setEndDate(date)} />
        <button className='p-1 bg-black text-white mt-2' onClick={() => setInputVisible(false)}>Rapor</button>
    </div>
}


const GuvenBilgisayar = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [inputVisible, setInputVisible] = useState(true);

    return (
        <div className='w-full'>
            {
                inputVisible ? (<TarihSec startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setInputVisible={setInputVisible} />) : (
                    <div style={styles.pdfContainer}>
                        <PDFViewer width="100%" height="100%">
                            <Document title='GüvenBilgisayar.pdf'>
                                <Page size="A4" style={styles.page} orientation='landscape'>
                                    <View style={styles.section}>
                                        <Text style={styles.pageTitle}>Güven Bilgisayar Islem Raporu</Text>
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
                                                <Text style={styles.tableCellHeader}>Malzeme Marka</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol1}>
                                                <Text style={styles.tableCell}>14.04.2023</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>Güven Bilgisayar</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>Stok Giris</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>85A MODEL TONER</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>1</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>ADET</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>HP</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol1}>
                                                <Text style={styles.tableCell}>14.04.2023</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>Güven Bilgisayar</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>Stok Giris</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>85A MODEL TONER</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>1</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>ADET</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>HP</Text>
                                            </View>
                                        </View>
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