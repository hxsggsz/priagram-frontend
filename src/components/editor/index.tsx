import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { config, language } from "./prisma-language";
import css from "./editor.module.css";
import { useDebouncedCallback } from "../../hooks/useDebounce";

export const PrismaEditor = () => {
  const [editorValue, setEditorValue] = useState("");

  const handleChange = useDebouncedCallback((value: string | undefined) => {
    if (!value) return;
    setEditorValue(value);
    console.log(`[${new Date().toISOString()}]: index.tsx`, value);
  }, 500);

  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.languages.register({ id: "prisma" });
      monaco.languages.setLanguageConfiguration("prisma", config);
      monaco.languages.setMonarchTokensProvider("prisma", language);
    }
  }, [monaco]);

  return (
    <div className={css.editorWrapper}>
      <Editor
        key="prisma"
        language="prisma"
        // TODO: add dark theme
        // theme={resolvedTheme === "dark" ? "vs-dark" : "vs"}
        theme="vs"
        loading="Loading..."
        path="prisma"
        value={editorValue}
        onChange={handleChange}
        options={{
          minimap: { enabled: false },
          smoothScrolling: true,
          cursorSmoothCaretAnimation: "on",
          scrollBeyondLastLine: true,
        }}
      />
    </div>
  );
};
