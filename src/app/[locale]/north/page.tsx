import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

const NorthPage = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div>
      <h2>{t("north")}</h2>
    </div>
  );
};

export default NorthPage;
