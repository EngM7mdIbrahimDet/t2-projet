import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";
import { IArticle } from "/imports/types/IArticle";
import callAsync from "/imports/utils/call-async";

export const useAddArticle = (
  options?: UseMutationOptions<any, unknown, any, any>
) => {
  return useMutation<any, any, IArticle, any>(
    ["articles.add"],
    async (article) => await callAsync("articles.add", article),
    {
      ...options,
    }
  );
};

export const useGetAllArticles = (
  filter?: { search: string; page: string },
  options?: UseQueryOptions<any, unknown, any>
) => {
  return useQuery<
    any,
    any,
    { articles: IArticle[]; pages: number; count: number },
    any
  >(
    ["articles.getAll", filter],
    async () => await callAsync("articles.getAll", filter),
    {
      ...options,
    }
  );
};

export const useGetMyArticles = (
  userId: string,
  options?: UseQueryOptions<any, unknown, any>
) => {
  return useQuery<any, any, IArticle[], any>(
    ["articles.getMyArticles", userId],
    async () => await callAsync("articles.getMyArticles", null),
    {
      ...options,
    }
  );
};

export const useGetSingleArticle = (
  articleId: string,
  options?: UseQueryOptions<any, unknown, any>
) => {
  return useQuery<any, any, IArticle, any>(
    ["articles.getSingle", articleId],
    async () => await callAsync("articles.getSingle", articleId),
    {
      ...options,
    }
  );
};

export const useDeleteArticle = (
  options?: UseMutationOptions<any, unknown, string, any>
) => {
  return useMutation<any, any, string, any>(
    ["articles.remove"],
    async (id) => await callAsync("articles.remove", id),
    {
      ...options,
    }
  );
};

export const useUpdateArticle = (
  options?: UseMutationOptions<any, unknown, IArticle, any>
) => {
  return useMutation<any, any, IArticle, any>(
    ["articles.update"],
    async (article) => await callAsync("articles.update", article),
    {
      ...options,
    }
  );
};
