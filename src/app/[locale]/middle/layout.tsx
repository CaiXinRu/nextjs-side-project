import MiddleHeader from "@/src/app/[locale]/middle/components/Header";
import { locales } from "@lib/config";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | The Middle in Taiwan",
    default: "The Middle in Taiwan",
  },
  openGraph: {
    title: "The Middle in Taiwan",
    description:
      "Let's travel around Taiwan! Explore the middle in Taiwan through this website and discover the myriad attractions and destinations it has to offer.",
  },
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    languages: {
      en: "/en/middle",
      zh: "/zh/middle",
    },
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: { locale: string } };

export default function MiddleLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();
  unstable_setRequestLocale(locale);

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <MiddleHeader />
        <main>{children}</main>
      </NextIntlClientProvider>
    </>
  );
}
