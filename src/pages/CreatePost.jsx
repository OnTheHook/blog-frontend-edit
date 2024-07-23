import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/blogs/new_post",
        {
          title,
          summary,
          text,
        }
      );
      console.log(response);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      {/* <input type="file" name="" id="" /> */}
      <ReactQuill theme="snow" value={text} onChange={setText} />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}
