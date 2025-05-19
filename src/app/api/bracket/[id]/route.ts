import { NextRequest, NextResponse } from 'next/server';
import {
  deleteBracket,
  updateBracket,
} from '@/features/bracket/bracket.service';
import { updateBracketDataDto } from '@/features/bracket/validations';
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
      throw new UnauthorizedError('Debes estar logueado')
    }
    const { id: bracketId } = await params;
    await deleteBracket(bracketId);
    return NextResponse.json('Llave eliminada correctamente');
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
      throw new UnauthorizedError('Debes estar logueado')
    }
    const { id: bracketId } = await params;
    const bracketData = await req.json();
    const parsedData = updateBracketDataDto.parse(bracketData);
    const updatedBracket = await updateBracket(bracketId, parsedData);
    return NextResponse.json(updatedBracket);
  } catch (error) {
    return handleError(error);
  }
}
