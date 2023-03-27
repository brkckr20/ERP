import express from 'express';
import { AksesuarKartiKaydet } from '../controllers/AksesuarControllers';
const router = express.Router();

router.post("/kart", AksesuarKartiKaydet);
export default router;