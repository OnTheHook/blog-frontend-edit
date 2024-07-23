import { parseISO, formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({ author, date, published, text, title, _id }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={"/post/" + _id}>
          <img
            src="https://plus.unsplash.com/premium_photo-1720798652392-61f07be72d8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </Link>
      </div>
      <div className="text">
        <Link to={"/post/" + _id}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(parseISO(date))}</time>
        </p>
        <p className="summary">{text.slice(0, 100)}...</p>
        <p className="published">Published: {published.toString()}</p>
      </div>
    </div>
  );
}
