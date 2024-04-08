import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import s from "../AdminPanel/styles.module.css";
import { FC } from "react";
import { UpdateArticleData } from "../../../../services/dto.types";
import { updateArticleSchema } from "../../../../schemas/updateArticleSchema.schema";

type ArticleItemFormProps = {
  _id: string;
  title: string;
  link: string;
  categories: string[];
  contentSnippet: string;
  onSubmit: (data: UpdateArticleData) => Promise<void>;
  handleDelete: (id: string) => void;
};

type FormValues = {
  title: string;
  link: string;
  categories: string;
  contentSnippet: string;
};

export const ArticleItemForm: FC<ArticleItemFormProps> = ({
  _id,
  title,
  link,
  categories,
  contentSnippet,
  onSubmit,
  handleDelete,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(updateArticleSchema),
  });

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
        defaultValue={title}
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
        defaultValue={categories.join(", ")}
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
        defaultValue={link}
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
        defaultValue={contentSnippet}
        minRows={3}
      />
      {errors.contentSnippet &&
        typeof errors.contentSnippet.message === "string" && (
          <FormHelperText error>{errors.contentSnippet.message}</FormHelperText>
        )}
      <Box sx={{ display: "flex", justifyContent: "end", gap: 1 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(_id)}
        >
          Delete
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
};
