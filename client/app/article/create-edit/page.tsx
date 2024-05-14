"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { ArticleSearchParams } from "../../types/ArticleSearchParams";

const CreateEditArticle = (request :ArticleSearchParams ) => {
  const { edit, slug } = request.searchParams;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (edit && slug) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}`);
          const { title, description, body } = response.data;
          setTitle(title);
          setDescription(description);
          setBody(body);
        } catch (error) {
          console.error("記事の取得に失敗しました:", error);
        }
      };
      fetchArticle();
    }
  }, [edit, slug]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const url = edit ? `${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}` : `${process.env.NEXT_PUBLIC_API_URL}/articles`;
    const method = edit ? axios.put : axios.post;

    try {
      const response = await method(url, {
        title,
        description,
        body,
      });
      setSuccessMessage(edit ? "記事が正常に更新されました" : "記事が正常に登録されました");
      setErrorMessage("");
      router.push('/');
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(edit ? "記事の更新に失敗しました" : "記事の登録に失敗しました");
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                  />
                  <div className="tag-list">
                    <span className="tag-default tag-pill">
                      <i className="ion-close-round"></i> tag{" "}
                    </span>
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  {edit ? "Update Article" : "Publish Article"}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditArticle;