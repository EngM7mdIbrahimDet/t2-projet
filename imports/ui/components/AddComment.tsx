import React from "react";
import Page from "../layouts/Page";
import { Button, Card, TextInput, Textarea, Title } from "@mantine/core";
import { useFormik } from "formik";
import { IArticle } from "/imports/types/IArticle";
import * as Yup from "yup";
import { useAddArticle } from "/imports/hooks/requests/Articles";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { IComment } from "/imports/types/IComment";
import { useAddComment } from "/imports/hooks/requests/Comments";
export default function AddComment({ articleId }: { articleId: string }) {
  const formik = useFormik<IComment>({
    initialValues: {
      articleId,
      content: "",
    },
    validationSchema: Yup.object().shape({
      content: Yup.string().required("You cannot post an empty comment!"),
    }),
    onSubmit: (values) => {
      addComment.mutate(values);
    },
  });
  const queryClient = useQueryClient();
  const addComment = useAddComment({
    onSuccess: () => {
      showNotification({
        title: "Comment added!",
        message: "Your comment has been added successfully!",
      });
      formik.resetForm();
      queryClient.invalidateQueries(["articles.getSingle", articleId]);
      queryClient.invalidateQueries(["articles.getAll"]);
      queryClient.invalidateQueries(["articles.getMyArticles"]);
    },
  });
  return (
    <Card style={{ width: 400 }} withBorder shadow="md">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-3 justify-center items-stretch"
      >
        <Textarea
          label="Do you want to comment ?"
          placeholder="What do you think about this post?"
          autosize
          disabled={addComment.isLoading}
          minRows={4}
          {...formik.getFieldMeta("content")}
          {...formik.getFieldProps("content")}
        />
        <Button loading={addComment.isLoading} variant="light" type="submit">
          Add Comment
        </Button>
      </form>
    </Card>
  );
}
