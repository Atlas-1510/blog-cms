import React, { useState, useEffect, useReducer } from "react";
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
import { useNavigate, useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

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

function Article() {
  const params = useParams();
  const { storedValue: token } = useLocalStorage("jwt-cms", null);
  const { result: article, error: isError } = useAxios(
    `http://localhost:1015/articles/${params.articleID}`
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(article.title);
    setDescription(article.description);
    setContent(article.content);
  }, [article]);

  const [flash, dispatch] = useReducer(flashReducer, "");

  const publishArticle = async () => {
    try {
      dispatch({ type: "RESET" });
      const result = await axios.put(
        `http://localhost:1015/articles/${params.articleID}`,
        {
          title,
          description,
          content,
          isPublished: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.message) {
        dispatch({ type: "FLASH", payload: result.data.message });
      } else if (result.data.errors) {
        const errors = result.data.errors.map((obj) => obj.msg);
        dispatch({ type: "FLASH", payload: errors });
      } else {
        dispatch({
          type: "FLASH",
          payload: "Article has been saved and published!",
        });
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const unpublishArticle = async () => {
    try {
      dispatch({ type: "RESET" });
      const result = await axios.put(
        `http://localhost:1015/articles/${params.articleID}`,
        {
          title,
          description,
          content,
          isPublished: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      if (result.data.message) {
        dispatch({ type: "FLASH", payload: result.data.message });
      } else if (result.data.errors) {
        const errors = result.data.errors.map((obj) => obj.msg);
        dispatch({ type: "FLASH", payload: errors });
      } else {
        dispatch({
          type: "FLASH",
          payload: "Article has removed from public view.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteArticle = async () => {
    try {
      dispatch({ type: "RESET" });
      const result = await axios.delete(
        `http://localhost:1015/articles/${params.articleID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.message) {
        dispatch({ type: "FLASH", payload: result.data.message });
      } else if (result.data.errors) {
        const errors = result.data.errors.map((obj) => obj.msg);
        dispatch({ type: "FLASH", payload: errors });
      } else {
        dispatch({
          type: "FLASH",
          payload: "Article has been deleted!",
        });
        setTimeout(() => window.location.replace("/"), 1000);
      }
    } catch (err) {
      console.log(err);
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
        initialValue={article.content}
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
      <div className="flex justify-start my-4">
        <button className="nav-link bg-blue-400 text-white hover:text-white hover:bg-blue-500">
          Save
        </button>
        <button
          onClick={publishArticle}
          className="nav-link bg-emerald-400 text-white hover:text-white hover:bg-emerald-500"
        >
          Save and publish
        </button>
        <button
          onClick={unpublishArticle}
          className="nav-link bg-fuchsia-400 text-white hover:text-white hover:bg-fuchsia-500"
        >
          Unpublish
        </button>
        <button
          onClick={deleteArticle}
          className="nav-link bg-red-400 text-white hover:text-white hover:bg-red-500"
        >
          Discard
        </button>
      </div>
    </div>
  );
}

export default Article;
