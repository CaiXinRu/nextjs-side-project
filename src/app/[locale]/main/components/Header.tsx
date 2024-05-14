import { Link } from "@lib/navigation";
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
          <li>
            <Link href="/middle">{t("middle")}</Link>
          </li>
          <li>
            <Link href="/south">{t("south")}</Link>
          </li>
          <li>
            <Link href="/east">{t("east")}</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </header>
  );
}
