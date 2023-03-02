import jwt from 'jsonwebtoken';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const JWT_SECRET = serverRuntimeConfig.secret;

export function encode(payload) {
  return jwt.sign(payload, JWT_SECRET);
}

export function decode(token) {
  return jwt.verify(token, JWT_SECRET);
}