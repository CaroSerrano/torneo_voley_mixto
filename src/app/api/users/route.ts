import { NextRequest, NextResponse } from 'next/server';
import { loadUsers, addUser, getUser } from '@/features/users/user.service';
import { createUserDataDto } from '@/features/users/validations';
import { createHash } from '@/utils/auth';
import { handleError } from '@/utils/errors/errorHandler';
import { ValidationError } from '@/utils/errors/customErrors';

export async function GET() {
  try {
    const users = await loadUsers();
    return NextResponse.json(users);
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();
    const validatedData = createUserDataDto.parse(userData);
    const userFound = await getUser({ email: validatedData.email });
    if (userFound) {
      throw new ValidationError('Email already exists');
    }
    const hashedPass = await createHash(validatedData.password);
    const withHashedPass = {
      ...validatedData,
      password: hashedPass,
    };
    const newUser = await addUser(withHashedPass);
    if (!newUser) {
      throw new ValidationError('Error al crear el usuario');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    return handleError(error)
  }
}
