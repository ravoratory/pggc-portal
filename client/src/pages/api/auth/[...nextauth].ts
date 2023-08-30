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
      console.log(user, account, profile, email, credentials);
      return true;
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
