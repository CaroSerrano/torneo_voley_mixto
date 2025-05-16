import { connectDB } from '@/utils/mongoose';
import Champion from '@/models/Champion';
import { ReturnedChampion } from './types';
import { CreateChampionData, UpdateChampionData } from './validations';

export async function loadChampions(): Promise<ReturnedChampion[]> {
  await connectDB();
  const champions = await Champion.find().sort({ year: -1, tournament: -1 });
  return champions;
}

export async function addChampion(
  championData: CreateChampionData
): Promise<ReturnedChampion> {
  await connectDB();
  const addedChampion = await Champion.create(championData);
  return addedChampion;
}

export async function deleteChampion(id: string): Promise<ReturnedChampion> {
  await connectDB();
  const deletedChampion = await Champion.findByIdAndDelete(id);
  return deletedChampion;
}

export async function updateChampion(
  id: string,
  championData: UpdateChampionData
): Promise<ReturnedChampion> {
  await connectDB();
  const updatedChampion = await Champion.findByIdAndUpdate(id, championData, {
    new: true,
  });
  return updatedChampion;
}
