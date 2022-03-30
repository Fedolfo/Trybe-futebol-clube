import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }
  try {
    jwt.verify(token, 'JWT_SECRET');
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
