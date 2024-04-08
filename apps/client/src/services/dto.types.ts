export type LoginData = {
  email: string;
  password: string;
};

export type AdminUserData = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type UpdateArticleData = {
  title: string;
  contentSnippet: string;
  link: string;
  categories: string;
};

export type GetAllArticlesData = { page?: number; limit?: number };
