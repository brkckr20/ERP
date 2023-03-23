import { Handler } from 'express';
import { MySql } from "../db/db";
import {  ResponseDatas } from '../types/interfaces';
const mysql = new MySql();


export const KullanicilariGetir: Handler = (req, res) => {
    mysql.connect();
    try {
        mysql.query(`SELECT * FROM kullanici`, [], (error, result, fields) => {
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