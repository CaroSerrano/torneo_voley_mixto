import { NextRequest, NextResponse } from 'next/server';
import { loadUsers, addUser, getUser } from '@/features/users/user.service';
import { createUserDataDto } from '@/features/users/validations';
import { ZodError } from 'zod';
import { createHash } from '@/utils/auth';

export async function GET() {
  try {
    const users = await loadUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json(error, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();
    const validatedData = createUserDataDto.parse(userData);
    const userFound = await getUser({ email: validatedData.email });
    if (userFound) {
      return NextResponse.json('Email already exists', { status: 400 });
    }
    const hashedPass = await createHash(validatedData.password);
    const withHashedPass = {
      ...validatedData,
      password: hashedPass,
    };
    const newUser = await addUser(withHashedPass);
    if (!newUser) {
      return NextResponse.json('Error al crear el usuario', { status: 400 });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword);
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
