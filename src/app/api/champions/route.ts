import { NextRequest, NextResponse } from 'next/server';
import {
  loadChampions,
  addChampion,
} from '@/features/champions/champion.service';
import { createChampionDataDto } from '@/features/champions/validations';
import { ZodError } from 'zod';

export async function GET() {
  try {
    const champions = await loadChampions();
    return NextResponse.json(champions);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsedData = createChampionDataDto.parse(data);
    const newChampion = await addChampion(parsedData);
    return NextResponse.json(newChampion);
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
