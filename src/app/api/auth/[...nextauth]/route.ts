import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { getUser } from '@/features/users/user.service';
import { compareHash } from '@/utils/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, _req) {
        if (!credentials || !credentials.email) {
          throw new Error('Faltan credenciales');
        }
        const userFound = await getUser({ email: credentials.email });
        console.log(userFound);

        if (!userFound) {
          throw new Error('Usuario no encontrado');
        }
        const matchPassword = await compareHash(
          userFound,
          credentials.password
        );
        if (!matchPassword) {
          throw new Error('Credenciales incorrectas');
        }
        return {
          id: userFound._id,
          name: userFound.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
