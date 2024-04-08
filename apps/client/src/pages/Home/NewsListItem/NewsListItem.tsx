import { FC } from "react";
import { convertDate } from "../../../helpers/convertDate";
import { Box, Link, Typography } from "@mui/material";

type NewsListItemProps = {
  _id: string;
  title: string;
  pubDate: string;
  link: string;
};

export const NewsListItem: FC<NewsListItemProps> = ({
  _id,
  title,
  pubDate,
  link,
}) => {
  return (
    <Box
      key={_id}
      component="li"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        border: "1px solid grey",
        borderRadius: 2,
      }}
    >
      <Typography variant="h3" sx={{ fontSize: "20px", color: "#000" }}>
        {title}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box component="span" sx={{ color: "#000" }}>
          {convertDate(pubDate)}
        </Box>
        <Link href={link}>Read more</Link>
      </Box>
    </Box>
  );
};
