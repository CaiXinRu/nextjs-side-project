import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
type Props = {
  params: { locale: string };
};

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("yilan"),
    metadataBase: new URL("http://localhost:3000"),
    alternates: {
      languages: {
        en: "/en/east/yilan",
        zh: "/zh/east/yilan",
      },
    },
  };
}

const Yilan = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <div>
        <h2>{t("yilan")}</h2>
      </div>
    </>
  );
};

export default Yilan;
