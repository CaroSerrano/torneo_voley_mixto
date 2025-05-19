import { NextRequest, NextResponse } from 'next/server';
import {
  deleteChampion,
  updateChampion,
} from '@/features/champions/champion.service';
import { updateChampionDataDto } from '@/features/champions/validations';
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
    const { id: championId } = await params;
    await deleteChampion(championId);
    return NextResponse.json('Campeón eliminado correctamente');
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
    const { id: championId } = await params;
    const championData = await req.json();
    const parsedData = updateChampionDataDto.parse(championData);
    const updatedChampion = await updateChampion(championId, parsedData);
    return NextResponse.json(updatedChampion);
  } catch (error) {
    return handleError(error);
  }
}
