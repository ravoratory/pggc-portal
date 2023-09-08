import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";

import PGritProvider from "@/providers/pgrit";

const authOptions = (
  req: NextApiRequest,
  res: NextApiResponse,
): NextAuthOptions => ({
  providers: [
    PGritProvider(process.env.PGRIT_URL, {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            mutation loginWithToken($input: LoginWithTokenInput!) {
                loginWithToken(input: $input){
                    access_token
                    user {
                      userid
                      role
                      team {
                        id
                        name
                      }
                    }
              }
            }
          `,
            variables: {
              input: {
                username: user.name,
                password: account?.access_token,
              },
            },
          }),
        },
      );
      const data = await response.json();
      account.accessToken = data.data.loginWithToken.access_token;
      account.team = data.data.loginWithToken.user.team;
      account.role = data.data.loginWithToken.user.role.toLowerCase();

      console.log(account, user);
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.accessToken;
        token.role = account.role;
        token.team = account.team;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      session.user.team = token.team;
      console.log(session, token, user);
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    maxAge: 60 * 3,
  },
  useSecureCookies: process.env.NODE_ENV === "production",
});

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions(req, res));
