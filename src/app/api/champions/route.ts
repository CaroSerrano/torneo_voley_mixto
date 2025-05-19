import { NextRequest, NextResponse } from 'next/server';
import {
  loadChampions,
  addChampion,
} from '@/features/champions/champion.service';
import { createChampionDataDto } from '@/features/champions/validations';
import { auth } from '@/app/auth';
import { handleError } from '@/utils/errors/errorHandler';
import { UnauthorizedError } from '@/utils/errors/customErrors';

export async function GET() {
  try {
    const champions = await loadChampions();
    return NextResponse.json(champions);
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
    const data = await req.json();
    const parsedData = createChampionDataDto.parse(data);
    const newChampion = await addChampion(parsedData);
    return NextResponse.json(newChampion);
  } catch (error) {
    return handleError(error);
  }
}
