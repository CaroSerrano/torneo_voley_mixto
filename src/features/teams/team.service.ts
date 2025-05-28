import { connectDB } from '@/utils/mongoose';
import Team from '@/models/Team';
import { ReturnedTeam } from '@/features/teams/types';
import { CreateTeamData, UpdateTeamData } from '@/features/teams/validations';
import { Match } from '@/models/Match';
import { Champion } from '@/models/Champion';

export async function loadTeams(): Promise<ReturnedTeam[]> {
  await connectDB();
  const teams = await Team.find().sort({ score: -1, matchesPlayed: 1 });
  return teams;
}

export async function addTeam(teamData: CreateTeamData): Promise<ReturnedTeam> {
  await connectDB();
  const addedTeam = await Team.create(teamData);
  return addedTeam;
}

export async function deleteTeam(teamId: string): Promise<ReturnedTeam> {
  await connectDB();
  const teamMatches = await Match.find({
    $or: [{ teamA: teamId }, { teamB: teamId }],
  });
  const matchIds = teamMatches.map((match) => match._id);
  await Match.deleteMany({ _id: { $in: matchIds } });
  const teamChampions = await Champion.find({
    team: teamId,
  });
  const championIds = teamChampions.map((champion) => champion._id);
  await Champion.deleteMany({ _id: { $in: championIds } });

  const deletedTeam = await Team.findByIdAndDelete(teamId);
  return deletedTeam;
}

export async function updateTeam(
  teamId: string,
  teamData: UpdateTeamData
): Promise<ReturnedTeam> {
  await connectDB();
  const updatedTeam = await Team.findByIdAndUpdate(teamId, teamData, {
    new: true,
  });
  return updatedTeam;
}
