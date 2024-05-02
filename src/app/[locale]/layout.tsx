import { locales } from "@lib/config";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tourist Attractions in Taiwan",
  description:
    "Let's travel around Taiwan! Explore this beautiful island through this website and discover the myriad attractions and destinations it has to offer.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: { locale: string } };

const RootLayout = ({ children, params: { locale } }: Props) => {
  const messages = useMessages();
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
