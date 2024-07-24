import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

axios.defaults.withCredentials = true;

const EditPost = () => {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/blogs/${id}/edit`
      );
      setPost(response.data.blog);
      setTitle(response.data.blog.title);
      setText(response.data.blog.text);
      console.log(post);
    };

    fetchPost();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/blogs/${id}/edit`,
        { title, text }
      );
      console.log(response.data);
      // Handle successful update, e.g., show a success message or redirect
      setRedirect(true);
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle errors, e.g., show an error message
    }
  };
  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Post</h1>
      <input
        type="text"
        placeholder="Content"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill theme="snow" value={text} onChange={setText} />
      <button style={{ marginTop: "5px" }} type="submit">
        Save
      </button>
    </form>
  );
};

export default EditPost;
