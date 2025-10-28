import * as jwt from 'jsonwebtoken';
export const signJWT = (payload: any, secret: string) => jwt.sign(payload, secret, { expiresIn: '1h' });
// Add AWS KMS and WAF/Ingress config as needed
