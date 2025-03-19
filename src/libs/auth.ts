import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'

import Credentials from 'next-auth/providers/credentials'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

export const config: NextAuthConfig = {
  trustHost: true,
  pages: { signIn: '/login' },
  session: {
    strategy: 'jwt'
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        loginAs: {}
      },
      authorize: async (credentials: any) => {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })

        const resJson = await response.json()

        if (resJson.statusCode !== 201) {
          throw new Error(resJson.message)
        }

        const { id, email, name, status, accessToken, teachersToRoles } = resJson.result

        return {
          id,
          email,
          name,
          status,
          accessToken,
          teachersToRoles
        }
      }
    })
  ],

  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        if (user.status === 'teacher' && 'teachersToRoles' in user) {
          token.user = {
            ...user,
            teachersToRoles: user.teachersToRoles
          }
        } else {
          token.user = user
        }
      }

      return token
    },
    async session({ session, token }: any) {
      session.user = token.user

      return session
    }
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
