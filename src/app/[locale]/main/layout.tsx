import MainHeader from "@/src/app/[locale]/main/components/Header";
import { routing } from '@i18n/routing';
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from 'next/navigation';
import React from "react";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: {
      template: `%s | ${t("web-title")}`,
      default: `${t("web-title")}`,
    },
    openGraph: {
      title: `${t("web-title")}`,
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
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function MainLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
// Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  setRequestLocale(locale);

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <MainHeader />
        <main>{children}</main>
      </NextIntlClientProvider>
    </>
  );
}
