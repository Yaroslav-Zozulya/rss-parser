import { FC } from "react";
import { ArticlesItem } from "../ArticlesItem/ArticlesItem";
import { UpdateArticleData } from "../../../../services/dto.types";

type ArticlesType = {
  articles: ArticleType[];
};

type ArticlesListProps = {
  data: ArticlesType;
  onSubmit: (_id: string) => (data: UpdateArticleData) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
};

type ArticleType = {
  _id: string;
  title: string;
  contentSnippet: string;
  link: string;
  categories: string[];
  pubDate: string;
};

export const ArticlesList: FC<ArticlesListProps> = ({
  data,
  onSubmit,
  handleDelete,
}) => {
  return (
    <div>
      {data?.articles?.map(
        ({
          _id,
          title,
          link,
          pubDate,
          categories,
          contentSnippet,
        }: ArticleType) => (
          <ArticlesItem
            key={_id}
            _id={_id}
            title={title}
            link={link}
            pubDate={pubDate}
            categories={categories}
            contentSnippet={contentSnippet}
            onSubmit={onSubmit(_id)}
            handleDelete={handleDelete}
          />
        )
      )}
    </div>
  );
};
