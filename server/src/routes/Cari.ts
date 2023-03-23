import express from 'express';
const router = express.Router();
import { CariGetir, CariKaydet, CariTipiGetir } from '../controllers/CariControllers';

router.get("/", CariGetir);
router.post("/", CariKaydet);
router.get("/tipi", CariTipiGetir);

export default router;