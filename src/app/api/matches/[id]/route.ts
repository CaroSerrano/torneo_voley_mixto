import { NextRequest, NextResponse } from 'next/server';
import { deleteMatch, updateMatch } from '@/features/matches/match.service';
import { updateMatchDataDto } from '@/features/matches/validations';
import { auth } from '@/app/auth';
import { handleError } from '@/utils/errors/errorHandler';
import { UnauthorizedError } from '@/utils/errors/customErrors';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session) {
      throw new UnauthorizedError('Debes estar logueado');
    }
    const { id: matchId } = await params;
    await deleteMatch(matchId);
    return NextResponse.json('Partido eliminado correctamente');
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session) {
      throw new UnauthorizedError('Debes estar logueado');
    }
    const { id: matchId } = await params;
    const matchData = await req.json();
    const parsedData = updateMatchDataDto.parse(matchData);
    const updatedMatch = await updateMatch(matchId, parsedData);
    return NextResponse.json(updatedMatch);
  } catch (error) {
    return handleError(error);
  }
}
