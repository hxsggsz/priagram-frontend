import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import { config, language } from "./prisma-language";
import css from "./editor.module.css";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { useDiagramStore } from "@/stores/useDiagramStore";

export const PrismaEditor = () => {
  const { fetch } = useDiagramStore();

  const handleChange = useDebouncedCallback((value: string | undefined) => {
    if (!value) return;
    fetch(value);
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
