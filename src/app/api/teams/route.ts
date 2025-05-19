import { NextRequest, NextResponse } from 'next/server';
import { loadTeams, addTeam } from '@/features/teams/team.service';
import { createTeamDataDto } from '@/features/teams/validations';
import { auth } from '@/app/auth';
import { handleError } from '@/utils/errors/errorHandler';
import { UnauthorizedError } from '@/utils/errors/customErrors';

export async function GET() {
  try {
    const teams = await loadTeams();
    return NextResponse.json(teams);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      throw new UnauthorizedError('Debes estar logueado');
    }
    const teamData = await req.json();
    const parsedData = createTeamDataDto.parse(teamData);
    const newTeam = await addTeam(parsedData);
    return NextResponse.json(newTeam);
  } catch (error) {
    return handleError(error);
  }
}
