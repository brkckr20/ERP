import express from 'express';
import { DbNameGetir, MenuGetir } from '../controllers/MainController';
const router = express.Router();

router.get("/", DbNameGetir);
router.get("/:menu/:id", MenuGetir);

export default router;