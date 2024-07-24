import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from "../UserContext";

axios.defaults.withCredentials = true;

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [data, setData] = useState(null);
  // const [error, setError] = useState("");

  const fetchProtectedData = async () => {
    const token = Cookies.get("jwt");

    if (!token) {
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/auth/username",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);

      setUserInfo(data);
    } catch (err) {
      console.error("Error fetching protected data:", err);
    }
  };

  useEffect(() => {
    fetchProtectedData();
  }, []);

  function logout() {
    axios.post("http://localhost:3000/api/v1/auth/logout");
    setUserInfo(null);
  }
  const username = userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <Link to="/profile">{username}</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
