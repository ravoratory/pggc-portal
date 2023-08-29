import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

export default function PGritProvider(
  instance_url: string,
  options: OAuthUserConfig<Record<string, any>>,
): OAuthConfig<Record<string, any>> {
  return {
    id: "pgrit",
    name: "PGrit",
    type: "oauth",
    token: `${instance_url}/oauth/token`,
    authorization: {
      url: `${instance_url}/oauth/authorize`,
      params: { scope: "read" },
    },
    userinfo: `${instance_url}/api/v1/accounts/verify_credentials`,
    profile(profile) {
      return {
        id: profile.id,
        name: profile.username,
        display_name: profile.display_name,
      };
    },
    options,
  };
}
