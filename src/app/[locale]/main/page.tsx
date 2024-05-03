import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

const MainHomePage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div>
      <h2>{t("main-title")}</h2>
    </div>
  );
};

export default MainHomePage;
