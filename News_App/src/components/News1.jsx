import { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Pagination from "./Pagination";
import Spinner from "./Spinner";

export default class News extends Component {
  page = 1;
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
    };
  }

  async componentDidMount() {
    this.fetchAndRenderNews(this.page);
  }

  // Method to fetch and render news
  fetchAndRenderNews = async (page) => {
    const { pageSize, category, country } = this.props;
    this.setState({ articles: [], loading: true });
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=fcbb5c96f74a49d18a58bba4c257b1a0&page=${page}&pageSize=${pageSize}&category=${category}`;
      let response = await fetch(url);
      let data = await response.json();
      this.setState({
        articles: data.articles,
        loading: false,
        totalPages:
          data.totalResults >= 100
            ? 5
            : Math.ceil(data.totalResults / pageSize),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Method to go to previous news page
  handlePreviousClick = () => {
    if (this.page > 1) {
      this.page--;
    }
    this.fetchAndRenderNews(this.page);
  };

  // Method to go to next news page
  handleNextClick = () => {
    if (this.page > this.state.totalPages) {
      return;
    } else {
      this.page++;
      this.fetchAndRenderNews(this.page);
    }
  };

  render() {
    const { category } = this.props;
    return (
      <>
        <div className="container d-flex flex-column gap-4">
          <div className="text-center mt-5 text-primary">
            <h1>
              {category.charAt(0).toUpperCase() + category.slice(1)} - Top
              Headlines
            </h1>
          </div>

          <div className="row justify-content-center">
            {/* Loading */}
            {this.state.loading === true && <Spinner />}
            {/* Data */}
            {this.state.articles?.length === undefined ? (
              <div className="text-danger text-center fs-3">
                You have reached the maximum requests! Please try again later
              </div>
            ) : (
              this.state.articles.map((article) => {
                return (
                  <NewsItem
                    key={article.url + crypto.randomUUID()}
                    {...article}
                  />
                );
              })
            )}
          </div>
          {/* Pagination */}
          <Pagination
            handleNextClick={this.handleNextClick}
            handlePreviousClick={this.handlePreviousClick}
            page={this.page}
            totalPages={this.state.totalPages}
          />
        </div>
      </>
    );
  }
}

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  country: PropTypes.string,
};
