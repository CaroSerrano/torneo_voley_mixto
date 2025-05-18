import { NextRequest, NextResponse } from 'next/server';
import { loadBracket, addBracket } from '@/features/bracket/bracket.service';
import { createBracketDataDto } from '@/features/bracket/validations';
import { ZodError } from 'zod';
import { auth } from '@/app/auth';

export async function GET() {
  try {
    const brackets = await loadBracket();
    return NextResponse.json(brackets);
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
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: 'You must be logged in.' },
        { status: 401 }
      );
    }
    const data = await req.json();
    const parsedData = createBracketDataDto.parse(data);
    const newBracket = await addBracket(parsedData);
    return NextResponse.json(newBracket);
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
