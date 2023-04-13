import express from 'express';
import { MalzemeDepoRapor } from '../controllers/RaporController';
const router = express.Router();

router.get("/malzemedepo", MalzemeDepoRapor);
export default router;