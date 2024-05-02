import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "./config";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  const messages = {
    ...(await import(`@/messages/${locale}/1_global.json`)).default,
  };

  return {
    messages,
  };
});