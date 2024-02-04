import cn from 'classnames';
import { CodeBlock, atomOneDark } from 'react-code-blocks';
import { CopyBlockProps } from 'react-code-blocks/dist/components/CopyBlock';
import { CodeBlockTheme } from 'react-code-blocks/dist/types';
import toast from 'react-hot-toast';
import styles from './CodeHighlightBlock.module.scss'
import { CopyIcon } from './Icons/CopyIcon';

type Props = {
  wrapLongLines?: boolean;
  copy?: boolean;
  className?: string;
  hideCopyButton?: boolean;
  background?: string;
  isTransparent?: boolean
} & CopyBlockProps;

export default function CodeHighlightBlock({ wrapLongLines = false, copy, text, language, className, highlight, theme = atomOneDark, hideCopyButton, background, isTransparent }: Props) {
  const themeWithTransrapentBackground = (currentTheme: CodeBlockTheme = atomOneDark) => (
    {
      ...currentTheme,
      backgroundColor: 'transparent',
      lineNumberBgColor: 'transparent',
      flex: 1,
    }
  )

  const opacityStyle = isTransparent ? {
    backgroundColor: 'rgb(0, 0, 0)', opacity: 0.7, backdropFilter: 'blur(10px)'
  } : {
    backgroundColor: theme?.backgroundColor
  }

  const handleClick = () => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  }

  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-0 w-full rounded-lg not-prose",
        background && "p-8",
      )}
      style={{ background }}
    >
      <div className="flex gap-2 opacity-90 px-2 py-3 rounded-t-lg bg-gray-900 bg-opacity-90 shadow-sm relative">
        <div className="dot bg-[#FF6057] border-[#E14640] inline-block w-[10px] h-[10px] rounded-full"></div>
        <div className="dot bg-[#FFBD2E] border-[#DFA123] inline-block w-[10px] h-[10px] rounded-full"></div>
        <div className="dot bg-[#27C93F] border-[#1DAD2B] inline-block w-[10px] h-[10px] rounded-full"></div>
        <CopyIcon
          className="ml-auto text-neutral-300 active:opacity-5"
          width={16}
          height={16}
          onClick={handleClick}
        />
      </div>
      <div
        className={cn(
          "relative flex flex-1 w-full rounded-t-none rounded-b-lg overflow-hidden self-start p-0 m-0 shadow-xl",
          hideCopyButton && styles.hideCopyButton,
          className,
        )}
      >
        <div className="absolute inset-0" style={opacityStyle} />
        <CodeBlock
          customStyle={{
            display: "flex",
            flex: "1",
            borderRadius: "0",
            zIndex: "1",
          }}
          highlight={highlight}
          text={text}
          language={language}
          showLineNumbers={true}
          lineNumberContainerStyle={{ padding: 0 }}
          theme={themeWithTransrapentBackground(theme)}
          codeBlockStyle={{ width: "100%", height: "100%" }}
          wrapLongLines={wrapLongLines}
        />
      </div>
    </div>
  );
}
