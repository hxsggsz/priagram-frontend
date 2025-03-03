import { Editor, OnMount, useMonaco } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { config, language } from "./prisma-language";
import css from "./editor.module.css";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { useDiagramStore } from "@/stores/useDiagramStore";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { editor } from "monaco-editor";

export const PrismaEditor = () => {
  const { fetch } = useDiagramStore();

  const [editorValue, setEditorValue] = useLocalStorage("@editor", "");

  const monaco = useMonaco();

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleChange = useDebouncedCallback(
    async (value: string | undefined) => {
      if (!value) return;
      setEditorValue(value);
      fetch(value);
    },
    500
  );

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    setTimeout(() => {
      editor.setValue(editor.getValue());
      editor.layout();
    }, 0);
  };

  useEffect(() => {
    if (monaco) {
      monaco.languages.register({ id: "prisma" });
      monaco.languages.setLanguageConfiguration("prisma", config);
      monaco.languages.setMonarchTokensProvider("prisma", language);

      if (editorRef.current) {
        const model = editorRef.current.getModel();
        model?.setValue(model.getValue());
      }
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
        defaultLanguage="prisma"
        value={editorValue}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          smoothScrolling: true,
          cursorSmoothCaretAnimation: "on",
          scrollBeyondLastLine: true,
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
        }}
      />
    </div>
  );
};
