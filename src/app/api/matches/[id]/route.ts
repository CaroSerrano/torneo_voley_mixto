import { NextRequest, NextResponse } from 'next/server';
import { deleteMatch, updateMatch } from '@/features/matches/match.service';
import { ZodError } from 'zod';
import { updateMatchDataDto } from '@/features/matches/validations';
import { auth } from '@/app/auth';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // const session = await auth();

    // if (!session) {
    //   return NextResponse.json(
    //     { message: 'You must be logged in.' },
    //     { status: 401 }
    //   );
    // }
    const { id: matchId } = await params;
    await deleteMatch(matchId);
    return NextResponse.json('Partido eliminado correctamente');
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: 'You must be logged in.' },
        { status: 401 }
      );
    }
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
    return NextResponse.json(error, { status: 500 });
  }
}
