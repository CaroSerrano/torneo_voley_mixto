import { connectDB } from '@/utils/mongoose';
import '@/models';
import { User } from '@/models/User';
import { ReturnedUser } from './types';
import { CreateUserData, UpdateUserData } from './validations';

export async function loadUsers(): Promise<ReturnedUser[]> {
  await connectDB();
  const users = await User.find()
    .sort({ score: -1, name: 1 })
    .select('_id name email');
  return users;
}

export async function getUser(
  filter: Record<string, string>
): Promise<ReturnedUser | null> {
  await connectDB();
  const user = await User.findOne(filter);  
  return user ? user : null;
}

export async function addUser(
  userData: CreateUserData
): Promise<ReturnedUser | null> {
  await connectDB();
  const instance = new User(userData);
  const addedUser = await instance.save();
  return addedUser ? addedUser.toObject() : null;
}

export async function deleteUser(userId: string): Promise<ReturnedUser> {
  await connectDB();
  const deletedUser = await User.findByIdAndDelete(userId);
  return deletedUser;
}

export async function updateUser(
  userId: string,
  userData: UpdateUserData
): Promise<ReturnedUser> {
  await connectDB();
  const updatedUser = await User.findByIdAndUpdate(userId, userData, {
    new: true,
  });
  return updatedUser;
}
