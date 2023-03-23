import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const baglanti = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "portal"
})

app.get("/malzemekarti", async (req, res) => {
    baglanti.query("SELECT * FROM malzeme_karti", (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.post("/malzemekarti", async (req, res) => {
    const { MALZEME_KODU, MALZEME_ADI, BIRIM, TEDARIKCI_KODU, TEDARIKCI_ADI, PASIF, MALZEME_GRUP, MALZEME_MARKA } = req.body;
    const sorgu = `INSERT INTO malzeme_karti 
                    (MALZEME_KODU,MALZEME_ADI, BIRIM, TEDARIKCI_KODU, TEDARIKCI_ADI, PASIF, MALZEME_GRUP, MALZEME_MARKA)
                    VALUES (
                        '${MALZEME_KODU}',
                        '${MALZEME_ADI}',
                        '${BIRIM}',
                        '${TEDARIKCI_KODU}',
                        '${TEDARIKCI_ADI}',
                        '${PASIF}',
                        '${MALZEME_GRUP}',
                        '${MALZEME_MARKA}'
                    )`
    baglanti.query(sorgu, function (err) {
        if (err) throw err;
        console.log("veri girildi");
    })
    res.send();
})

/* sarf malzeme depo stok durumu */
app.get("/sarfmalzemestok", async (req, res) => {
    const sql = `Select
    MALZEME_KODU,
    MALZEME_ADI,
    BIRIM,
    MALZEME_MARKA,
    SUM(MIKTAR)
    -
    IFNULL((Select SUM(MIKTAR) From malzeme_depo1 x Inner Join malzeme_depo2 y On (x.ID=y.REF_NO)
        Where ISLEM_CINSI='MALZEME_CIKIS' and b.MALZEME_KODU=y.MALZEME_KODU),0) AS 'KALAN_MIKTAR'
        
        ,b.ID AS 'Takip No'
        

    From malzeme_depo1 a Inner Join malzeme_depo2 b On (a.ID=b.REF_NO)
    Where ISLEM_CINSI='MALZEME_GIRIS'
    AND MIKTAR
    -
    IFNULL((Select SUM(MIKTAR) From malzeme_depo1 x Inner Join malzeme_depo2 y On (x.ID=y.REF_NO)
        Where ISLEM_CINSI='MALZEME_CIKIS' and b.MALZEME_KODU=y.MALZEME_KODU),0)
    
    
    
    GROUP BY
        MALZEME_KODU,
        MALZEME_ADI,
        BIRIM,
        MALZEME_GRUP,
        MALZEME_MARKA,
        b.ID
    `
    baglanti.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})


app.get("/birim", async (req, res) => {
    baglanti.query("SELECT * FROM birim", (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.get("/cari", async (req, res) => {
    baglanti.query("SELECT * FROM cari", (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.post("/cari", async (req, res) => {
    const { FIRMA_KODU, FIRMA_ADI1, ADRES1, ADRES2, ULKE, ULKE_KODU, SEHIR, ILCE, POSTA_KODU, VERGI_DAIRESI, VERGI_NO, TELEFON, GIB_MAIL } = req.body;
    const sorgu = `INSERT INTO cari 
                    (FIRMA_KODU,FIRMA_UNVANI, ADRES1, ADRES2, ULKE, ULKE_KODU, SEHIR, ILCE, POSTA_KODU,VERGI_DAIRESI,VERGI_NO,TELEFON,GIB_MAIL)
                    VALUES (
                        '${FIRMA_KODU}',
                        '${FIRMA_ADI1}',
                        '${ADRES1}',
                        '${ADRES2}',
                        '${ULKE}',
                        '${ULKE_KODU}',
                        '${SEHIR}',
                        '${ILCE}',
                        '${POSTA_KODU}',
                        '${VERGI_DAIRESI}',
                        '${VERGI_NO}',
                        '${TELEFON}',
                        '${GIB_MAIL}'
                    )`
    baglanti.query(sorgu, function (err) {
        if (err) throw err;
        console.log("veri girildi");
    })
    res.send();
})

app.get("/ulke", async (req, res) => {
    baglanti.query("SELECT * FROM ulke", (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})
app.post("/ulke", async (req, res) => {
    const { ULKE_ADI, ORJ_ULKE_ADI, ALAN_KODU, KISA_KODU } = req.body;
    const sorgu = `INSERT INTO ulke 
                    (ULKE_ADI,ORJ_ULKE_ADI, ALAN_KODU, KISA_KODU)
                    VALUES (
                        '${ULKE_ADI}',
                        '${ORJ_ULKE_ADI}',
                        '${ALAN_KODU}',
                        '${KISA_KODU}'
                    )`
    baglanti.query(sorgu, function (err) {
        if (err) throw err;
        console.log("veri girildi");
    })
    res.send();
})

/* KAYIT LISTELEME */
app.get("/malzemedepo/:depoTipi", async (req, res) => {
    const { depoTipi } = req.params;
    if (depoTipi === 'giris') {
        const sql = `SELECT d1.ID,D1.TARIH,D1.FIRMA_KODU,D1.FIRMA_ADI,D1.FATURA_NO,d1.ACIKLAMA,d2.KALEM_ISLEM,d2.MALZEME_KODU,d2.MALZEME_ADI,d2.MIKTAR,d2.BIRIM,d2.NOT1,d2.NOT2,d2.NOT3
        FROM malzeme_depo1 d1 INNER JOIN malzeme_depo2 d2 on d1.ID = d2.REF_NO
        where d1.ISLEM_CINSI = 'MALZEME_GIRIS' AND d1.ID = (SELECT MAX(ID) from malzeme_depo1)
        ORDER BY D1.ID DESC;
    `
        baglanti.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    }

})

/* ÖNCEKİ KAYIT LISTELEME */
app.get("/malzemedepooncekikayit/:depoTipi/:id", async (req, res) => {
    const { depoTipi, id } = req.params;
    if (depoTipi === 'giris') {
        const sql = `SELECT d1.ID,D1.TARIH,D1.FIRMA_KODU,D1.FIRMA_ADI,D1.FATURA_NO,d1.ACIKLAMA,d2.KALEM_ISLEM,d2.MALZEME_KODU,d2.MALZEME_ADI,d2.MIKTAR,d2.BIRIM
        FROM malzeme_depo1 d1 INNER JOIN malzeme_depo2 d2 on d1.ID = d2.REF_NO
        where d1.ISLEM_CINSI = 'MALZEME_GIRIS' AND d1.ID = (SELECT MAX(ID) from malzeme_depo1 WHERE ID < ${id})
        ORDER BY D1.ID DESC;
    `
        baglanti.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length < 1) {
                res.json({ message: "Başka kayıt bulunamadı!", code: 400 });
                return;
            }
            res.send(result)
        })
    }
})
/* SONRAKİ KAYIT LISTELEME */
app.get("/malzemedeposonrakikayit/:depoTipi/:id", async (req, res) => {
    const { depoTipi, id } = req.params;
    if (depoTipi === 'giris') {
        const sql = `SELECT d1.ID,D1.TARIH,D1.FIRMA_KODU,D1.FIRMA_ADI,D1.FATURA_NO,d1.ACIKLAMA,d2.KALEM_ISLEM,d2.MALZEME_KODU,d2.MALZEME_ADI,d2.MIKTAR,d2.BIRIM
        FROM malzeme_depo1 d1 INNER JOIN malzeme_depo2 d2 on d1.ID = d2.REF_NO
        where d1.ISLEM_CINSI = 'MALZEME_GIRIS' AND d1.ID = (SELECT MIN(ID) from malzeme_depo1 WHERE ID > ${id})
        ORDER BY D1.ID desc;
    `
        baglanti.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length < 1) {
                res.json({ message: "Başka kayıt bulunamadı!", code: 400 });
                return;
            }
            res.send(result)
        })
    }
})
/* ID'ye GÖRE İLGİLİ KAYITLARI LİSTELEME */
app.get("/malzemedepogiristekkayit/:id", async (req, res) => {
    const { id } = req.params;
    const sql = `SELECT d1.ID,D1.TARIH,D1.FIRMA_KODU,D1.FIRMA_ADI,D1.FATURA_NO,d1.ACIKLAMA,d2.KALEM_ISLEM,d2.MALZEME_KODU,d2.MALZEME_ADI,d2.MIKTAR,d2.BIRIM
    FROM malzeme_depo1 d1 INNER JOIN malzeme_depo2 d2 on d1.ID = d2.REF_NO
    where d1.ISLEM_CINSI = 'MALZEME_GIRIS' and D1.ID = ${id};
    `
    baglanti.query(sql, (err, result) => {
        if (err) throw err;
        // if (result.length < 1) {
        //     res.json({ message: "Başka kayıt bulunamadı!", code: 400 });
        //     return;
        // }
        res.send(result)
    })

})
/* MALZEME DEPO GIRIS LISTE DETAY */
app.get("/malzemedepolistedetay/:depoTipi", async (req, res) => {
    const { depoTipi } = req.params;
    if (depoTipi === 'giris') {
        const sql = `SELECT d1.ID,D1.TARIH,D1.FIRMA_KODU,D1.FIRMA_ADI,D1.FATURA_NO,d1.ACIKLAMA,d2.KALEM_ISLEM,d2.MALZEME_KODU,d2.MALZEME_ADI,d2.MIKTAR,d2.BIRIM 
                        FROM malzeme_depo1 d1 INNER JOIN malzeme_depo2 d2 on d1.ID = d2.REF_NO where d1.ISLEM_CINSI = 'MALZEME_GIRIS' ORDER BY D1.ID desc;
    `
        baglanti.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length < 1) {
                res.json({ message: "Başka kayıt bulunamadı!", code: 400 });
                return;
            }
            res.send(result)
        })
    }
})

app.post("/malzemedepo/:tip", async (req, res) => {
    const { tip } = req.params;
    const { ISLEM_CINSI, TARIH, TEDARIKCI_KODU, TEDARIKCI_ADI, FATURA_NO } = req.body.values;
    const { kalem } = req.body;
    try {
        switch (tip) {
            case "kaydet":
                const sorgu = `INSERT INTO malzeme_depo1
                    (ISLEM_CINSI,TARIH, FIRMA_KODU, FIRMA_ADI,FATURA_NO)
                    VALUES (
                        '${ISLEM_CINSI}',
                        '${TARIH}',
                        '${TEDARIKCI_KODU}',
                        '${TEDARIKCI_ADI}',
                        '${FATURA_NO}'
                    )`
                baglanti.query(sorgu, function (err) {
                    if (err) throw err;
                    // console.log("veri girildi");
                    const lastID = "SELECT LAST_INSERT_ID()"
                    baglanti.query(lastID, function (err, result) {
                        if (err) throw err;
                        const tablo1KayitID = result[0]['LAST_INSERT_ID()']
                        for (let i = 0; i < kalem.length; i++) {
                            const fisSorgu = `INSERT INTO malzeme_depo2 (REF_NO,KALEM_ISLEM,MALZEME_KODU,MALZEME_ADI,MIKTAR,BIRIM)
                            VALUES(
                                '${tablo1KayitID}',
                                '${kalem[i].KALEM_ISLEM}',
                                '${kalem[i].MALZEME_KODU}',
                                '${kalem[i].MALZEME_ADI}',
                                '${Number(kalem[i].MIKTAR)}',
                                '${kalem[i].BIRIM}'
                                )
                            `;
                            baglanti.query(fisSorgu, function (err, result) {
                                if (err) throw err;
                                console.log("kayıt işlemi başarılı.");
                            })
                        }
                    })
                })
                res.send();
            default:
                break;
        }
    } catch (error) {

    }
    res.send();
})


/* kalem işlem getirme sorgusu */
app.get("/kalem-islem/:depoAdi", async (req, res) => {
    const { depoAdi } = req.params;
    const sql = `SELECT KALEM_ISLEM FROM kalem_islem WHERE DEPO_ADI = '${depoAdi}'`;
    baglanti.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

app.listen(3001, () => {
    baglanti.connect((err) => {
        if (err) throw err;
        console.log("database bağlantısı başarılı");
    })
})

