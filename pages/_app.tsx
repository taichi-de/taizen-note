import { useEffect } from "react";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import * as gtag from "../utils/gtag";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { MantineProvider } from "@mantine/core";
import { RecoilRoot } from "recoil";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <RecoilRoot>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </RecoilRoot>
  );
};

export default App;
