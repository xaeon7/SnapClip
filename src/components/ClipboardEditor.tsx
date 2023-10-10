/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import React from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { materialDarkInit } from "@uiw/codemirror-theme-material";

import { detectLanguage } from "@/utils/detectLanguage";
import { useDebounce } from "@/hooks/useDebounce";

// https://github.com/FurqanSoftware/codemirror-languageserver

const markdownExtension = markdown({
  base: markdownLanguage,
  codeLanguages: languages,
});

interface ClipboardProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  editable: boolean;
  placeholder: string;
}

export default function ClipboardEditor({
  code,
  editable,
  setCode,
  setLanguage,
  placeholder,
}: ClipboardProps) {
  const [languageExtension, setLanguageExtension] =
    React.useState(markdownExtension);
  const debouncedValue = useDebounce<string>(code, 500);

  React.useEffect(() => {
    async function loadLanguage() {
      const detectedLanguage = detectLanguage(code);

      const lang = languages.find(
        (lang) =>
          lang.name === detectedLanguage ||
          lang.alias.includes(detectedLanguage),
      );

      if (detectedLanguage === "markdown" || !lang) {
        setLanguage("markdown");
        if (!editable) setLanguageExtension(markdownExtension);
        return;
      }

      const languageExtension = await lang.load();
      if (languageExtension) {
        setLanguage(lang.name);
        if (!editable) setLanguageExtension(languageExtension);
      }
    }
    void loadLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="h-full overflow-y-auto">
      <CodeMirror
        theme={materialDarkInit({
          settings: {
            background: "#141324",
            lineHighlight: "#26234760",
            fontFamily: "Hack NFM, consolas, monospace",
            gutterBackground: "#141324",
            gutterActiveForeground: "#A4A1C8",
            gutterForeground: "#262347",
            selection: "#24a2fc40",
            selectionMatch: "#24a2fc60",
          },
        })}
        value={code}
        onChange={setCode}
        height="100%"
        width="100%"
        extensions={
          !editable
            ? [languageExtension, EditorView.lineWrapping]
            : [EditorView.lineWrapping]
        }
        className=""
        placeholder={placeholder}
        autoFocus={true}
        editable={editable}
      />
    </div>
  );
}
