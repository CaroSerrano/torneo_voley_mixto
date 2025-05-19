import { NextRequest, NextResponse } from 'next/server';
import {
  deleteChampion,
  updateChampion,
} from '@/features/champions/champion.service';
import { ZodError } from 'zod';
import { updateChampionDataDto } from '@/features/champions/validations';
import { auth } from '@/app/auth';

export async function DELETE(
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
    const { id: championId } = await params;
    await deleteChampion(championId);
    return NextResponse.json('Campeón eliminado correctamente');
  } catch (error) {
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
    const { id: championId } = await params;
    const championData = await req.json();
    const parsedData = updateChampionDataDto.parse(championData);
    const updatedChampion = await updateChampion(championId, parsedData);
    return NextResponse.json(updatedChampion);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
