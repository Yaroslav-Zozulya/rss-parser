import { FC, useState } from "react";
import { SearchForm } from "./SearchForm/SearchForm";
import { Container } from "@mui/material";
import { useQuery } from "react-query";
import { articlesAPI } from "../../services/articlesAPI";
import { PaginationBox } from "../Admin/components/PaginationBox/PaginationBox";
import { NewsList } from "./NewsList/NewsList";

const Home: FC = () => {
  const [page, setPage] = useState(1);
  const [sortMod, setSortMod] = useState("desc");
  const [SearchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery(
    ["articles", page, sortMod, SearchQuery],
    () => articlesAPI.getAll(page, sortMod, SearchQuery),
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
  return (
    <>
      <Container sx={{ padding: "24px", backgroundColor: "#a4daf0" }}>
        <SearchForm
          setSearchQuery={setSearchQuery}
          setSortMod={setSortMod}
          sortMod={sortMod}
          isLoading={isLoading}
        />
        {isError && <h3>Something is wrong. Please try again</h3>}
        {data && <NewsList data={data.articles} />}
        {data?.pagination?.totalPages > 1 && (
          <PaginationBox
            totalPages={data.pagination.totalPages}
            page={page}
            handlePageChange={handlePageChange}
          />
        )}
      </Container>
    </>
  );
};

export default Home;
