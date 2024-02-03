import classNames from "classnames";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { useRouter } from "next/router";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { GlobalContextProvider, useGlobalContext } from "@/hooks/useGlobalContext";

import "@/styles/globals.scss";
import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

function Root(props: AppProps<{ messages: AbstractIntlMessages }>) {
  return (
    <GlobalContextProvider>
      <App {...props} />
    </GlobalContextProvider>
  );
}

function App({ Component, pageProps }: AppProps<{ messages: AbstractIntlMessages }>) {
  const { theme } = useGlobalContext();
  const { locale } = useRouter()

  return (
    <NextIntlClientProvider locale={locale} messages={pageProps.messages} timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main
        data-theme={theme}
        className={classNames(inter.className, "min-h-screen flex flex-col")}
      >
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
        <Footer />
      </main>
    </NextIntlClientProvider>
  );
}

export default Root;
