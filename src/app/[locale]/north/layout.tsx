import NorthHeader from "@/src/app/[locale]/north/components/Header";
import { routing } from '@i18n/routing';
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | The North in Taiwan",
    default: "The North in Taiwan",
  },
  openGraph: {
    title: "The North in Taiwan",
    description:
      "Let's travel around Taiwan! Explore the morth in Taiwan through this website and discover the myriad attractions and destinations it has to offer.",
  },
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    languages: {
      en: "/en/north",
      zh: "/zh/north",
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function NorthLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  setRequestLocale(locale);

  return (
      <NextIntlClientProvider messages={messages}>
        <NorthHeader />
        <main>{children}</main>
      </NextIntlClientProvider>
  );
}
