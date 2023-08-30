/* eslint-disable import/no-extraneous-dependencies */
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";

const client = new Client({
  url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  exchanges: [cacheExchange, fetchExchange]
})

const App = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider
    session={session}
    // Re-fetch session every 5 minutes
    refetchInterval={5 * 60}
  >
    <Provider value={client}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />

      <Component {...pageProps} />
      <Analytics />
    </Provider>
  </SessionProvider>
);

export default App;
