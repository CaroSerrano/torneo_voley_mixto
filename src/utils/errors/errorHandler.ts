import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import {
  ResourceNotFound,
  UnauthorizedError,
  ValidationError,
} from './customErrors';
import mongoose from 'mongoose';

export function handleError(error: unknown, message?: string) {
  //Zod validation error
  if (error instanceof ZodError) {
    return NextResponse.json(
      { status: 'fail', message: error.issues },
      { status: 400 }
    );
  }
  // Mongoose: error al parsear un ObjectId inválido
  if (error instanceof mongoose.Error.CastError && error.kind === 'ObjectId') {
    return NextResponse.json(
      { status: 'fail', message: 'ID inválido' },
      { status: 400 }
    );
  }
  // Mongoose: error por clave duplicada
  if (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    error.code === 11000
  ) {
    return NextResponse.json(
      { status: 'fail', message: 'Ya existe un recurso con ese valor único' },
      { status: 409 }
    );
  }
  // Mongoose: error general de validación
  if (error instanceof mongoose.Error.ValidationError) {
    return NextResponse.json(
      { status: 'fail', message: error.message },
      { status: 400 }
    );
  }

  //Autorización
  if (error instanceof UnauthorizedError) {
    return NextResponse.json(
      { status: 'fail', message: error.message },
      { status: 401 }
    );
  }

  if (error instanceof ResourceNotFound) {
    return NextResponse.json(
      { status: 'fail', message: error.message },
      { status: 404 }
    );
  }
  //Otros errores de validación
  //No encuentra recurso por id
  if (error instanceof ValidationError) {
    return NextResponse.json(
      { status: 'fail', message: error.message },
      { status: 400 }
    );
  }
  //Otros errores
  if (error instanceof Error) {
    return NextResponse.json(
      { status: 'fail', message: error.message },
      { status: 500 }
    );
  }
  //Respuesta por defecto
  return NextResponse.json({ status: 'fail', message }, { status: 500 });
}
