import { NextRequest, NextResponse } from 'next/server';
import { deleteBracket, updateBracket } from '@/features/bracket/bracket.service';
import { ZodError } from 'zod';
import { updateBracketDataDto } from '@/features/bracket/validations';
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
    const { id: bracketId } = await params;
    await deleteBracket(bracketId);
    return NextResponse.json('Llave eliminada correctamente');
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
    const { id: bracketId } = await params;
    const bracketData = await req.json();
    const parsedData = updateBracketDataDto.parse(bracketData);
    const updatedBracket = await updateBracket(bracketId, parsedData);
    return NextResponse.json(updatedBracket);
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
