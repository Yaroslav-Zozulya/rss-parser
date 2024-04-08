import { FC, useState } from "react";
import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { PaginationBox } from "../PaginationBox/PaginationBox";
import { ArticlesList } from "../ArticlesList/ArticlesList";
import { articlesAPI } from "../../../../services/articlesAPI";
import { UpdateArticleData } from "../../../../services/dto.types";
import { AddArticleModal } from "../AddArticleModal/AddArticleModal";

export const AdminPanel: FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useQuery(
    ["articles", page],
    () => articlesAPI.getAll(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const handleDelete = async (id: string) => {
    try {
      await articlesAPI.deleteById(id);
      refetch();
    } catch (error) {
      console.log("Here must be some notify");
    }
  };

  const onSubmit = (_id: string) => async (data: UpdateArticleData) => {
    try {
      await articlesAPI.update(data, _id);
      refetch();
    } catch (error) {
      console.log("Here must be some notify");
    }
  };

  return (
    <Box component="section" sx={{ height: "100vh", width: "100%" }}>
      <AddArticleModal />
      <ArticlesList
        data={data}
        onSubmit={onSubmit}
        handleDelete={handleDelete}
      />
      <PaginationBox
        totalPages={data?.pagination.totalPages}
        page={page}
        handlePageChange={handlePageChange}
      />
      {isLoading && <h3>Loading...</h3>}
      {isLoading && <h3>Something is wrong. Please try again</h3>}
    </Box>
  );
};
