import { Link } from "@lib/navigation";
import { getTranslations } from "next-intl/server";

export default async function NorthHeader() {
  const t = await getTranslations();
  return (
    <header>
      <p>{t("north-header")}</p>
      <nav>
        <ul>
          <li>
            <Link href="/main">{t("home")}</Link>
          </li>
          <li>
            <Link href="/north/newpei">{t("newpei")}</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </header>
  );
}
