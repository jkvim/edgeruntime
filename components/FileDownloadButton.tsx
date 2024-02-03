import { saveAs } from "file-saver";
import { useTranslations } from "next-intl";

type Props = {
  fileName: string;
  content: string;
}

export const FileDownloadButton = ({ fileName, content }: Props) => {
  const t = useTranslations('FileDownloadButton')
  return (
    <div className="form-control items-start w-auto max-w-xs">
      <label className="label">
        <span className="label-text">{t('label')}</span>
      </label>
      <button
        className="btn btn-primary"
        onClick={() => {
          saveAs(new Blob([content], { type: "text/plain;charset=utf-8" }), fileName)
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="-5 -5 24 24"
          width="24"
        >
          <path d="M8 6.641l1.121-1.12a1 1 0 0 1 1.415 1.413L7.707 9.763a.997.997 0 0 1-1.414 0L3.464 6.934A1 1 0 1 1 4.88 5.52L6 6.641V1a1 1 0 1 1 2 0v5.641zM1 12h12a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2z"></path>
        </svg>
      </button>

    </div>
  )
}