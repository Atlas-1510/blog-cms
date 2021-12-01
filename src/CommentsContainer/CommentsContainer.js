import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "../Comment/Comment.js";

function CommentsContainer({
  articleID,
  triggerGetComments,
  setTriggerGetComments,
}) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function getComments() {
      const result = await axios.get(
        `http://localhost:${process.env.REACT_APP_API_PORT}/comments`,
        {
          params: {
            articleID,
          },
        }
      );
      setComments(result.data);
    }
    if (triggerGetComments) {
      getComments();
      setTriggerGetComments(false);
    }
  }, [articleID, triggerGetComments, setTriggerGetComments]);
  return (
    <div className="w-10/12">
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            setTriggerGetComments={setTriggerGetComments}
          />
        ))}
    </div>
  );
}

export default CommentsContainer;
