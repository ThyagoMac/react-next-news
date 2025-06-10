import ExameTool from "@/utils/ExameTool";
import MedicamentoTool from "@/utils/MedicamentoTool";
import React, { useEffect, useRef } from "react";

//let EditorJS;

const Editor = ({ onSave }) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@editorjs/editorjs").then(({ default: Editor }) => {
        import("@editorjs/header").then(({ default: Header }) => {
          import("@editorjs/list").then(({ default: List }) => {
            if (!editorRef.current) return;

            editorInstance.current = new Editor({
              holder: editorRef.current,
              autofocus: true,
              tools: {
                header: Header,
                list: List,
                medicamento: MedicamentoTool,
                exames: ExameTool,
              },
              onChange: async () => {
                const content = await editorInstance.current.save();
                if (onSave) {
                  onSave(content);
                }
              },
            });
          });
        });
      });
    }

    return () => {
      editorInstance.current?.destroy();
      editorInstance.current = null;
    };
  }, []);

  return <div id="editorjs" ref={editorRef} />;
};

export default Editor;
