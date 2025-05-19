import { NextRequest, NextResponse } from 'next/server';
import { deleteTeam, updateTeam } from '@/features/teams/team.service';
import { updateTeamDataDto } from '@/features/teams/validations';
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
    const { id: teamId } = await params;
    await deleteTeam(teamId);
    return NextResponse.json('Equipo eliminado correctamente');
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
    const { id: teamId } = await params;
    const teamData = await req.json();
    const parsedData = updateTeamDataDto.parse(teamData);
    const updatedTeam = await updateTeam(teamId, parsedData);
    return NextResponse.json(updatedTeam);
  } catch (error) {
    return handleError(error);
  }
}
