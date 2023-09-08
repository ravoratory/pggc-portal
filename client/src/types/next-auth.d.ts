import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessKey?: string;
    accessToken?: string;
    user: {
      team: {
        id: number;
        name: string;
      };
      role: string;
    };
  }
  interface Account {
    access_key?: string;
    access_token?: string;
  }
  interface Token {
    accessToken?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessKey?: string;
    accessToken?: string;
  }
}
