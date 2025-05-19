import { NextRequest, NextResponse } from 'next/server';
import { loadMatches, addMatch } from '@/features/matches/match.service';
import { createMatchDataDto } from '@/features/matches/validations';
import { auth } from '@/app/auth';
import { handleError } from '@/utils/errors/errorHandler';
import { UnauthorizedError } from '@/utils/errors/customErrors';

export async function GET() {
  try {
    const matches = await loadMatches();
    return NextResponse.json(matches);
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
    const matchData = await req.json();
    const validatedData = createMatchDataDto.parse(matchData);

    const newMatch = await addMatch(validatedData);

    return NextResponse.json(newMatch);
  } catch (error) {
    return handleError(error);
  }
}
