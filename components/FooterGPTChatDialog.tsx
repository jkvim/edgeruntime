import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl";
import { GPTButton } from "./GPTButton"
import { HashIcon } from "./Icons/HashIcon"

type Props = {
  answer: string
  question: string
  link: string
  linkText?: string
}

export const FooterGPTChatDialog = ({answer, question, link, linkText}:Props) => {
  const t = useTranslations('FooterGPTChatDialog')
  return (
    <>
      <h2 className="flex items-center gap-2" id="use-with-gpt">
        <Link className="flex items-center" href="#use-with-gpt">
          <HashIcon />
        </Link>{" "}
        {t("title")}
      </h2>
      <div>
        <p className="m-0">Tag @Code Runner in any conversation to run code</p>
        <Image
          src="/images/chat-gpt.png"
          width={800}
          height={400}
          alt="GPT Chat"
        />
      </div>
      <GPTButton />
    </>
  );
}