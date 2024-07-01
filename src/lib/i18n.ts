import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "./config";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  const messages = {
    ...(await import(`@/messages/${locale}/1_global.json`)).default,
    ...(await import(`@/messages/${locale}/main-home.json`)).default,
    ...(await import(`@/messages/${locale}/north-home.json`)).default,
    ...(await import(`@/messages/${locale}/south-home.json`)).default,
    ...(await import(`@/messages/${locale}/middle-home.json`)).default,
    ...(await import(`@/messages/${locale}/east-home.json`)).default,
  };

  return {
    messages,
  };
});
