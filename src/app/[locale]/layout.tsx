import { routing } from '@i18n/routing';
import LocaleSwitcher from "@locale/components/LocalSwitcher";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter } from "next/font/google";
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(){
  const t = await getTranslations();
  return {
    title: `${t("web-title")}`,
    description:
      "Let's travel around Taiwan! Explore this beautiful island through this website and discover the myriad attractions and destinations it has to offer.",
  };
}
// export const metadata: Metadata = {
//   title: `${t("web-title")}`,
//   description:
//     "Let's travel around Taiwan! Explore this beautiful island through this website and discover the myriad attractions and destinations it has to offer.",
// };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

// const RootLayout = (props: Props) => {
//   const params = use(props.params);

//   const {
//     locale
//   } = params;

//   const {
//     children
//   } = props;

//   const messages = useMessages();
//   unstable_setRequestLocale(locale);
//   return (
//     <html lang={locale}>
//       <body className={inter.className}>
//         <LocaleSwitcher />
//         <NextIntlClientProvider messages={messages}>
//           {children}
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// };

// export default RootLayout;
export default async function RootLayout({
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
    <html lang={locale}>
      <body className={inter.className}>
      <LocaleSwitcher />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
