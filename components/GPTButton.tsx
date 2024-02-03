import Link from "next/link";
import { useTranslations } from "next-intl";
import { OFFICIAL_GPT_URL } from "@/constants/url";

export const GPTButton = ({ }) => {
  const t = useTranslations('GPTButton')
  return (
    <Link href={OFFICIAL_GPT_URL} target="_new" className="self-start">
      <button className="btn btn-primary">{t('cta')}</button>
    </Link>
  );
}