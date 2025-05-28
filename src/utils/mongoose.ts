import { connect } from 'mongoose';

const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = NODE_ENV === 'production' ? process.env.DB_PRODUCTION : process.env.DB_DEVELOPMENT
const conn = {
  isConnected: false,
};

export async function connectDB() {
  if (conn.isConnected) {
    return;
  }
  const db = await connect(MONGODB_URI, {
    dbName: DB_NAME,
  });
  conn.isConnected = Boolean(db.connections[0].readyState);
}
