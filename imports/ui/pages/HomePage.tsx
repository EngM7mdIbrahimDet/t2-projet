import React, { useRef, useState } from "react";
import Page from "../layouts/Page";
import {
  useDeleteArticle,
  useGetAllArticles,
} from "/imports/hooks/requests/Articles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Pagination, TextInput } from "@mantine/core";
import ArticlePreview from "../components/ArticlePreview";
import AppModal from "../components/AppModal";
import { showNotification } from "@mantine/notifications";
import { useQueryClient } from "react-query";
export default function HomePage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const searchRef = useRef(search);
  const page = searchParams.get("page") ?? "1";

  const [filter, setFilter] = useState({
    search,
    page,
  });
  const [deletedArt, setDeletedArt] = useState<string | null>(null);
  const { data } = useGetAllArticles(filter, {
    onSuccess: (data) => {
      setFilter({ ...filter, page: "" + Math.min(data?.pages, +page) });
    },
  });
  const { articles, count, pages } = data ?? {
    articles: [],
    count: 0,
    pages: 1,
  };
  const goTo = useNavigate();
  const queryClient = useQueryClient();
  const deleteArticle = useDeleteArticle({
    onSuccess: () => {
      setDeletedArt(null);
      showNotification({
        title: "Success",
        message: "Article deleted successfully!",
        color: "green",
      });
      queryClient.invalidateQueries(["articles.getAll"]);
      queryClient.invalidateQueries(["articles.getMyArticles"]);
    },
  });
  return (
    <Page column gap={5}>
      <AppModal
        opened={!!deletedArt}
        loading={false}
        onClose={() => {
          setDeletedArt(null);
        }}
        onYes={() => {
          deleteArticle.mutate(deletedArt ?? "");
        }}
        modalText={`Are you sure you want to delete this article?`}
      />
      <Box className="flex gap-2 items-end mb-10">
        <TextInput
          className="w-60"
          label="Search"
          placeholder={`We have ${count} articles to search in!`}
          defaultValue={search}
          onChange={(e) => {
            searchRef.current = e.currentTarget.value;
            setFilter({ page: "1", search: searchRef.current });
          }}
        />
        <Button
          variant="outline"
          className="mx-10"
          onClick={() => {
            setFilter({ page: "1", search: searchRef.current });
          }}
        >
          Search
        </Button>
      </Box>
      {articles.map((article) => (
        <ArticlePreview
          onDelete={() => {
            setDeletedArt(article._id ?? "");
          }}
          article={article}
          key={article._id}
        />
      ))}
      <Pagination
        align="center"
        total={pages}
        onChange={(value) => {
          setFilter({ page: "" + value, search: searchRef.current });
          goTo(
            `/?page=${value}${
              searchRef.current ? `&search=${searchRef.current}` : ""
            }`
          );
        }}
      />
    </Page>
  );
}
