import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

const JWT_SECRET = readFileSync('../../../jwt.evaluation.key', 'utf-8');
console.log(JWT_SECRET);

const sign = (payload: object, duration = '24h') =>
  jwt.sign(payload, 'JWT_SECRET', {
    algorithm: 'HS256',
    expiresIn: duration,
  });

const verify = (token: string) =>
  jwt.verify(token, 'JWT_SECRET');

export default {
  sign,
  verify,
};
