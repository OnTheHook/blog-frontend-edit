import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  let { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/blogs/${id}/edit`
      );
      setPost(response.data.blog);
      setTitle(response.data.blog.title);
      setText(response.data.blog.text);
      console.log(post);
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `localhost:3000/api/v1/blogs/${id}/edit`,
        { title, text }
      );
      console.log(response.data);
      // Handle successful update, e.g., show a success message or redirect
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle errors, e.g., show an error message
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Post</h1>
      <input
        type="text"
        placeholder="username"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditPost;
