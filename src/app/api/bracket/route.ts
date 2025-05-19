import { NextRequest, NextResponse } from 'next/server';
import { loadBracket, addBracket } from '@/features/bracket/bracket.service';
import { createBracketDataDto } from '@/features/bracket/validations';
import { auth } from '@/app/auth';
import { handleError } from '@/utils/errors/errorHandler';
import { UnauthorizedError } from '@/utils/errors/customErrors';

export async function GET() {
  try {
    const brackets = await loadBracket();
    return NextResponse.json(brackets);
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
    const parsedData = createBracketDataDto.parse(data);
    const newBracket = await addBracket(parsedData);
    return NextResponse.json(newBracket);
  } catch (error) {
    return handleError(error);
  }
}
