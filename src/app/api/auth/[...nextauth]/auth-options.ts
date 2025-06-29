import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

import { env } from '@/env.mjs';
import prisma from '@/lib/prisma';
import { stripeServer } from '@/lib/stripe';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Partial<Record<'email' | 'password', unknown>>
      ) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: email as string,
          },
        });

        if (!user) {
          throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(
          password as string,
          user?.password ?? 'notvalid'
        );
        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        console.log('CredentialsProvider user : ', user);

        return {
          ...user,
          stripeCustomerId: user.stripeCustomerId || '',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },

  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth',
    signOut: '/auth',
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('auth option jwt token : ', token, user);
      if (user) {
        token.id = user.id;
        token.stripeCustomerId = user.stripeCustomerId;
        token.isActive = user.isActive;
      }

      return token;
    },
    async session({ session, token, user }) {
      console.log('auth option session : ', session, token, user);
      if (!session.user) return session;

      session.user.id = token.id;
      session.user.stripeCustomerId = token.stripeCustomerId;
      session.user.isActive = token.isActive;

      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      if (!user.email || !user.name) return;

      await stripeServer.customers
        .create({
          email: user.email,
          name: user.name,
        })
        .then(async (customer) => {
          return prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customer.id,
            },
          });
        });
    },
  },
});
