/* eslint-disable import/no-extraneous-dependencies */
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import GraphqlProvider from "@/providers/graphql";
import themeOptions from "@/theme/color";

const App = ({ Component, pageProps }: AppProps) => (
  <SessionProvider
    session={pageProps.session}
    // Re-fetch session every 5 minutes
    refetchInterval={5 * 60}
  >
    <GraphqlProvider>
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
      <ThemeProvider theme={createTheme(themeOptions)}>
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
    </GraphqlProvider>
  </SessionProvider>
);

export default App;
