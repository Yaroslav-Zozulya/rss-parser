import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { articlesAPI } from "../../../../services/articlesAPI";
import { updateArticleSchema } from "../../../../schemas/updateArticleSchema.schema";

import s from "../AdminPanel/styles.module.css";
import { QueryClient, useMutation, useQueryClient } from "react-query";

type FormValues = {
  title: string;
  link: string;
  categories: string;
  contentSnippet: string;
};

export const AddArticleForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(updateArticleSchema),
  });

  const queryClient = useQueryClient();
  console.log(queryClient);
  const { isError, isLoading, mutateAsync } = useMutation((data: FormValues) =>
    articlesAPI.add(data)
  );

  const onSubmit = async (data: FormValues) => {
    try {
      await mutateAsync(data);
      queryClient.refetchQueries(["articles", 1]);
    } catch (error) {
      console.log("Here must be some notify");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        {...register("title")}
        error={!!errors.title}
        label="Title"
        variant="outlined"
        fullWidth
      />
      {errors.title && typeof errors.title.message === "string" && (
        <FormHelperText error>{errors.title.message}</FormHelperText>
      )}
      <TextField
        {...register("categories")}
        error={!!errors.categories}
        label="Categories"
        variant="outlined"
        fullWidth
      />
      {errors.categories && typeof errors.categories.message === "string" && (
        <FormHelperText error>{errors.categories.message}</FormHelperText>
      )}
      <TextField
        {...register("link")}
        error={!!errors.link}
        label="Link"
        variant="outlined"
        fullWidth
      />
      {errors.link && typeof errors.link.message === "string" && (
        <FormHelperText error>{errors.link.message}</FormHelperText>
      )}
      <TextareaAutosize
        {...register("contentSnippet")}
        className={s.textarea}
        style={{
          border: errors.contentSnippet
            ? "1px solid red"
            : "solid 1px rgb(97, 97, 97)",
        }}
        name="contentSnippet"
        placeholder="Write here content description"
        minRows={3}
      />
      {errors.contentSnippet &&
        typeof errors.contentSnippet.message === "string" && (
          <FormHelperText error>{errors.contentSnippet.message}</FormHelperText>
        )}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </Box>
    </Box>
  );
};
