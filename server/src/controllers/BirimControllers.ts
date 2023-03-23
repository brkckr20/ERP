import { Handler } from 'express';
import { MySql } from "../db/db";
import { Birim, ResponseDatas, ResponseDataSuccessfully } from '../types/interfaces';
const mysql = new MySql();

export const BirimGetir : Handler = (req,res) => {
    mysql.connect();
    try {
        mysql.query("SELECT * FROM birim ORDER BY ad", [], (error, result, fields) => {
            if (error) {
                console.log("error var");
                return;
            }
            res.send({
                code: 200,
                data: result,
                message : "Birim listeleme işlemi başarılı."
            } as ResponseDatas)
        })
    } catch (error) {
        console.log(error);
    }
    mysql.close();
}

export const BirimKaydet: Handler = (req, res) => {
    mysql.connect();
    try {
        const { BIRIM_ADI,KISA_KODU,DEPO_ADI,YENI_KAYITMI,ID}: Birim = req.body;
        if (YENI_KAYITMI) {
            const sorgu = `INSERT INTO birim 
                    (AD,KISA_KOD,DEPO)
                    VALUES (
                        '${BIRIM_ADI}',
                        '${KISA_KODU}',
                        '${DEPO_ADI}'
                    )`;        
        mysql.query(sorgu, [], (error, result, fields) => {
            if (error) {
                console.log(error);
                return;
            }
            res.send({
                code: 200,
                message :"Birim kayıt işlemi başarılı."
            } as ResponseDataSuccessfully)
        })
        } else if(!YENI_KAYITMI) {
            const sorgu = `UPDATE birim set ad='${BIRIM_ADI}', kisa_kod='${KISA_KODU}',depo='${DEPO_ADI}' WHERE id = ${ID}`;
            mysql.query(sorgu, [], (error, result, fields) => {
                if (error) {
                    console.log(error);
                    return;
                }
                res.send({
                    code: 200,
                    message :"Birim güncelleme işlemi başarılı."
                } as ResponseDataSuccessfully)
            })
            console.log(req.body);
            
        }
    } catch (error) {
        console.log(error);
        
    }
    mysql.close();
}

export const BirimSil: Handler = (req, res) => {
    mysql.connect();
    const { id } = req.params;
    try {
        const sorgu = `DELETE from birim WHERE id = ${id}`;
        mysql.query(sorgu, [], (error, result, fields) => {
            if (error) {
                console.log(error);
                return;
            }
            res.send({
                code: 200,
                message :"Birim silme işlemi başarılı."
            } as ResponseDataSuccessfully)
        })
        console.log(req.body);       
    } catch (error) {
        console.log(error);
    }
    mysql.close();
}