import express from 'express';
const router = express.Router();
import fs from 'fs';

const files = fs.readdirSync('./report');

router.get("/gorsel-rapor", (req, res) => {
    console.log("gorsel rapor");
    
});
export default router;