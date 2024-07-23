// src/components/PostList.js
import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/blogs/all"
      );
      console.log(response.data.blogs);
      setPosts(response.data.blogs);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} {...post} />
        // <div key={post._id}>
        //   <h2>{post.title}</h2>
        //   <p>{post.author.username}</p>
        //   <p>{post.text}</p>

        //   {post.comments.map((comment) => (
        //     <div key={comment._id}>
        //       <p>{comment.text}</p>
        //       <p>{comment.author}</p>
        //       <p>{comment.date}</p>
        //     </div>
        //   ))}
        //   <Link to={`/blogs/${post._id}/edit`}>Edit</Link>
        // </div>
      ))}
    </div>
  );
};

export default PostList;
