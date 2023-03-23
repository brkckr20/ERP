import express from 'express';
import {
    MalzemeDepoGetir,
    MalzemeDepoKaydet,
    MalzemeDepoOncekiKayitGetir,
    MalzemeDepoSonrakiKayitGetir
} from '../controllers/MalzemeDepoControllers';

const router = express.Router();

router.get("/:depoTipi", MalzemeDepoGetir);
router.get("/:tip/onceki/:id", MalzemeDepoOncekiKayitGetir);
router.get("/:tip/sonraki/:id", MalzemeDepoSonrakiKayitGetir);
router.post("/:depoTipi/:id", MalzemeDepoKaydet);

export default router;