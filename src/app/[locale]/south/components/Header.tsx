import { Link } from "@lib/navigation";
import { getTranslations } from "next-intl/server";

export default async function SouthHeader() {
  const t = await getTranslations();
  return (
    <header>
      <p>{t("south-header")}</p>
      <nav>
        <ul>
          <li>
            <Link href="/main">{t("home")}</Link>
          </li>
          <li>
            <Link href="/south/chiayi">{t("chiayi")}</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </header>
  );
}
