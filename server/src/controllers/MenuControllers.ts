import { Handler } from 'express';
import { MySql } from "../db/db";
import {  Menu, ResponseDatas } from '../types/interfaces';
const mysql = new MySql();

export const MenuleriGetir: Handler = (req, res) => {
    mysql.connect();    
    const { kullanici_id } = req.params; 
    try {
        mysql.query(`SELECT * FROM 
        menu_yetki 
        JOIN kullanici ON menu_yetki.KULLANICI_ID = kullanici.ID
        JOIN menu on menu.ID = menu_yetki.MENU_ID WHERE kullanici.ID = ${kullanici_id} and menu_yetki.GIZLE = 'Hayır';`, [], (error, result, fields) => {
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