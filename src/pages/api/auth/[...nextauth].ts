import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import SlackProvider from 'next-auth/providers/slack';
import CredentialsProvider from 'next-auth/providers/credentials';
import OAuthProvider from 'next-auth/providers/oauth';
import axios from 'axios';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/drive.readonly',
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
    OAuthProvider({
      id: 'notion',
      name: 'Notion',
      type: 'oauth',
      clientId: process.env.NOTION_CLIENT_ID!,
      clientSecret: process.env.NOTION_CLIENT_SECRET!,
      authorization: {
        url: 'https://api.notion.com/v1/oauth/authorize',
        params: { scope: 'database.read content.read user.read' },
      },
      token: 'https://api.notion.com/v1/oauth/token',
      userinfo: 'https://api.notion.com/v1/users/me',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.person?.email,
          image: profile.avatar_url,
        };
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
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.provider = account.provider;
      }
      // Google token refresh
      if (token.provider === 'google' && token.expiresAt && Date.now() > token.expiresAt * 1000) {
        try {
          const response = await axios.post(
            'https://oauth2.googleapis.com/token',
            new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID!,
              client_secret: process.env.GOOGLE_CLIENT_SECRET!,
              grant_type: 'refresh_token',
              refresh_token: token.refreshToken,
            })
          );
          token.accessToken = response.data.access_token;
          token.expiresAt = Math.floor(Date.now() / 1000) + response.data.expires_in;
        } catch (error) {
          console.error('Google token refresh error', error);
        }
      }
      // Notion token refresh
      if (token.provider === 'notion' && token.expiresAt && Date.now() > token.expiresAt * 1000) {
        try {
          const response = await axios.post(
            'https://api.notion.com/v1/oauth/token',
            new URLSearchParams({
              grant_type: 'refresh_token',
              refresh_token: token.refreshToken,
              client_id: process.env.NOTION_CLIENT_ID!,
              client_secret: process.env.NOTION_CLIENT_SECRET!,
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
          );
          token.accessToken = response.data.access_token;
          token.expiresAt = Math.floor(Date.now() / 1000) + response.data.expires_in;
        } catch (error) {
          console.error('Notion token refresh error', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
    },
  },
};

export default NextAuth(authOptions); 