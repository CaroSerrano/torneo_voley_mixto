/* eslint-disable @typescript-eslint/ban-ts-comment */
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
const NODE_ENV = process.env.NODE_ENV;
const DB_NAME =
  NODE_ENV === 'production'
    ? process.env.DB_PRODUCTION
    : process.env.DB_DEVELOPMENT;

if (!MONGODB_URI || !DB_NAME) {
  throw new Error('Faltan las variables de entorno para la DB');
}

//@ts-expect-error
let cached = global.mongoose;

if (!cached) {
  //@ts-expect-error
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
