import { Handler } from 'express';
import { MySql } from "../db/db";
import { ResponseDataSuccessfully, Ulke } from '../types/interfaces';
const mysql = new MySql();

export const UlkeGetir : Handler = (req,res) => {
    mysql.connect();
    try {
        mysql.query("SELECT * FROM ulke", [], (error, result, fields) => {
            if (error) {
                console.log("error var");
                return;
            }
            res.send({
                code: 200,
                data: result,
                message : "Ülke listeleme işlemi başarılı."
            } as ResponseDataSuccessfully)
        })
    } catch (error) {
        console.log(error);
    }
    mysql.close();
}

export const UlkeKaydet: Handler = (req,res) => {
    mysql.connect();
    try {
        const { ULKE_ADI, ORJ_ULKE_ADI, ALAN_KODU, KISA_KODU }: Ulke = req.body;
        const sorgu = `INSERT INTO ulke 
        (ULKE_ADI, ORJ_ULKE_ADI, ALAN_KODU, KISA_KODU)
        VALUES (
            '${ULKE_ADI}',
            '${ORJ_ULKE_ADI}',
            '${ALAN_KODU}',
            '${KISA_KODU}'
        )
        `;
        mysql.query(sorgu, [],function (err) {
            if (err) throw err;
            res.send({
                code: 200,
                data: [],
                message : "Ülke kayıt işlemi başarıyla gerçekleştirildi"
            } as ResponseDataSuccessfully)
        })
    } catch (error) {
        
    }
    mysql.connect();
}

export const UlkeGuncelle: Handler = (req, res) => {
    mysql.connect();
}