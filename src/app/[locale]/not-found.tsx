import { Link } from "@lib/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("not-found-title")}</h1>
      <Link href="/main">{t("not-found-return")}</Link>
    </div>
  );
}
