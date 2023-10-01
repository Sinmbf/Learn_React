import PropTypes from "prop-types";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class NewsItem extends Component {
  render() {
    let { title, description, url, urlToImage, publishedAt, author } =
      this.props;
    return (
      <>
        <div className="col-lg-4 col-md-6 col-11  mb-5">
          <div className="card text-bg-dark h-100">
            <img
              src={
                urlToImage
                  ? urlToImage
                  : "https://nbcsports.brightspotcdn.com/dims4/default/7aa3c94/2147483647/strip/true/crop/3964x2230+0+207/resize/1440x810!/quality/90/?url=https%3A%2F%2Fnbc-sports-production-nbc-sports.s3.amazonaws.com%2Fbrightspot%2F80%2F06%2F5f38136747329be17285969f5a7c%2Fhttps-api-imagn.com%2Frest%2Fdownload%2FimageID%3D21450560"
              }
              className="card-img-top"
              style={{ height: "20rem" }}
              alt="..."
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-info" style={{ height: "7rem" }}>
                {title ? title : "Title"}
              </h5>
              <p className="card-text" style={{ height: "6rem" }}>
                {description ? description.slice(0, 109) : "Description"}...
              </p>

              <p className="card-text" style={{ height: "3rem" }}>
                <small className="text-primary">
                  By {author ? author : "Anonymous"} on{" "}
                  {new Date(publishedAt).toGMTString()}
                </small>
              </p>
              <Link
                to={url}
                target="_blank"
                className="btn btn-sm btn-outline-light mt-auto p-3">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  urlToImage: PropTypes.string,
  url: PropTypes.string,
  publishedAt: PropTypes.string,
  author: PropTypes.string,
};
