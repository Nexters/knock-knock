import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import KakaoProvider from 'next-auth/providers/kakao'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../server/db/client'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.id = user.id
      return token
    },
    session: async ({ session, token }) => {
      if (token) session.id = token.id
      return session
    },
    async redirect(context) {
      const { url, baseUrl } = context
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  // https://next-auth.js.org/configuration/options#nextauth_secret
  // secret: process.env.JWT_SECRET,
  pages: {
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    signIn: '/auth/login',
    newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  // jwt: {
  //   // Default 값으로 NEXTAUTH_SECRET 환경변수 사용
  //   secret: 'super-secret',
  //   maxAge: 15 * 24 * 30 * 60, // 15 days
  // },
  // 아래 theme 설정은 위 custom pages 를 쓰는 순간 필요없어졌지만 혹시 모르니 놔둠
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '#16C674', // Hex color code
    logo: '../../../assets/svg/logo.svg', // Absolute URL to image
    buttonText: '#ffffff', // Hex color code
  },
}

export default NextAuth(authOptions)
