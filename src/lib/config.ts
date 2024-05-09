import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "zh"] as const;

export const pathnames = {
  "/main": "/main",
  "/north": "/north",
  "/middle": "/middle",
  "/south": "/south",
  "/east": "/east",
} satisfies Pathnames<typeof locales>;

export const localePrefix = "always";

export type AppPathnames = keyof typeof pathnames;
