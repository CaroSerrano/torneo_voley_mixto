import { connectDB } from '@/utils/mongoose';
import Team from '@/models/Team';
import { ReturnedTeam } from '@/features/teams/types';
import { CreateTeamData, UpdateTeamData } from '@/features/teams/validations';

export async function loadTeams(): Promise<ReturnedTeam[]> {
  await connectDB();
  const teams = await Team.find().sort({ score: -1, name: 1 });
  return teams;
}

export async function addTeam(teamData: CreateTeamData): Promise<ReturnedTeam> {
  await connectDB();
  const addedTeam = await Team.create(teamData);
  return addedTeam;
}

export async function deleteTeam(teamId: string): Promise<ReturnedTeam> {
  await connectDB();
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
