import { ReactNode } from "react"
import cn from "classnames";
import Head from "next/head";
import { useTranslations } from "next-intl";

type Props = {
  title: string
  children: ReactNode
  descption?: string
}

type FooterProps = {
  children: ReactNode
  className?: string
}

const Footer = ({children}: FooterProps) => {
  return (
    <div className="prose flex w-full min-w-full flex-col sm:flex-row items-start justify-center gap-8 mt-20">
      {children}
    </div>
  )
}

type BodyProps = FooterProps
type InputProps = FooterProps
type OutputProps = FooterProps
type BottomCTAProps = FooterProps
type EditorProps = FooterProps

const Input = ({children}: InputProps) => {
  const t = useTranslations('Layout')
  return (
    <div className="relative flex flex-col justify-stretch items-stretch w-editor">
      <div className="text-center text-xl font-bold mb-2">{t('input')}</div>
      {children}
    </div>
  )
}

const Output = ({children}: OutputProps) => {
  const t = useTranslations('Layout')
  return (
    <div className="relative flex flex-col justify-stretch items-stretch w-editor">
      <div className="text-center text-xl font-bold mb-2">{t('output')}</div>
      {children}
    </div>
  )
}

const FooterLeft = ({children}: InputProps) => {
  return (
    <div className="relative flex flex-col justify-start items-stretch w-editor">
      {children}
    </div>
  )
}

const FooterRight = ({children}: OutputProps) => {
  return (
    <div className="relative flex flex-col justify-start items-stretch w-editor">
      {children}
    </div>
  )
}

const Body = ({ children }: BodyProps) => {
  return (
    <div className="mt-6 flex w-full flex-col sm:flex-row items-start justify-center gap-8">
      {children}
    </div>
  )
}

export const Layout = ({children, title, descption}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {descption && <meta name="description" content={descption}/>}
      </Head>
    <div className="flex h-full min-h-screen flex-col items-center px-4 pb-20 sm:px-10">
      <div className="mt-10 mb-10 flex flex-col items-center justify-center sm:mt-20">
        <div className="text-4xl font-bold gradient-text leading-normal">{title}</div>
      </div>

      {children}
    </div>
    </>
  )
}

export const BottomCTA = ({children}: BottomCTAProps) => {
  return <div className="flex flex-wrap justify-start items-start gap-4 mt-8">{children}</div>
}

export const Editor = ({children, className}: EditorProps) => {
  return <div className={cn("flex w-editor h-editor justify-center items-start", className)}>{children}</div>
}

Layout.Footer = Footer
Layout.FooterLeft = FooterLeft
Layout.FooterRight = FooterRight
Layout.Body = Body
Layout.Input = Input
Layout.Output = Output
Layout.Editor = Editor
Layout.BottomCTA = BottomCTA
