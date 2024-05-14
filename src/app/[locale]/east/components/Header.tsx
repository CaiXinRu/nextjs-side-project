import { Link } from "@lib/navigation";
import { getTranslations } from "next-intl/server";

export default async function EastHeader() {
  const t = await getTranslations();
  return (
    <header>
      <p>{t("east-header")}</p>
      <nav>
        <ul>
          <li>
            <Link href="/main">{t("home")}</Link>
          </li>
          <li>
            <Link href="/east/yilan">{t("yilan")}</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </header>
  );
}
