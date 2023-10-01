import { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

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
    this.props.changeProgress(10);
    const { pageSize, category, country, apiKey } = this.props;
    // this.setState({ articles: [], loading: true });
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}&category=${category}`;
      let response = await fetch(url);
      let data = await response.json();
      this.props.changeProgress(70);
      this.setState({
        articles: data.articles,
        loading: false,
        totalPages:
          data.totalResults >= 100
            ? 5
            : Math.ceil(data.totalResults / pageSize),
      });
      this.props.changeProgress(100);
    } catch (error) {
      console.log(error);
    }
  };

  fetchMoreData = async () => {
    this.page++;

    const { pageSize, category, country, apiKey } = this.props;
    // this.setState({ articles: [], loading: true });
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&page=${this.page}&pageSize=${pageSize}&category=${category}`;
      let response = await fetch(url);
      let data = await response.json();
      this.setState({
        articles: this.state.articles.concat(data.articles),
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
          <InfiniteScroll
            dataLength={this.state.articles.length} //This is important field to render the next data
            next={this.fetchMoreData}
            hasMore={this.page !== this.state.totalPages}
            loader={<Spinner />}>
            <div className="container">
              <div className="row justify-content-center">
                {this.state.articles?.length === undefined ? (
                  <div className="text-danger text-center fs-3">
                    You have reached the maximum requests! Please try again
                    later
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
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  country: PropTypes.string,
  changeProgress: PropTypes.func,
  apiKey: PropTypes.string,
};
