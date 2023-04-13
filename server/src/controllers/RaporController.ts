import { Handler } from 'express';
import { MySql } from "../db/db";
import { ResponseDatas } from '../types/interfaces';
const mysql = new MySql();

export const MalzemeDepoRapor: Handler = (req, res) => {
    //console.log(req.query); GİRİŞ TARIHLERI GELECEK VE DAHA SONRA IHTIYACA GORE KULLANILABILIR
    
    mysql.connect();
    try {
        mysql.query(`SELECT * FROM malzeme_depo1 d1 INNER JOIN malzeme_depo2 d2 on (d1.ID = d2.REF_NO)
                    WHERE ISLEM_CINSI = 'MALZEME_GIRIS' AND D1.FIRMA_KODU = '320-01-12-025' ORDER BY TARIH ASC`, [], (error, result, fields) => {
            if (error) {
                console.log("error var _>", error);
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
