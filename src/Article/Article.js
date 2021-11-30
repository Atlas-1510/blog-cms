import React, { useState } from "react";
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/paste";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.min.css";
import { Editor } from "@tinymce/tinymce-react";

// https://dev.to/rafaaraujoo/how-to-setup-tinymce-react-4aka

function Article() {
  const [content, setContent] = useState();

  return (
    <div>
      <Editor
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
          skin: false,
          content_css: false,
          font_formats:
            "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Roboto=roboto; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap'); body { font-family: Roboto; }",
          height: 600,
          menubar: false,
          plugins: ["link image", "table paste"],
          toolbar:
            "undo redo | formatselect | fontselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",
        }}
        value={content}
        onEditorChange={(c) => setContent(c)}
      />
      <div className="flex justify-end my-4">
        <button className="nav-link bg-blue-400 text-white hover:text-white hover:bg-blue-500">
          Save
        </button>
        <button className="nav-link bg-emerald-400 text-white hover:text-white hover:bg-emerald-500">
          Save and publish
        </button>
        <button className="nav-link bg-red-400 text-white hover:text-white hover:bg-red-500">
          Discard
        </button>
      </div>
    </div>
  );
}

export default Article;
