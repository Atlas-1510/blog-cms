import axios from "axios";
import React from "react";
import getFormattedDate from "../utils/getFormattedDate";
import useLocalStorage from "../hooks/useLocalStorage";

function Comment({ comment, setTriggerGetComments }) {
  const formattedDate = getFormattedDate(comment.date);
  const { storedValue: token } = useLocalStorage("jwt-cms", null);

  const deleteComment = async () => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_API_LOCALHOST_PORT}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      setTriggerGetComments(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-start bg-white border-0 rounded-lg shadow-md my-4 p-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <img
            src={comment.author.profileImage}
            alt="user profile"
            className=" border-0 rounded-full w-12 h-12"
          />
          <h2 className=" m-3 text-lg font-semibold text-highlight">
            {comment.author.username}
          </h2>
        </div>

        <p className=" text-secondary">{formattedDate}</p>
      </div>
      <p className="my-3">{comment.content}</p>
      <button
        onClick={deleteComment}
        className="nav-link bg-red-400 text-white hover:text-white hover:bg-red-500 self-end"
      >
        Delete
      </button>
    </div>
  );
}

export default Comment;
