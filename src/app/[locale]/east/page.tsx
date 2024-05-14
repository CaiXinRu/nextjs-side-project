import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

const EastPage = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div>
      <h2>{t("east")}</h2>
    </div>
  );
};

export default EastPage;
