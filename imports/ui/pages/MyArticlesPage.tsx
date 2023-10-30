import React, { useState } from "react";
import Page from "../layouts/Page";
import {
  useDeleteArticle,
  useGetMyArticles,
} from "/imports/hooks/requests/Articles";
import ArticlePreview from "../components/ArticlePreview";
import AppModal from "../components/AppModal";
import { showNotification } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import useCurrentUser from "/imports/hooks/current-user";
export default function HomePage() {
  const [deletedArt, setDeletedArt] = useState<string | null>(null);
  const { currentUser } = useCurrentUser();
  const { data } = useGetMyArticles(currentUser?._id ?? "");
  const articles = data ?? [];
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
      {articles.map((article) => (
        <ArticlePreview
          onDelete={() => {
            setDeletedArt(article._id ?? "");
          }}
          article={article}
          key={article._id}
        />
      ))}
    </Page>
  );
}
