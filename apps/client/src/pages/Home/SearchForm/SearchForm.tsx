import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type SearchFormProps = {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setSortMod: Dispatch<SetStateAction<string>>;
  sortMod: string;
  isLoading: boolean;
};

export const SearchForm: FC<SearchFormProps> = ({
  setSearchQuery,
  setSortMod,
  sortMod,
  isLoading,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setSearchQuery(data.title);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSortMod(event.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        marginBottom: 2,
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <TextField
        {...register("title")}
        fullWidth
        label="Enter search query"
        variant="outlined"
      />
      <FormControl fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-label">Sort by date</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortMod}
          label="Sort by date"
          onChange={handleChange}
        >
          <MenuItem value="asc">Old news</MenuItem>
          <MenuItem value="desc">Last news</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 4,
          paddingRight: 4,
        }}
        disabled={isLoading ? true : false}
      >
        Search
      </Button>
    </Box>
  );
};
