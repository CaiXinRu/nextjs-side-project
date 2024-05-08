"use client";
import "@locale/style/f2e-localswitcher.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const languages = [
  { key: "en", label: "English" },
  { key: "zh", label: "繁體中文" },
];

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <ul className="f2e-localswitcher">
      {languages.map(({ key, label }) => (
        <li key={key}>
          <Link locale={key} href={redirectedPathName(key)}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
