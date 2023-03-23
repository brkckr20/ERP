import express from 'express';
import { KullanicilariGetir} from '../controllers/KullaniciController';
const router = express.Router();

router.get("/", KullanicilariGetir);

export default router;