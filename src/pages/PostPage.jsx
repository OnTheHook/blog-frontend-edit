import axios from "axios";
import { formatISO9075, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/blogs/${id}`
        );
        const data = response.data.blog;
        setPost(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div></div>;
  if (!post) return <div>Cannot find post</div>;

  return (
    <div className="post-page">
      <div className="text">
        <h1>{post.title}</h1>
        <time>{formatISO9075(parseISO(post.date))}</time>
        <div className="author">by {post.author.username}</div>
        <p className="summary">{post.text}</p>
        <p className="published">Published: {post.published.toString()} </p>
      </div>
    </div>
  );
}
