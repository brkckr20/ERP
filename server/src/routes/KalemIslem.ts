import express from 'express';
import { KalemIslemGetir } from '../controllers/KalemIslemControllers';
const router = express.Router();

router.get("/:depoAdi", KalemIslemGetir);

export default router;