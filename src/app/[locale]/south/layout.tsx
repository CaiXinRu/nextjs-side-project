import SouthHeader from "@/src/app/[locale]/south/components/Header";
import { locales } from "@lib/config";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | The South in Taiwan",
    default: "The South in Taiwan",
  },
  openGraph: {
    title: "The South in Taiwan",
    description:
      "Let's travel around Taiwan! Explore the morth in Taiwan through this website and discover the myriad attractions and destinations it has to offer.",
  },
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    languages: {
      en: "/en/south",
      zh: "/zh/south",
    },
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: { locale: string } };

export default function SouthLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();
  unstable_setRequestLocale(locale);

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <SouthHeader />
        <main>{children}</main>
      </NextIntlClientProvider>
    </>
  );
}
