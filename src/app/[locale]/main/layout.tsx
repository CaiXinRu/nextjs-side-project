import MainHeader from "@/src/app/[locale]/main/components/Header";
import type { Metadata } from "next";
import React from "react";
// import MainFooter from '@/src/app/[locale]/main/components/Footer'
import { locales } from "@lib/config";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: {
    template: "%s | Tourist Attractions in Taiwan",
    default: "Tourist Attractions in Taiwan",
  },
  openGraph: {
    title: "Tourist Attractions in Taiwan",
    description:
      "Let's travel around Taiwan! Explore this beautiful island through this website and discover the myriad attractions and destinations it has to offer.",
  },
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    languages: {
      en: "/en/main",
      zh: "/zh/main",
    },
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: { locale: string } };

export default function MainLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();
  unstable_setRequestLocale(locale);

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <MainHeader />
        <main>{children}</main>
      </NextIntlClientProvider>
    </>
  );
}
