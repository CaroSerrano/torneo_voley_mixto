import { NextResponse } from 'next/server';
import { loadTeams } from '@/services/team.service';

export async function GET() {
  try {
    const teams = await loadTeams();
    return NextResponse.json(teams);
  } catch (error) {
    console.error(error);
  }
}
