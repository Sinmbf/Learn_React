import PropTypes from "prop-types";
import Card from "./Card";
import Form from "./Form";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

let page = 1;

export default function News({ updateProgress }) {
    const [news, setNews] = useState({
        articles: [],
    });

    useEffect(() => {
        fetchNews("Messi");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Helper function to update news
    const updateNews = (fetchedNews, inputValue) => {
        news.inputValue !== inputValue && (page = 1);
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
    };

    // Helper function to fetch news
    const fetchNews = async (inputValue) => {
        updateProgress(10);
        const url = `https://newsapi.org/v2/everything?q=${inputValue}&apiKey=fcbb5c96f74a49d18a58bba4c257b1a0&pageSize=20&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        updateProgress(50);
        updateNews(data, inputValue);
    };

    const fetchMoreData = async () => {
        page++;
        const url = `https://newsapi.org/v2/everything?q=${news.inputValue}&apiKey=fcbb5c96f74a49d18a58bba4c257b1a0&pageSize=20&page=${page}`;
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
                    loader={news.articles.length && <Spinner />}>
                    <div className="container">
                        <div className="row justify-content-center">
                            {news.articles.length === 0 ? (
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
