import React, { useMemo } from "react";
import useAxios from "../hooks/useAxios";
import useLocalStorage from "../hooks/useLocalStorage";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

function ArticlesOverview() {
  const { storedValue: token } = useLocalStorage("jwt-cms", null);
  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );
  const { result: articles, error: isError } = useAxios(
    "http://localhost:1015/articles/overview",
    config
  );

  return (
    <div className="w-full">
      <div className="font-roboto flex flex-col items-center min-w-[360px]">
        <div className="flex flex-col items-center justify-center m-4 p-8 border-b">
          <h1 className="text-3xl font-extrabold my-2 text-primary">
            Articles
          </h1>
        </div>
        <Link
          to="/articles/new"
          className="nav-link border-indigo-600 border-4 text-indigo-600 font-medium hover:bg-highlight hover:text-white transition-all"
        >
          Create new article
        </Link>
        <div className="grid justify-items-center gap-4 m-4 grid-cols-cardLayout flex-grow w-10/12">
          {isError && <p>Something went wrong</p>}
          {!isError &&
            articles &&
            articles.map((article) => <Card article={article} />)}
        </div>
      </div>
    </div>
  );
}

export default ArticlesOverview;
