import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/sidebar.css";
import Layout from "../components/Layout";
import UserContextProvider from "../context/UserContext";

// <SessionProvider session={pageProps.session}>    </SessionProvider>
const queryClient = new QueryClient();
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserContextProvider>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Layout>
    </UserContextProvider>
  );
};

export default App;
