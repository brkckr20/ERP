import express from 'express';
const router = express.Router();
import { UlkeGetir, UlkeKaydet } from '../controllers/UlkeControllers';

router.get("/", UlkeGetir);
router.post("/", UlkeKaydet);

export default router;