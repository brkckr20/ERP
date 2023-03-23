import { Handler } from 'express';
import { MySql } from "../db/db";
import {  ResponseDatas } from '../types/interfaces';
const mysql = new MySql();

export const MenuleriGetir : Handler = (req,res) => {
    mysql.connect();    
    try {
        mysql.query(`select menu.MENU_ADI,menu.ID,menu_yetki.YETKI 
                    from menu
                    INNER JOIN menu_yetki on menu_yetki.MENU_ID = menu.ID
                    INNER JOIN kullanici on kullanici.ID = menu_yetki.KULLANICI_ID
                    where kullanici.ID = 4`, [], (error, result, fields) => {
            if (error) {
                console.log("error var");
                return;
            }
            res.send({
                code: 200,
                data: result,
                message : "Menü listeleme işlemi başarılı."
            } as ResponseDatas)
        })
    } catch (error) {
        console.log(error);
    }
    mysql.close();
}