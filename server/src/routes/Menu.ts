import express from 'express';
const router = express.Router();
import { MenuleriGetir, MenuKaydet } from '../controllers/MenuControllers';

router.get("/:kullanici_id", MenuleriGetir);
router.post("/", MenuKaydet);

export default router;