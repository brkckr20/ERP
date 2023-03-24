import express from 'express';
const router = express.Router();
import { MenuleriGetir, MenuKaydet } from '../controllers/MenuControllers';

router.get("/:id", MenuleriGetir);
router.post("/", MenuKaydet);

export default router;