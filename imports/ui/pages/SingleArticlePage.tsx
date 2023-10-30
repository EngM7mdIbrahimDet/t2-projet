import React, { useState } from "react";
import Page from "../layouts/Page";
import {
  useDeleteArticle,
  useGetSingleArticle,
} from "/imports/hooks/requests/Articles";
import { useNavigate, useParams } from "react-router-dom";
import { Loader, Title } from "@mantine/core";
import ArticlePreview from "../components/ArticlePreview";
import { useQueryClient } from "react-query";
import { showNotification } from "@mantine/notifications";
import AppModal from "../components/AppModal";
import AddComment from "../components/AddComment";
import useCurrentUser from "/imports/hooks/current-user";
import useCommentsSubscribe from "/imports/hooks/useCommentsSubscribe";
import CommentPreview from "../components/CommentPreview";
import { IComment } from "/imports/types/IComment";

export default function SingleArticlePage() {
  const [deletedArt, setDeletedArt] = useState<string | null>(null);
  const { currentUser } = useCurrentUser();
  const { id: articleID } = useParams();
  console.log("articleID", articleID);
  const { data, isError, isLoading } = useGetSingleArticle(articleID ?? "");
  const { comments, loading: isCommentsLoading } = useCommentsSubscribe(
    articleID ?? ""
  );
  console.log(data);
  const article = data ?? null;
  const queryClient = useQueryClient();
  const goTo = useNavigate();
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
      goTo("/");
    },
  });
  return (
    <Page column gap={10}>
      {isError || !data ? (
        <Title>Article not found!</Title>
      ) : isLoading ? (
        <Loader size={40} />
      ) : (
        <>
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
          <ArticlePreview
            hideShowArticle
            onDelete={() => {
              setDeletedArt(article?._id ?? null);
            }}
            article={article!}
          />
          <Title order={3}>Comments</Title>
          {isCommentsLoading ? (
            <Loader size={40} />
          ) : (
            comments?.map((comment) => (
              <CommentPreview key={comment._id} comment={comment as IComment} />
            ))
          )}
          {currentUser && <AddComment articleId={articleID ?? ""} />}
        </>
      )}
    </Page>
  );
}
