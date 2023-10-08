import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Card({
  source,
  author,
  title,
  description,
  publishedAt,
  url,
  urlToImage,
}) {
  return (
    <>
      <div className="col-11 col-md-6 col-lg-4 mt-5">
        <div className="card text-bg-dark h-100 position-relative">
          <span className="position-absolute top-0 end-0 badge rounded-pill bg-danger">
            {source.name}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img
            src={
              urlToImage
                ? urlToImage
                : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
            }
            className="card-img-top"
            style={{ height: "20rem" }}
          />
          <div className="card-body d-flex flex-column align-items-between">
            <h5 className="card-title text-info" style={{ height: "5.7rem" }}>
              {title.slice(0, 100)}
            </h5>
            <p className="card-text" style={{ height: "6.5rem" }}>
              {description?.slice(0, 120)}...
            </p>
            <p className="card-text">
              <small
                className="text-primary"
                style={{
                  height: author && author.length <= 50 ? "4rem" : "6rem",
                }}>
                By {author ? author : "Anonymous"} on{" "}
                {new Date(publishedAt).toGMTString()}
              </small>
            </p>
            <Link
              target="_blank"
              to={url}
              className="btn btn-light mt-auto mb-3">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  source: PropTypes.object,
  author: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  publishedAt: PropTypes.string,
  url: PropTypes.string,
  urlToImage: PropTypes.string,
};
