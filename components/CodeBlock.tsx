import { FC } from "react";
import cn from "classnames";
import { Extension } from "@codemirror/state";
import { atomone } from "@uiw/codemirror-theme-atomone";
import CodeMirror from "@uiw/react-codemirror";
import styles from "./CodeBlock.module.scss";

interface Props {
  code?: string;
  editable?: boolean;
  extensions?: Extension[];
  language?: string;
  editorClassName?: string;
  onChange?: (value: string) => void;
}

export const CodeBlock: FC<Props> = ({
  code,
  editable = false,
  language,
  editorClassName,
  extensions = [],
  onChange = () => {},
}) => {
  return (
    <div className="relative w-full h-full rounded-lg">
      <div
        className={cn(
          " rounded-lg overflow-auto h-full w-full",
          editorClassName,
        )}
      >
        <CodeMirror
          className={styles.editor}
          lang={language}
          editable={editable}
          value={code}
          minHeight="100%"
          extensions={extensions}
          theme={atomone}
          onChange={(value) => onChange(value)}
        />
      </div>
    </div>
  );
};
