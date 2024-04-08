import { FC } from "react";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ArticleItemForm } from "../ArticleItemForm/ArticleItemForm";
import { convertDate } from "../../../../helpers/convertDate";

import { UpdateArticleData } from "../../../../services/dto.types";

type ArticlesItemProps = {
  _id: string;
  title: string;
  link: string;
  pubDate: string;
  categories: string[];
  contentSnippet: string;
  onSubmit: (data: UpdateArticleData) => Promise<void>;
  handleDelete: (id: string) => void;
};

export const ArticlesItem: FC<ArticlesItemProps> = ({
  _id,
  title,
  link,
  pubDate,
  categories,
  contentSnippet,
  onSubmit,
  handleDelete,
}) => {
  return (
    <Accordion sx={{ bgcolor: "#a4daf0" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={_id}
        id="panel1-header"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography>{convertDate(pubDate)}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <ArticleItemForm
          _id={_id}
          title={title}
          link={link}
          categories={categories}
          contentSnippet={contentSnippet}
          onSubmit={onSubmit}
          handleDelete={handleDelete}
        />
      </AccordionDetails>
    </Accordion>
  );
};
