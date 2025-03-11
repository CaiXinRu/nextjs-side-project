import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

const NorthPage = async (props: Props) => {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div>
      <h2>{t("north")}</h2>
    </div>
  );
};

export default NorthPage;
