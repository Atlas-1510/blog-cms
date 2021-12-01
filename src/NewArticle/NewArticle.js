import React, { useState, useReducer } from "react";
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
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";
import tinymce from "tinymce/tinymce";

// https://dev.to/rafaaraujoo/how-to-setup-tinymce-react-4aka

const flashReducer = (state, action) => {
  switch (action.type) {
    case "FLASH":
      return action.payload || false;
    case "RESET":
      return "";
    default:
      throw new Error("Reducer dispatch type not found");
  }
};

function NewArticle() {
  const { storedValue: token } = useLocalStorage("jwt-cms", null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [flash, dispatch] = useReducer(flashReducer, "");

  const handleFlashMessage = (result, successMessage) => {
    if (result.data.message) {
      dispatch({ type: "FLASH", payload: result.data.message });
    } else if (result.data.errors) {
      const errors = result.data.errors.map((obj) => obj.msg);
      dispatch({ type: "FLASH", payload: errors });
    } else {
      dispatch({
        type: "FLASH",
        payload: successMessage,
      });
    }
  };

  const saveArticle = async () => {
    try {
      dispatch({ type: "RESET" });
      const result = await axios.post(
        `http://localhost:${process.env.REACT_APP_API_PORT}/articles/`,
        {
          title,
          description,
          content: tinymce.activeEditor.getContent(),
          isPublished: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleFlashMessage(result, "Article has been saved!");
    } catch (err) {
      console.log(err);
      dispatch({ type: "FLASH", payload: err.message });
    }
  };

  const publishArticle = async () => {
    try {
      dispatch({ type: "RESET" });
      const result = await axios.post(
        `http://localhost:${process.env.REACT_APP_API_PORT}/articles/`,
        {
          title,
          description,
          content: tinymce.activeEditor.getContent(),
          isPublished: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleFlashMessage(result, "Article has been saved and published!");
    } catch (err) {
      console.log(err);
      dispatch({ type: "FLASH", payload: err.message });
    }
  };

  return (
    <div>
      <div className="text-highlight my-2">
        <p className="empty:h-6">{flash}</p>
      </div>
      <form className="flex flex-col items-start mb-4">
        <div className="w-full">
          <label className="text-2xl text-primary">Title</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg py-1 px-2 text-secondary w-full mt-2"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-4 w-full">
          <label className="text-2xl text-primary">Description</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg py-1 px-2 text-secondary w-full mt-2"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
      <Editor
        init={{
          skin: false,
          content_css: false,
          font_formats:
            "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Roboto=roboto; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap'); body { font-family: Roboto; }",
          height: 600,
          menubar: false,
          plugins: ["link image", "table paste", "lists"],
          toolbar:
            "undo redo | formatselect | fontselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",
        }}
        value={content}
        onEditorChange={(c) => setContent(c)}
      />
      <div className="flex justify-start my-4">
        <button
          onClick={saveArticle}
          className="nav-link bg-blue-400 text-white hover:text-white hover:bg-blue-500"
        >
          Save
        </button>
        <button
          onClick={publishArticle}
          className="nav-link bg-emerald-400 text-white hover:text-white hover:bg-emerald-500"
        >
          Save and publish
        </button>
      </div>
    </div>
  );
}

export default NewArticle;
