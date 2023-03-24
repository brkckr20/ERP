import { Handler } from 'express';
import { MySql } from "../db/db";
import {  Menu, ResponseDatas } from '../types/interfaces';
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

export const MenuKaydet: Handler = (req, res) => {
    mysql.connect();
    const { ID, MENU_ADI, LINK, PARENT, ACIKLAMA, ICON }: Menu = req.body;
    try {
        if (ID === 0) { //YENİ KAYIT
            const sql = `
            INSERT INTO menu(MENU_ADI,LINK,PARENT, ACIKLAMA, ICON) VALUES 
            (
                '${MENU_ADI}',
                '${LINK}',
                '${PARENT}',
                '${ACIKLAMA}',
                '${ICON}'
                )
            `
            mysql.query(sql, [], (error, result, fields) => {
                if (error) {
                    console.log(error);
                    return;                
                } 
                res.send({
                    code: 200,
                    message : "Menü kayıt işlemi başarılı!"
                } as ResponseDatas)
            })
        }      
    } catch (error) {
        
    }
    mysql.close();
} 