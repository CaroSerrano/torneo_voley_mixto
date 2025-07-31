import { connectDB } from '@/utils/mongoose';
import '@/models';
import Bracket from '@/models/Bracket';
import { ReturnedBracket } from './types';
import { CreateBracketData, UpdateBracketData } from './validations';

export async function loadBracket(): Promise<ReturnedBracket[]> {
  await connectDB();
  const brackets = await Bracket.find();
  return brackets;
}

export async function addBracket(
  bracketData: CreateBracketData
): Promise<ReturnedBracket> {
  await connectDB();
  const addedBracket = await Bracket.create(bracketData);
  return addedBracket;
}

export async function deleteBracket(id: string): Promise<ReturnedBracket> {
  await connectDB();
  const deletedBracket = await Bracket.findByIdAndDelete(id);
  return deletedBracket;
}

export async function updateBracket(
  id: string,
  bracketData: UpdateBracketData
): Promise<ReturnedBracket> {
  await connectDB();
  const updatedBracket = await Bracket.findByIdAndUpdate(id, bracketData, {
    new: true,
  });
  return updatedBracket;
}
