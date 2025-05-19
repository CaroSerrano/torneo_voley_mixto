import { connect } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
const conn = {
  isConnected: false,
};

export async function connectDB() {
  if (conn.isConnected) {
    return;
  }
  const db = await connect(MONGODB_URI, {
    dbName: 'voleyMixto',
  });
  conn.isConnected = Boolean(db.connections[0].readyState);
}
