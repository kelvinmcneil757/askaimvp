import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import SlackProvider from 'next-auth/providers/slack';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.readonly',
        },
      },
    }),
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Simple hardcoded user for demo; replace with real DB check
        if (
          credentials?.email === 'demo@davaai.com' &&
          credentials?.password === 'password123'
        ) {
          return { id: '1', name: 'Demo User', email: 'demo@davaai.com' };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    signOut: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'davaai-secret',
}); 