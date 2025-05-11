import { connect, connection } from 'mongoose';

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
  console.log('Conected to  ', db.connection.db?.databaseName);
  conn.isConnected = Boolean(db.connections[0].readyState);
}

connection.on('connected', () => {
  console.log('mongoose is connected');
});

connection.on('error', (err) => {
  console.log('Monogoose connection error', err);
});
