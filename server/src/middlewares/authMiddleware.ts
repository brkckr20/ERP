import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRETKEY = 'SECRETKEY';

interface JwtPayload {
    id: number;
}
  
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Unauthorized',
            code: 401,
        });
    }
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'You must be logged in.' });
    }
    try {
        const { id } = jwt.verify(token, SECRETKEY) as JwtPayload;
        res.sendStatus(200).send(id);
    } catch (error) {
        
    }
    
    next();
}

export default authMiddleware;