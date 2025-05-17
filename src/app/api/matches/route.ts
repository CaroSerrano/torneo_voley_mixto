import { NextRequest, NextResponse } from 'next/server';
import { loadMatches, addMatch } from '@/features/matches/match.service';
import { createMatchDataDto } from '@/features/matches/validations';
import { ZodError } from 'zod';
import { auth } from '@/app/auth';

export async function GET() {
  try {
    const matches = await loadMatches();
    return NextResponse.json(matches);
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
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: 'You must be logged in.' },
        { status: 401 }
      );
    }
    const matchData = await req.json();
    const validatedData = createMatchDataDto.parse(matchData);

    const newMatch = await addMatch(validatedData);

    return NextResponse.json(newMatch);
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json(error, { status: 400 });
  }
}
