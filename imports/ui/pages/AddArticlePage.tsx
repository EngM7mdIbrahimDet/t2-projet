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
export default function AddArticlePage() {
  const formik = useFormik<IArticle>({
    initialValues: {
      title: "",
      text: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Please enter a title!"),
      text: Yup.string().required("Please enter a content!"),
    }),
    onSubmit: (values) => {
      addArticle.mutate(values);
    },
  });
  const goTo = useNavigate();
  const queryClient = useQueryClient();
  const addArticle = useAddArticle({
    onSuccess: (articleID) => {
      showNotification({
        title: "Article added!",
        message: "Your article has been added successfully!",
      });
      formik.resetForm();
      goTo(`/articles/${articleID}`);
      queryClient.invalidateQueries(["articles.getAll"]);
      queryClient.invalidateQueries(["articles.getMyArticles"]);
    },
  });
  return (
    <Page center column gap={5}>
      <Title order={2}>Create your article</Title>
      <Card style={{ width: 400 }} withBorder shadow="md">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-3 justify-center items-stretch"
        >
          <TextInput
            label="Title"
            placeholder="Title"
            disabled={addArticle.isLoading}
            {...formik.getFieldProps("title")}
            {...formik.getFieldMeta("title")}
          />
          <Textarea
            label="Article's content"
            placeholder="What is on your mind?"
            autosize
            disabled={addArticle.isLoading}
            minRows={10}
            {...formik.getFieldMeta("text")}
            {...formik.getFieldProps("text")}
          />
          <Button loading={addArticle.isLoading} variant="light" type="submit">
            Add Article
          </Button>
        </form>
      </Card>
    </Page>
  );
}
