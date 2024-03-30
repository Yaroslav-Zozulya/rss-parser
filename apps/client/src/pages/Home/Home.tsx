import { FC, useState, useEffect } from "react";
import axios from "axios";

const Home: FC = () => {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      const res = await axios.get("http://localhost:5000/api/articles");

      setArticles(res.data);
    };
    getArticles();
  }, [setArticles]);

  return (
    <>
      <p>Home</p>
      <ul>
        {articles &&
          articles.map(({ link, title, contentSnippet }, idx) => (
            <li key={idx}>
              <a href={link} target="_blank">
                <h3>{title}</h3>
                <p>{contentSnippet}</p>
              </a>
              <hr />
            </li>
          ))}
      </ul>
    </>
  );
};

export default Home;
