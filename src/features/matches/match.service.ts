import { connectDB } from '@/utils/mongoose';
import { Match } from '@/models/Match';
import { CreatedMatch, ReturnedMatch } from './types';
import { CreateMatchData, UpdateMatchData } from './validations';
import mongoose from 'mongoose';
import '@/models/Team'

export async function loadMatches(): Promise<ReturnedMatch[]> {
  await connectDB();
  const matches = await Match.find().populate(['teamA', 'teamB']).sort({ date: -1 });
  return matches;
}

export async function addMatch(
  matchData: CreateMatchData
): Promise<CreatedMatch> {
  const parsedData = {
    ...matchData,
    teamA: new mongoose.Types.ObjectId(matchData.teamA),
    teamB: new mongoose.Types.ObjectId(matchData.teamB),
  };  
  await connectDB();
  const addedMatch = await Match.create(parsedData);
  return addedMatch;
}

export async function deleteMatch(matchId: string): Promise<CreatedMatch> {
  await connectDB();
  const deletedMatch = await Match.findByIdAndDelete(matchId);
  return deletedMatch;
}

export async function updateMatch(
  matchId: string,
  matchData: UpdateMatchData
): Promise<CreatedMatch> {
  await connectDB();
  const updatedMatch = await Match.findByIdAndUpdate(matchId, matchData, {
    new: true,
  });
  return updatedMatch;
}
