import PropTypes from "prop-types";
import Card from "./Card";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

let page = 1;
const API_KEY = import.meta.env.VITE_API_KEY_sidd;

export default function News({ updateProgress, currentCategory }) {
  const [news, setNews] = useState({
    articles: [],
  });
  let loading = true;

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory]);

  // Helper function to update news
  const updateNews = (fetchedNews) => {
    currentCategory !== fetchedNews.category && (page = 1);
    setNews({
      articles: fetchedNews.articles,
      category: currentCategory,
      totalPages:
        fetchedNews.totalResults >= 100
          ? 5
          : Math.ceil(fetchedNews.totalResults / 20),
    });
    updateProgress(100);
    loading = false;
  };

  // Helper function to fetch news
  const fetchNews = async () => {
    updateProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&pageSize=20&category=${currentCategory}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    updateProgress(50);
    data ? updateNews(data) : console.log("null");
  };

  const fetchMoreData = async () => {
    page++;
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&pageSize=20&category=${currentCategory}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    setNews({
      articles: news.articles.concat(data.articles),
      totalPages:
        data.totalResults >= 100 ? 5 : Math.ceil(data.totalResults / 20),
    });
  };

  return (
    <>
      <div className="container">
        <div className="text-center text-danger mt-4">
          <h2>
            {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}{" "}
            - Top Headlines
          </h2>
        </div>
        <InfiniteScroll
          dataLength={news.articles.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={page !== news.totalPages}
          loader={news.articles.length && <Spinner />}>
          <div className="container">
            <div className="row justify-content-center">
              {news.articles.length === 0 && loading === true ? (
                <div
                  className="spinner-border text-info mt-5"
                  role="status"
                  style={{ width: "4rem", height: "4rem" }}>
                  <span className="visually-hidden">Loading...</span>
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
  currentCategory: PropTypes.string,
};
