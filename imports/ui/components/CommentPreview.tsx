import React, { useState } from "react";
import { Box, Button, Card, Text, Title } from "@mantine/core";
import timeAgo from "/imports/utils/date-formatter";
import { IComment } from "/imports/types/IComment";
import useCurrentUser from "/imports/hooks/current-user";
import { useDeleteComment } from "/imports/hooks/requests/Comments";
import { showNotification } from "@mantine/notifications";
import AppModal from "./AppModal";
import { useQueryClient } from "react-query";

export default function CommentPreview({ comment }: { comment: IComment }) {
  const { currentUser } = useCurrentUser();
  const [deletedComment, setDeletedComment] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const deleteComment = useDeleteComment({
    onSuccess: () => {
      showNotification({
        title: "Comment deleted",
        message: "Comment is deleted successfully!",
        color: "green",
      });
      queryClient.invalidateQueries(["articles.getSingle", comment.articleId]);
      queryClient.invalidateQueries(["articles.getAll"]);
      queryClient.invalidateQueries(["articles.getMyArticles"]);
    },
  });
  return (
    <Card
      className="flex flex-col gap-3 justify-center items-stretch mb-6"
      style={{ width: 400 }}
      withBorder
      shadow="md"
    >
      <AppModal
        opened={!!deletedComment}
        loading={false}
        onClose={() => {
          setDeletedComment(null);
        }}
        onYes={() => {
          deleteComment.mutate(deletedComment ?? "");
        }}
        modalText={`Are you sure you want to delete this article?`}
      />
      <Title order={4}>
        {(comment?.author?.profile as any)?.name ?? "Anonymous"}
      </Title>
      <Text>{comment.content}</Text>
      <Text>Posted {timeAgo(comment.createdOn ?? Date.now())}</Text>
      {currentUser && currentUser._id === comment.createdById && (
        <Button
          variant="light"
          onClick={() => setDeletedComment(comment._id ?? "")}
          color="red"
        >
          Delete
        </Button>
      )}
    </Card>
  );
}
