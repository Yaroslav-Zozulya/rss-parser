import { FC } from "react";
import { Box, Pagination } from "@mui/material";

import s from "./styles.module.css";

type PaginationBoxProps = {
  totalPages: number;
  page: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
};

export const PaginationBox: FC<PaginationBoxProps> = ({
  totalPages,
  page,
  handlePageChange,
}) => {
  return (
    <Box className={s.pagination}>
      <Pagination
        classes={s}
        count={totalPages}
        color="primary"
        page={page}
        onChange={handlePageChange}
        sx={{ color: "white" }}
      />
    </Box>
  );
};
