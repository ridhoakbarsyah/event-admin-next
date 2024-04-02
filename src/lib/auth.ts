import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/signin', // default url /api/auth/signin
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'john@mail.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const existUser = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })
                if (!existUser) {
                    return null
                }

                const passwordMatch = await compare(credentials.password, existUser.password as string)

                if (!passwordMatch) {
                    return null
                }

                return {
                    id: `${existUser.id}`,
                    name: existUser.name,
                    role: existUser.role,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                    role: user.role
                }
            }

            if (trigger === 'update') {
                return {
                    ...token,
                    ...session.user
                }
            }

            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    role: token.role
                }
            }
        }
    }
}