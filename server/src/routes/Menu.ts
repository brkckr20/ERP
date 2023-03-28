import express from 'express';
const router = express.Router();
import { MenuleriGetir, MenuKaydet, TumMenuleriGetir } from '../controllers/MenuControllers';

router.get("/:kullanici_id", TumMenuleriGetir);
router.post("/", MenuKaydet);

export default router;