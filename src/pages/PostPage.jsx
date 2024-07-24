import axios from "axios";
import { formatISO9075, parseISO } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
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
        {userInfo?.id === post.author._id && (
          <div className="edit-row">
            <Link to={`/edit/${post._id}`} className="edit-btn">
              Edit this post
            </Link>
          </div>
        )}
        <p className="summary">{post.text}</p>
        <p className="published">Published: {post.published.toString()} </p>
      </div>
    </div>
  );
}
