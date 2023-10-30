import React from "react";
import { IArticle } from "/imports/types/IArticle";
import { Box, Button, Card, Text, Title } from "@mantine/core";
import timeAgo from "/imports/utils/date-formatter";
import useCurrentUser from "/imports/hooks/current-user";
import { useNavigate } from "react-router-dom";

export default function ArticlePreview({
  article,
  onDelete,
  hideShowArticle = false,
}: {
  article: IArticle;
  onDelete: () => void;
  hideShowArticle?: boolean;
}) {
  const { currentUser } = useCurrentUser();
  const goTo = useNavigate();
  return (
    <Card
      className="flex flex-col gap-3 justify-center items-stretch mb-6"
      style={{ width: 400 }}
      withBorder
      shadow="md"
    >
      <Title order={4}>{article.title}</Title>
      <Title order={5}>
        By {(article?.author?.profile as any)?.name ?? "Anonymous"}
      </Title>
      <Text>{article.text}</Text>
      <Text>Posted {timeAgo(article.createdOn ?? Date.now())}</Text>
      <Text>{article?.commentsCount} Comments</Text>
      <Box className="flex items-center justify-start gap-1">
        {!hideShowArticle && (
          <Button
            variant="light"
            onClick={(e) => goTo(`/articles/${article?._id}`)}
          >
            Show Article
          </Button>
        )}
        {currentUser?._id === article?.createdById && (
          <>
            {" "}
            <Button
              variant="light"
              onClick={(e) => goTo(`/articles/${article?._id}/edit`)}
            >
              Edit Article
            </Button>
            <Button variant="light" color="red" onClick={() => onDelete()}>
              Delete Article
            </Button>
          </>
        )}
      </Box>
    </Card>
  );
}
