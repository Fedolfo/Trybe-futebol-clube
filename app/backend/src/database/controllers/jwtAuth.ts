import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

const JWT_SECRET = readFileSync('./jwt.evaluation.key', 'utf-8');

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
