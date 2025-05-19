import { NextRequest, NextResponse } from 'next/server';
import {
  loadChampions,
  addChampion,
} from '@/features/champions/champion.service';
import { createChampionDataDto } from '@/features/champions/validations';
import { ZodError } from 'zod';
import { auth } from '@/app/auth';

export async function GET() {
  try {
    const champions = await loadChampions();
    return NextResponse.json(champions);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
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
    const data = await req.json();
    const parsedData = createChampionDataDto.parse(data);
    const newChampion = await addChampion(parsedData);    
    return NextResponse.json(newChampion);
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
