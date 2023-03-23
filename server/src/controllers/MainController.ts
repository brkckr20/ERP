import { Handler } from 'express';
import { MySql } from "../db/db";
import {  ResponseDatas } from '../types/interfaces';
const mysql = new MySql();

export const DbNameGetir : Handler = (req,res) => {
    mysql.connect();
    try {
        mysql.query("SELECT DATABASE() as db;", [], (error, result, fields) => {
            if (error) {
                console.log("error var");
                return;
            }
            res.send({
                code: 200,
                data: result,
                message : ""
            } as ResponseDatas)
        })
    } catch (error) {
        console.log(error);
    }
    mysql.close();
}

export const MenuGetir: Handler = (req, res) => {
    mysql.connect();
    const {id} = req.params
    try {
        mysql.query(`SELECT * FROM 
        menu_yetki 
        JOIN kullanici ON menu_yetki.KULLANICI_ID = kullanici.ID
        JOIN menu on menu.ID = menu_yetki.MENU_ID WHERE kullanici.ID = ${id};`, [], (error, result, fields) => {
            if (error) {
                console.log("error var");
                return;
            }
            res.send({
                code: 200,
                data: result,
                message : ""
            } as ResponseDatas)
        })
    } catch (error) {
        console.log(error);
    }
    mysql.close();
} 
