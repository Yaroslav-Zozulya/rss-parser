import { fetchInstance } from "./fetchInstance";
import { UpdateArticleData } from "./dto.types";

const getAll = async (page = 1, sortMod = "desc", title = "", limit = 10) => {
  const response = await fetchInstance.get(
    `/articles?title=${title}&pubDate=${sortMod}&page=${page}&limit=${limit}`
  );
  return response.data;
};

const add = async (data: UpdateArticleData) => {
  const response = await fetchInstance.post("/articles", data);
  return response.data;
};

const update = async (data: UpdateArticleData, id: string) => {
  const response = await fetchInstance.put(`/articles/${id}`, data);
  return response.data;
};

const deleteById = async (id: string) => {
  const response = await fetchInstance.delete(`/articles/${id}`);
  return response.data;
};

export const articlesAPI = { getAll, deleteById, update, add };
