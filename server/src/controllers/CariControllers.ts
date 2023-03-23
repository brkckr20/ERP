import { Handler } from 'express';
import { MySql } from "../db/db";
import { Cari, ResponseDatas, ResponseDataSuccessfully } from '../types/interfaces';
const mysql = new MySql();

export const CariGetir : Handler = (req,res) => {
    mysql.connect();
    try {
        mysql.query("SELECT * FROM cari", [], (error, result, fields) => {
            if (error) {
                console.log("error var");
                return;
            }
            res.send({
                code: 200,
                data: result,
                message : "Cari listeleme işlemi başarılı."
            } as ResponseDatas)
        })
    } catch (error) {
        console.log(error);
    }
    mysql.close();
}

export const CariKaydet: Handler = (req, res) => {
    // console.log(req.body);
    mysql.connect();
    try {
        const { FIRMA_KODU, FIRMA_ADI1, ADRES1, ADRES2, ULKE, ULKE_KODU, SEHIR, ILCE, POSTA_KODU, VERGI_DAIRESI, VERGI_NO, TELEFON, GIB_MAIL,CARI_TIPI }: Cari = req.body;
        const sorgu = `INSERT INTO cari 
                    (FIRMA_KODU,FIRMA_UNVANI, ADRES1, ADRES2, ULKE, ULKE_KODU, SEHIR, ILCE, POSTA_KODU,VERGI_DAIRESI,VERGI_NO,TELEFON,GIB_MAIL,CARI_TIPI)
                    VALUES (
                        '${FIRMA_KODU}',
                        '${FIRMA_ADI1}',
                        '${ADRES1}',
                        '${ADRES2}',
                        '${ULKE}',
                        '${ULKE_KODU}',
                        '${SEHIR}',
                        '${ILCE}',
                        '${POSTA_KODU}',
                        '${VERGI_DAIRESI}',
                        '${VERGI_NO}',
                        '${TELEFON}',
                        '${GIB_MAIL}',
                        '${CARI_TIPI}'
                    )`;
        mysql.query(sorgu, [], (error, result, fields) => {
            if (error) {
                console.log(error);
                return;
            }            
            res.send({
                code: 200,
                message :"Firma kayıt işlemi başarılı."
            } as ResponseDataSuccessfully)
        })
    } catch (error) {
        console.log(error);
        
    }
    mysql.close();
}


export const CariTipiGetir : Handler = (req,res) => {
    mysql.connect();
    try {
        mysql.query("select DISTINCT CARI_TIPI from cari", [], (error, result, fields) => {
            if (error) {
                console.log("error var");
                return;
            }
            res.send({
                code: 200,
                data: result,
            } as ResponseDatas)
        })
    } catch (error) {
        console.log(error);
    }
    mysql.close();
}
