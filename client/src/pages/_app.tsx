/* eslint-disable import/no-extraneous-dependencies */
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const App = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider
    session={session}
    // Re-fetch session every 5 minutes
    refetchInterval={5 * 60}
  >
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
  </SessionProvider>
);

export default App;
