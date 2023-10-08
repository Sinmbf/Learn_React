import PropTypes from "prop-types";
import Card from "./Card";
import Form from "./Form";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

let page = 1;
const API_KEY = import.meta.env.VITE_API_KEY_sidd;

export default function News({ updateProgress }) {
  const [news, setNews] = useState({
    articles: [],
  });
  const [error, setError] = useState(false);

  let loading = true;

  useEffect(() => {
    fetchNews("Messi");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to update news
  const updateNews = (fetchedNews, inputValue) => {
    news.inputValue !== inputValue && (page = 1);
    setError(false);

    setNews({
      articles:
        news.inputValue !== inputValue
          ? fetchedNews.articles
          : news.articles.concat(fetchedNews.articles),
      inputValue: inputValue,
      totalPages:
        fetchedNews.totalResults >= 100
          ? 5
          : Math.ceil(fetchedNews.totalResults / 20),
    });
    updateProgress(100);
    loading = false;
  };

  // Helper function to fetch news
  const fetchNews = async (inputValue) => {
    updateProgress(10);
    const url = `https://newsapi.org/v2/everything?q=${inputValue}&apiKey=${API_KEY}&pageSize=20&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    updateProgress(50);
    // updateNews(data, inputValue);
    data.totalResults ? updateNews(data, inputValue) : setError(true),
      updateProgress(100);
  };

  const fetchMoreData = async () => {
    page++;
    const url = `https://newsapi.org/v2/everything?q=${news.inputValue}&apiKey=${API_KEY}&pageSize=20&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    updateNews(data, news.inputValue);
  };

  return (
    <>
      <div className="container">
        <div className="text-center text-danger mt-4">
          <h2>Search For News</h2>
        </div>
        <div className="row justify-content-center">
          {/* Form */}
          <Form fetchNews={fetchNews} />
        </div>
        <InfiniteScroll
          dataLength={news.articles.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={page !== news.totalPages}
          loader={news.articles.length && !error && <Spinner />}>
          <div className="container">
            <div className="row justify-content-center">
              {news.articles.length === 0 &&
              loading === true &&
              error == false ? (
                <div
                  className="spinner-border text-info mt-5"
                  role="status"
                  style={{ width: "4rem", height: "4rem" }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : error === true ? (
                <div className="alert alert-danger mt-5" role="alert">
                  <strong>No results found!</strong>
                </div>
              ) : (
                news.articles.map((element) => (
                  <Card key={element.url + crypto.randomUUID()} {...element} />
                ))
              )}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

News.propTypes = {
  updateProgress: PropTypes.func,
};
