"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArticleTypes } from '../../types/ArticleTypes';
import { useRouter } from 'next/navigation';
import { ArticleShowRequestParams } from "../../types/ArticleShowRequestParams";

export default function ArticleDetail(request : ArticleShowRequestParams) {
  const { id } = request.params;
  const [article, setArticle] = useState<ArticleTypes | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("記事の取得に失敗しました:", error);
      }
    };
    fetchArticle();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`);
      router.push('/');
    } catch (error) {
      console.error("記事の削除に失敗しました:", error);
    }
  };

  if (!article) {
    return <div className="mx-auto" style={{ fontSize: "5rem", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta">
            <a href="/profile/eric-simons">
              <img src="http://i.imgur.com/Qr71crq.jpg" />
            </a>
            <div className="info">
              <a href="/profile/eric-simons" className="author">
                Eric Simons
              </a>
              <span className="date">{new Date(article.created_at).toLocaleDateString()}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow Eric Simons <span className="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => router.push(`/article/create-edit?slug=${id}&edit=true`)}>
              <i className="ion-edit"></i> Edit Article
            </button>
            {/* <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-edit"></i> Edit Article
            </button> */}
            <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.description}</p>
            <h2 id="introducing-ionic">{article.title}</h2>
            <p>{article.body}</p>
            <ul className="tag-list">
              <li className="tag-default tag-pill tag-outline">realworld</li>
              <li className="tag-default tag-pill tag-outline">
                implementations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

