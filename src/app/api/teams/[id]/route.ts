import { NextRequest, NextResponse } from 'next/server';
import { deleteTeam, updateTeam } from '@/features/teams/team.service';
import { updateTeamDataDto } from '@/features/teams/validations';
import { ZodError } from 'zod';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: teamId } = await params;
    await deleteTeam(teamId);
    return NextResponse.json('Equipo eliminado correctamente');
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json(error, { status: 400 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: teamId } = await params;
    const teamData = await req.json();
    const parsedData = updateTeamDataDto.parse(teamData);
    const updatedTeam = await updateTeam(teamId, parsedData);
    return NextResponse.json(updatedTeam);
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json(error, { status: 400 });
  }
}
