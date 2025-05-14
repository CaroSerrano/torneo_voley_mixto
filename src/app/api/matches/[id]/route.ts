import { NextRequest, NextResponse } from 'next/server';
import { deleteMatch, updateMatch } from '@/features/matches/match.service';
import { ZodError } from 'zod';
import { updateMatchDataDto } from '@/features/matches/validations';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: matchId } = await params;
    await deleteMatch(matchId);
    return NextResponse.json('Partido eliminado correctamente');
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json(error, { status: 400 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: matchId } = await params;
    const matchData = await req.json();
    const parsedData = updateMatchDataDto.parse(matchData);
    const updatedMatch = await updateMatch(matchId, parsedData);
    return NextResponse.json(updatedMatch);
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
