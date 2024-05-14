import EastHeader from "@/src/app/[locale]/east/components/Header";
import { locales } from "@lib/config";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | The East in Taiwan",
    default: "The East in Taiwan",
  },
  openGraph: {
    title: "The East in Taiwan",
    description:
      "Let's travel around Taiwan! Explore the east in Taiwan through this website and discover the myriad attractions and destinations it has to offer.",
  },
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    languages: {
      en: "/en/east",
      zh: "/zh/east",
    },
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: { locale: string } };

export default function EastLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();
  unstable_setRequestLocale(locale);

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <EastHeader />
        <main>{children}</main>
      </NextIntlClientProvider>
    </>
  );
}
