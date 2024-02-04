import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import cn from "classnames";
import { useTranslations } from "next-intl";
import { CodeBlock } from "@/components/CodeBlock";
import CodeHighlightBlock from "@/components/CodeHighlightBlock";
import { HashIcon } from "@/components/Icons/HashIcon";
import { Layout } from "@/components/Layout";
import { HTMLExample } from "@/constants/examples";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { HTMLContent } from "@/types/types";
import { CDNSearchBar } from "./CDNSearchBar";
import { FooterGPTChatDialog } from "../FooterGPTChatDialog";
import { FileDownloadButton } from "../FileDownloadButton";
import { ChevronUp } from "../Icons/ChevronUp";
import { BanIcon } from "../Icons/BanIcon";
import { ChevronDown } from "../Icons/ChevronDown";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";

type Props = {
  data?: HTMLContent;
};

export default function HTMLPreview({ data }: Props) {
  const { htmlContent, setHTMLContent } = useGlobalContext();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [activeTab, setActiveTab] = useState("html");
  const t = useTranslations("Html");
  const [errors, setErrors] = useState<string[]>([]);
  const [isShowError, setIsShowError] = useState(false);

  useEffect(() => {
    if (data) setHTMLContent(data);
  }, [data, setHTMLContent]);

  useEffect(() => {
    if (iframeRef.current) {
      injectCode(iframeRef.current, htmlContent, (error: string) => {
        if (error) {
          setErrors((errors) => [...errors, error]);
        }
      });
    }
  }, [htmlContent]);

  useEffect(() => {
    window.addEventListener("message", function (event) {
      if (event.data.type === "error") {
        console.log('message', event.data.message);
        
        setErrors((errors) => [...errors, event.data.message]);
      }
    });

    injectCaptureError(iframeRef.current);
  }, []);

  return (
    <Layout title={t("title")} descption={t("description")}>
      <Layout.Body>
        <Layout.Input>
          <div role="tablist" className="tabs tabs-bordered">
            <a
              role="tab"
              className={cn(
                "tab ml-2 mb-1",
                activeTab === "html" && "tab-active",
              )}
              onClick={() => setActiveTab("html")}
            >
              HTML
            </a>
            <div role="tabpanel" className="tab-content rounded-box">
              <Layout.Editor>
                <CodeBlock
                  editable
                  code={htmlContent.html}
                  language="html"
                  extensions={[html()]}
                  onChange={(value: string) => {
                    setHTMLContent({ ...htmlContent, html: value });
                  }}
                />
              </Layout.Editor>
            </div>

            <a
              role="tab"
              className={cn("tab mb-1", activeTab === "css" && "tab-active")}
              onClick={() => setActiveTab("css")}
            >
              CSS
            </a>
            <div role="tabpanel" className="tab-content rounded-box">
              <Layout.Editor>
                <CodeBlock
                  editable
                  code={htmlContent.css}
                  language="css"
                  extensions={[css()]}
                  onChange={(value: string) => {
                    setHTMLContent({ ...htmlContent, css: value });
                  }}
                />
              </Layout.Editor>
            </div>
            <a
              role="tab"
              className={cn("tab mb-1", activeTab === "js" && "tab-active")}
              onClick={() => setActiveTab("js")}
            >
              JavaScript
            </a>
            <div role="tabpanel" className="tab-content rounded-box">
              <Layout.Editor>
                <CodeBlock
                  editable
                  language="javascript"
                  code={htmlContent.js}
                  extensions={[javascript()]}
                  onChange={(value: string) => {
                    setHTMLContent({ ...htmlContent, js: value });
                  }}
                />
              </Layout.Editor>
            </div>
          </div>

          <Layout.BottomCTA>
            <FileDownloadButton
              fileName="demo.html"
              content={htmlContent.html ?? ""}
            />
            <CDNSearchBar />
          </Layout.BottomCTA>
        </Layout.Input>
        <Layout.Output>
          <Layout.Editor className="mt-9">
            <div className="w-full h-full flex-1 border border-purple-800 rounded-lg overflow-hidden">
              <iframe
                sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation"
                allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write;"
                ref={iframeRef}
                className="w-full h-full"
              />
              {errors.length > 0 && !isShowError && (
                <div className="absolute flex bottom-0 left-1 right-1 h-auto p-2 text-error border-t-[1px]">
                  Some errors happened({errors.length}){" "}
                  <ChevronUp
                    onClick={() => setIsShowError(true)}
                    className="cursor-pointer ml-auto text-gray-700"
                  />{" "}
                  <BanIcon
                    onClick={() => {
                      setErrors([])
                      setIsShowError(false)
                    }}
                    className="cursor-pointer text-gray-700 ml-2"
                  />
                </div>
              )}
              {errors.length > 0 && isShowError && (
                <div className="absolute flex flex-col bottom-0 left-1 right-1 h-56 text-error border-t-[1px]">
                  <div className="flex justify-end gap-2 border-b-[1px] mb-2 items-center p-1">
                    <ChevronDown
                      onClick={() => setIsShowError(false)}
                      className="cursor-pointer ml-auto text-gray-700"
                    />{" "}
                    <BanIcon
                      onClick={() => {
                        setErrors([])
                        setIsShowError(false)
                      }}
                      className="cursor-pointer text-gray-700 ml-2"
                    />
                  </div>
                  <div className="max-h-full overflow-auto">
                    {errors.map((error, index) => (
                      <div
                        key={`${error}_${index}`}
                        className="border-b-[1px] p-1 last:border-0"
                      >
                        {error}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Layout.Editor>
        </Layout.Output>
      </Layout.Body>

      <Layout.Footer>
        <Layout.FooterLeft>
          <h2 className="flex items-center gap-2" id="reference">
            <Link className="flex items-center" href="#reference">
              <HashIcon />
            </Link>{" "}
            {t("reference-link")}
          </h2>
          <ul>
            <li>
              <Link
                href="https://tailwindcss.com/docs/installation"
                target="_blank"
              >
                Tailwind CSS Doc
              </Link>
            </li>
          </ul>
          <h2 className="flex items-center gap-2" id="example">
            <Link className="flex items-center" href="#example">
              <HashIcon />
            </Link>{" "}
            {t("example")}
          </h2>
          <CodeHighlightBlock
            text={HTMLExample}
            language="html"
            className="w-editor"
            copy
          />
        </Layout.FooterLeft>

        <Layout.FooterRight>
          <FooterGPTChatDialog
            question={t("chat.question")}
            link="/html/J2Iqnz20N9YS"
            answer={t("chat.answer")}
            linkText={t("chat.view-link")}
          />
        </Layout.FooterRight>
      </Layout.Footer>
    </Layout>
  );
}

async function injectCode(
  el?: HTMLIFrameElement,
  htmlContent?: HTMLContent,
  handleError?: (error: string) => void,
) {
  if (!el) return;

  await injectHTML(el, htmlContent?.html, handleError);
  injectCSS(el, htmlContent?.css);
  injectJS(el, htmlContent?.js);
  injectTaliwindStyle(el);
}

function injectTaliwindStyle(el?: HTMLIFrameElement) {
  if (!el) return;
  const links = el.getElementsByTagName("link") ?? [];
  const document = el.contentDocument;
  const hasInjectTaliwindLink = Array.from(links).some((link) => {
    return link.href.includes("tailwind");
  });
  if (!hasInjectTaliwindLink && document) {
    const link = document.createElement("link");
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css";
    link.rel = "stylesheet";
    document.head?.appendChild(link);
  }
}

function injectCSS(el?: HTMLIFrameElement, css?: string) {
  if (!el) return;
  const document = el.contentDocument;
  if (document) {
    const allStyles = document.getElementsByTagName("style");
    // remove all styles
    Array.from(allStyles).forEach((style) => {
      style.remove();
    });
    if (css) {
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css ?? ""));
      document.head.appendChild(style);
    }
  }
}

function injectJS(el?: HTMLIFrameElement, js?: string) {
  if (!el) return;
  const document = el.contentDocument;

  if (document) {
    // Check if the script already exists and remove it
    const existingScript = document.getElementById("playground-script");
    if (existingScript) {
      existingScript.remove();
    }

    if (js) {
      // Create a new script element
      const script = document.createElement("script");
      script.id = "playground-script";

      // Wrap the JS code in an IIFE to avoid polluting the global namespace
      const wrappedJs = `(function() { ${js ?? ""} })();`;

      // Add the wrapped JS code to the script element
      script.appendChild(document.createTextNode(wrappedJs));

      // Append the script to the body of the iframe's document
      document.body.appendChild(script);
    }
  }
}

function injectCaptureError(el: HTMLIFrameElement | null) {
  if (!el) return;
  const document = el.contentDocument;

  if (document) {
    const existingScript = document.getElementById("catpure-error");
    if (existingScript) {
      return
    }
    const script = document.createElement("script");
    script.id = "capture-error";
    script.appendChild(
      document.createTextNode(`
        window.addEventListener('error', function(e) {
          window.parent.postMessage({ type: 'error', message: e.message }, '*');
        });
      `),
    );
    document.body.appendChild(script);
  }
  
}

async function injectHTML(
  el?: HTMLIFrameElement,
  html?: string,
  handleError?: (error: string) => void,
) {
  if (!el) return;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html ?? "", "text/html");
  const iframeDocument = el.contentDocument;
  if (iframeDocument) {
    // Clear the existing content
    iframeDocument.head.innerHTML = "";
    iframeDocument.body.innerHTML = "";

    await cloneNodes(doc, iframeDocument, true, handleError);
    await cloneNodes(doc, iframeDocument, false, handleError);
  }
}

const cloneNodes = async (
  doc: Document,
  iframeDoc: Document,
  cloneHead?: boolean,
  handleError?: (error: string) => void,
) => {
  const nodes = Array.from(
    cloneHead ? doc.head.childNodes : doc.body.childNodes,
  );

  for (const node of nodes) {
    const newNode = iframeDoc.importNode(node, true);
    let insertNode: ChildNode | null = null;
    if (newNode.nodeName === "SCRIPT") {
      // Create a new script node rather than importing the node directly
      const originalScript = node as HTMLScriptElement;
      const script = iframeDoc.createElement("script");
      if (originalScript.src) {
        script.src = originalScript.src;
        try {
          await fetch(script.src).then(async (response) => {
            if (!response.ok) {
              throw response.text();
            }
          });
        } catch (error) {
          const errorText = await error as string;
          handleError?.(errorText);
        }
      } else {
        script.text = `(function() {${originalScript.text}})()`;
      }
      insertNode = script;
    } else {
      insertNode = newNode;
    }

    if (cloneHead) {
      iframeDoc.head.appendChild(insertNode);
    } else {
      iframeDoc.body.appendChild(insertNode);
    }
  }
};
