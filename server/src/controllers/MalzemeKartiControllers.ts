import { Handler } from 'express';
import { MySql } from "../db/db";
import { MalzemeKarti, ResponseDatas, ResponseDataSuccessfully } from '../types/interfaces';
const mysql = new MySql();

export const MalzemeKartiGetir: Handler = async (req, res) => {
    mysql.connect();
    try {
        mysql.query(`SELECT * FROM malzeme_karti`,[],(error, results , fields) => {
            if (error) {
            console.error(error);
            return;
            }      
            res.send({
                data: results,
                code: 200,
                message: "Veri getirme işlemi başarıyla gerçekleştirildi"
            } as ResponseDatas);
        })
    } catch (error) {
    }
    mysql.close();
    
}

export const MalzemeKartiKaydet: Handler = (req, res) => {
    mysql.connect();
    const { MALZEME_KODU, MALZEME_ADI, BIRIM, TEDARIKCI_KODU, TEDARIKCI_ADI, PASIF, MALZEME_GRUP, MALZEME_MARKA }: MalzemeKarti = req.body.values;
    let ID = req.params.id;
    let id = Number(ID);
    if (id === 0) { //yeni kayıt
        try {
            const sorgu = `INSERT INTO malzeme_karti 
                        (MALZEME_KODU,MALZEME_ADI, BIRIM, TEDARIKCI_KODU, TEDARIKCI_ADI, PASIF, MALZEME_GRUP, MALZEME_MARKA)
                        VALUES (
                            '${MALZEME_KODU}',
                            '${MALZEME_ADI}',
                            '${BIRIM}',
                            '${TEDARIKCI_KODU}',
                            '${TEDARIKCI_ADI}',
                            '${PASIF}',
                            '${MALZEME_GRUP}',
                            '${MALZEME_MARKA}'
                        )`
        mysql.query(sorgu, [],function (err) {
            if (err) throw err;
            res.send({
                code: 200,
                message :"Malzeme kartı kayıt işlemi başarılı."
            } as ResponseDataSuccessfully)
        })
        } catch (error) {
            console.log(error); 
        }
    }
    else { // güncelleme
        try {
            const sorgu = `UPDATE malzeme_karti SET 
            MALZEME_KODU = '${MALZEME_KODU}',
            MALZEME_ADI = '${MALZEME_ADI}',
            BIRIM = '${BIRIM}',
            TEDARIKCI_KODU = '${TEDARIKCI_KODU}',
            TEDARIKCI_ADI = '${TEDARIKCI_ADI}',
            PASIF = '${PASIF}',
            MALZEME_GRUP = '${MALZEME_GRUP}',
            MALZEME_MARKA = '${MALZEME_MARKA}' WHERE ID = ${id}`
        mysql.query(sorgu, [],function (err) {
            if (err) throw err;
            res.send({
                code: 200,
                message :"Malzeme kartı güncelleme işlemi başarılı."
            } as ResponseDataSuccessfully)
        })
        } catch (error) {
            console.log(error); 
        }
        
    }
    
    
}