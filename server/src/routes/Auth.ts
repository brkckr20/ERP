import express from 'express';
const router = express.Router();
import { GirisYap } from '../controllers/AuthController';

router.post("/giris", GirisYap);

export default router;