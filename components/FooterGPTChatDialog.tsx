import Link from "next/link"
import { useTranslations } from "next-intl";
import { baseUrl } from "@/constants/url"
import { GPTButton } from "./GPTButton"
import { HashIcon } from "./Icons/HashIcon"
import { UserIcon } from "./Icons/UserIcon"

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
        </Link>{' '}
        {t('title')}
      </h2>
      <div className="flex flex-col gap-4 items-start mb-8">
        <div className="chat chat-start">
          <div className="chat-image avatar placeholder">
            <div className="flex justify-center items-center w-10 rounded-full gradient-background">
              <UserIcon className="text-accent-content" />
            </div>
          </div>
          <div className="chat-bubble chat-bubble-primary max-w-full">{question}</div>
        </div>

        <div className="chat chat-start">
          <div className="chat-image avatar placeholder">
            <div className="gradient-background text-accent-content rounded-full w-10">
              <span className="text-lg">AI</span>
            </div>
          </div>
          <div className="chat-bubble chat-bubble-primary">{answer} <Link href={`${baseUrl}${link}`} className="text-blue-500" target="_new">{linkText ?? t('view-link')}</Link>.</div>
        </div>
      </div>
      <GPTButton />
    </>
  )
}