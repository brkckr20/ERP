import express from 'express';
const router = express.Router();
import { MenuleriGetir } from '../controllers/MenuControllers';

router.get("/:id", MenuleriGetir);

export default router;