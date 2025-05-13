import { NextRequest, NextResponse } from 'next/server';
import { loadTeams, addTeam } from '@/features/teams/team.service';

export async function GET() {
  try {
    const teams = await loadTeams();
    return NextResponse.json(teams);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json(error, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const teamData = await req.json();
    const newTeam = await addTeam(teamData);
    return NextResponse.json(newTeam);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json(error, { status: 400 });
  }
}
