import { NextRequest, NextResponse } from 'next/server';
import { loadTeams, addTeam } from '@/features/teams/team.service';
import { createTeamDataDto } from '@/features/teams/validations';
import { ZodError } from 'zod';
import { auth } from '@/app/auth';

export async function GET() {
  try {
    const teams = await loadTeams();
    return NextResponse.json(teams);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: 'You must be logged in.' },
        { status: 401 }
      );
    }
    const teamData = await req.json();
    const parsedData = createTeamDataDto.parse(teamData);
    const newTeam = await addTeam(parsedData);
    return NextResponse.json(newTeam);
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
