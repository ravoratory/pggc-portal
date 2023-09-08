import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { Client, cacheExchange, fetchExchange } from "urql";

/**
 * Get GraphQL Client in browser environments (frontend).
 *
 * If the user has an active session, it will add an accessToken to all requests
 */
const useClient = (options?: RequestInit) => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  // const handleError = useErrorHandler();

  return useMemo(() => {
    const client = new Client({
      url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      exchanges: [cacheExchange, fetchExchange],
      fetchOptions: () => ({
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          ...options?.headers,
        },
      }),
    });

    return client;
  }, [options, token]);
};

export default useClient;
