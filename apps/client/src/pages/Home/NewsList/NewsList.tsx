import { Box, Link, Typography } from "@mui/material";
import { FC } from "react";
import { NewsListItem } from "../NewsListItem/NewsListItem";

type NewsListProps = {
  data: Item[];
};

type Item = {
  _id: string;
  title: string;
  link: string;
  pubDate: string;
};

export const NewsList: FC<NewsListProps> = ({ data }) => {
  return (
    <Box
      component="ul"
      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
    >
      {data.map(({ _id, title, pubDate, link }) => (
        <NewsListItem
          key={_id}
          _id={_id}
          title={title}
          pubDate={pubDate}
          link={link}
        />
      ))}
    </Box>
  );
};
