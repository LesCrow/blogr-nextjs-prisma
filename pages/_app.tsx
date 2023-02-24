import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/sidebar.css";
import Layout from "../components/Layout";

const queryClient = new QueryClient();
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Layout>
    </SessionProvider>
  );
};

export default App;
