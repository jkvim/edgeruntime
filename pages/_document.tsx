import { Html, Head, Main, NextScript, DocumentProps } from "next/document";
import Link from "next/link";
import { baseUrl } from "@/constants/url";

export default function Document({ __NEXT_DATA__ }: DocumentProps) {
  const { locale } = __NEXT_DATA__;

  return (
    <Html lang={locale}>
      <Head>
        <Link rel="alternate" hrefLang="zh-Hans" href={`${baseUrl}/zh-Hans`} />
        <Link rel="alternate" hrefLang="zh-Hant" href={`${baseUrl}/zh-Hant`} />
        <Link rel="alternate" hrefLang="de" href={`${baseUrl}/de`} />
        <Link rel="alternate" hrefLang="ru" href={`${baseUrl}/ru`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
