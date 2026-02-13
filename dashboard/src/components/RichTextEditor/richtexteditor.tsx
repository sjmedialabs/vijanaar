import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface RichTextEditorProps {
  value: string; // Current field value
  onChange: (value: string) => void; // Callback to update parent state
  charLimit?: number; // Optional character limit
  placeholder?: string;
  toolbarItems?: string[];
  disabled?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  charLimit = 150,
  placeholder,
  toolbarItems = ["bold", "italic", "link", "bulletedList", "numberedList", "blockQuote"],
  disabled = false,
}) => {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const textOnly = value.replace(/<[^>]*>/g, "").trim();
    setCharCount(textOnly.length);
  }, [value]);

  return (
    <div className="rich-text-editor">
      <CKEditor
        editor={ClassicEditor as any}
        data={value}
        disabled={disabled}
        onReady={(editor: any) => {
          if (disabled) {
            editor.enableReadOnlyMode("disabled-mode");
          }
        }}
        onChange={(_, editor) => {
          if (disabled) return;
          let data = editor.getData();
          const textOnly = data.replace(/<[^>]*>/g, "").trim();

          if (textOnly.length <= charLimit) {
            onChange(data);
            setCharCount(textOnly.length);
          } else {
            const truncatedText = textOnly.slice(0, charLimit);
            const tempDiv = document.createElement("div");
            tempDiv.textContent = truncatedText;
            data = tempDiv.innerHTML;
            onChange(data);
            setCharCount(charLimit);
          }
        }}
        config={{
          placeholder,
          toolbar: toolbarItems,
        }}
      />

      <p
        style={{
          fontSize: "12px",
          marginTop: "4px",
          color: charCount >= charLimit ? "red" : "#666",
          textAlign: "right",
        }}
      >
        Characters Limit: {charCount}/{charLimit}
      </p>
    </div>
  );
};

export default RichTextEditor;
