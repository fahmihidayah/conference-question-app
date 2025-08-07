import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import type { Session, User } from 'next-auth';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from './prisma';

// Extend NextAuth types
declare module 'next-auth' {
  interface User {
    id: string;
    stripeCustomerId: string;
    isActive: boolean;
  }

  interface Session {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    stripeCustomerId: string;
    isActive: boolean;
  }
}

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Partial<Record<'email' | 'password', unknown>>
      ): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(
          password,
          user?.password ?? 'notvalid'
        );
        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          stripeCustomerId: user.stripeCustomerId || '',
          isActive: user.isActive || false,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/auth',
    signOut: '/auth',
  },
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.stripeCustomerId = user.stripeCustomerId;
        token.isActive = user.isActive;
      }

      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (session.user) {
        session.user.id = token.id;
        session.user.stripeCustomerId = token.stripeCustomerId;
        session.user.isActive = token.isActive;
      }

      return session;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
