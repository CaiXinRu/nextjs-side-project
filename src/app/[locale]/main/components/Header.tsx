import { Link } from "@i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function MainHeader() {
  const t = await getTranslations();
  return (
    <header>
      <p>{t("main-header")}</p>
      <nav>
        <ul>
          <li>
            <Link href="/main">{t("home")}</Link>
          </li>
          <li>
            <Link href="/north">{t("north")}</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </header>
  );
}
