import { getTranslations, setRequestLocale } from "next-intl/server";

const MainHomePage = async (
  props: {
    params: Promise<{ locale: string }>;
  }
) => {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div>
      <h2>{t("main-title")}</h2>
    </div>
  );
};

export default MainHomePage;
