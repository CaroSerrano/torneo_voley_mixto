import { connectDB } from '@/utils/mongoose'
import Team from '@/models/Team';

export async function loadTeams() {
  await connectDB();
  const teams = await Team.find();
  return teams;
}
