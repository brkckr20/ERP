import express from 'express';
const router = express.Router();
import { BirimGetir, BirimKaydet, BirimSil } from '../controllers/BirimControllers';

router.get("/", BirimGetir);
router.post("/", BirimKaydet);
router.delete("/:id", BirimSil);

export default router;