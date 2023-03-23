import { Handler } from 'express';
import { MySql } from "../db/db";
import {ResponseMessage } from '../types/interfaces';
const mysql = new MySql();
import jwt from 'jsonwebtoken';


interface User {
    KULLANICI_ADI: string;
    SIFRE: string;
}

export const GirisYap: Handler = async (req, res) => {
    
    const { KULLANICI_ADI, SIFRE }: User = req.body;
    mysql.connect();
    try {
        mysql.query("select * from kullanici where KULLANICI_ADI = ?", [KULLANICI_ADI], (err, result) => {
            if (err) {
                console.log(err.message);
                return;
            }
            if (result.length === 0) {
                res.send({
                    code: 400,
                    message :"Kullanıcı bulunamadı!"
                } as ResponseMessage)
                return;
            }
            if (SIFRE !== result[0].SIFRE) {
                res.send({
                    code: 400,
                    message :"Şifre hatalı!"
                } as ResponseMessage)
                return;
            }
            const token = jwt.sign({ id: result[0].ID }, "SECRETKEY", { expiresIn: "12h" });
            delete result[0].SIFRE;
            res.send({
                code: 200,
                data: result[0],
                message: "Giriş işlemi başarılı",
                token : token
            } as ResponseMessage);
            
        } )
    } catch (error) {
        console.log(error);        
    }
}
