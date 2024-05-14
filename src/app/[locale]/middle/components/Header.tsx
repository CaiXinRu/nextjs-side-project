import { Link } from "@lib/navigation";
import { getTranslations } from "next-intl/server";

export default async function MiddleHeader() {
  const t = await getTranslations();
  return (
    <header>
      <p>{t("middle-header")}</p>
      <nav>
        <ul>
          <li>
            <Link href="/main">{t("home")}</Link>
          </li>
          <li>
            <Link href="/middle/miaoli">{t("miaoli")}</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </header>
  );
}
