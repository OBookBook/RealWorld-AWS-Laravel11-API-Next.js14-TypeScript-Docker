"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ArticleTypes } from './types/ArticleTypes';

export default function Home() {
  const [articles, setArticles] = useState<ArticleTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("記事の取得に失敗しました:", error);
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>
              {loading ? (
                <div className="mx-auto" style={{ fontSize: "5rem" }}>Loading...</div>
              ) : (
                articles.map((article: ArticleTypes) => (
                  <div className="article-preview" key={article.slug}>
                    <div className="article-meta">
                      <a href="/profile/albert-pai">
                        <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                      </a>
                      <div className="info">
                        <a href="/profile/albert-pai" className="author">
                          Albert Pai
                        </a>
                        <span className="date">
                          {new Date(article.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <button className="btn btn-outline-primary btn-sm pull-xs-right">
                        <i className="ion-heart"></i> 0
                      </button>
                    </div>
                    <a href={`/article/${article.slug}`} className="preview-link">
                      <h1>{article.title}</h1>
                      <p>{article.description}</p>
                      <span>Read more...</span>
                      <ul className="tag-list">
                        <li className="tag-default tag-pill tag-outline">
                          realworld
                        </li>
                        <li className="tag-default tag-pill tag-outline">
                          implementations
                        </li>
                      </ul>
                    </a>
                  </div>
                ))
              )}

              <ul className="pagination">
                <li className="page-item active">
                  <a className="page-link" href="">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="">
                    2
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <a href="" className="tag-pill tag-default">
                    programming
                  </a>
                  <a href="" className="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="" className="tag-pill tag-default">
                    emberjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    angularjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    react
                  </a>
                  <a href="" className="tag-pill tag-default">
                    mean
                  </a>
                  <a href="" className="tag-pill tag-default">
                    node
                  </a>
                  <a href="" className="tag-pill tag-default">
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


