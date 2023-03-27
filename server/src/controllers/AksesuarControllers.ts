import { Handler } from 'express';
import { MySql } from "../db/db";
import { Aksesuar, ResponseDataSuccessfully } from '../types/interfaces';
const mysql = new MySql();

export const AksesuarKartiKaydet: Handler = (req, res) => {
    mysql.connect();
    try {
        const {
            ID, AKSESUAR_KODU, AKSESUAR_CINSI, AKSESUAR_GRUP, AKSESUAR_EBAT, AKSESUAR_RENK,
            OZELLIK1, OZELLIK2, OZELLIK3, OZELLIK4, ACIKLAMA, BIRIM, BARKOD, DOVIZ_CINSI,
            BIRIM_FIYAT, CARPAN, BOLEN, AKSESUAR_HACIM, AKSESUAR_AGIRLIK, MINIMUM_STOK, MAXIMUM_STOK,
            EN, BOY, YUKSEKLIK, TEDARIKCI_FIRMA, TEDARIKCI_FIRMA_AD, MUSTERI_FIRMA, MUSTERI_FIRMA_AD,
            STOK_KODU, MICRON, PASIF }: Aksesuar = req.body;
        if (ID ===0) {
            //yeni kayıt işlemleri
            const sorgu = `INSERT INTO aksesuar_karti (AKSESUAR_KODU, AKSESUAR_CINSI, AKSESUAR_GRUP, AKSESUAR_EBAT, AKSESUAR_RENK,
                OZELLIK1, OZELLIK2, OZELLIK3, OZELLIK4, ACIKLAMA, BIRIM, BARKOD, DOVIZ_CINSI,
                BIRIM_FIYAT, CARPAN, BOLEN, AKSESUAR_HACIM, AKSESUAR_AGIRLIK, MINIMUM_STOK, MAXIMUM_STOK,
                EN, BOY, YUKSEKLIK, TEDARIKCI_FIRMA, TEDARIKCI_FIRMA_AD, MUSTERI_FIRMA, MUSTERI_FIRMA_AD,
                STOK_KODU, MICRON, PASIF ) VALUES (
                    '${AKSESUAR_KODU}',
                    '${AKSESUAR_CINSI}',
                    '${AKSESUAR_GRUP}',
                    '${AKSESUAR_EBAT}',
                    '${AKSESUAR_RENK}',
                    '${OZELLIK1}',
                    '${OZELLIK2}',
                    '${OZELLIK3}',
                    '${OZELLIK4}',
                    '${ACIKLAMA}',
                    '${BIRIM}',
                    '${BARKOD}',
                    '${DOVIZ_CINSI}',
                    '${BIRIM_FIYAT}',
                    '${CARPAN}',
                    '${BOLEN}',
                    '${AKSESUAR_HACIM}',
                    '${AKSESUAR_AGIRLIK}',
                    '${MINIMUM_STOK}',
                    '${MAXIMUM_STOK}',
                    '${EN}',
                    '${BOY}',
                    '${YUKSEKLIK}',
                    '${TEDARIKCI_FIRMA}',
                    '${TEDARIKCI_FIRMA_AD}',
                    '${MUSTERI_FIRMA}',
                    '${MUSTERI_FIRMA_AD}',
                    '${STOK_KODU}',
                    '${MICRON}',
                    '${PASIF}'
                )
                `;
            mysql.query(sorgu, [], (err, results, fields) => {
                if (err) throw err;
                res.send({
                    code: 200,
                    message :"Aksesuar kartı kayıt işlemi başarılı."
                } as ResponseDataSuccessfully)
            })
        } else {
            console.log("güncelleme");
            
        }
    } catch (error) {
        
    }
    mysql.close();
}
