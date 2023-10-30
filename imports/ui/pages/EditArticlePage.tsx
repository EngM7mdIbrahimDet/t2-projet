import React from "react";
import Page from "../layouts/Page";
import {
  Button,
  Card,
  Loader,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useFormik } from "formik";
import { IArticle } from "/imports/types/IArticle";
import * as Yup from "yup";
import {
  useAddArticle,
  useGetSingleArticle,
  useUpdateArticle,
} from "/imports/hooks/requests/Articles";
import { showNotification } from "@mantine/notifications";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import timeAgo from "/imports/utils/date-formatter";
export default function EditArticlePage() {
  const { id } = useParams();
  const formik = useFormik<IArticle>({
    initialValues: {
      _id: "",
      title: "",
      text: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Please enter a title!"),
      text: Yup.string().required("Please enter a content!"),
    }),
    onSubmit: (values) => {
      editArticle.mutate(values);
    },
  });
  const goTo = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: article,
    isLoading,
    isError,
  } = useGetSingleArticle(id ?? "", {
    onSuccess: (article) => {
      formik.setValues({
        _id: article._id,
        title: article.title,
        text: article.text,
      });
    },
  });
  const editArticle = useUpdateArticle({
    onSuccess: () => {
      showNotification({
        title: "Article Updated!",
        message: "Your article has been added successfully!",
      });
      formik.resetForm();
      goTo(`/articles/${formik.values._id}`);
      queryClient.invalidateQueries(["articles.getAll"]);
      queryClient.invalidateQueries(["articles.getMyArticles"]);
    },
  });
  return (
    <Page center column gap={5}>
      {isLoading ? (
        <Loader size={40} />
      ) : isError ? (
        <div>Error!</div>
      ) : (
        <>
          <Title order={2}>Create your article</Title>
          <Card style={{ width: 400 }} withBorder shadow="md">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-3 justify-center items-stretch"
            >
              <TextInput
                label="Title"
                placeholder="Title"
                disabled={editArticle.isLoading}
                {...formik.getFieldProps("title")}
                {...formik.getFieldMeta("title")}
              />
              <Textarea
                label="Article's content"
                placeholder="What is on your mind?"
                autosize
                disabled={editArticle.isLoading}
                minRows={10}
                {...formik.getFieldMeta("text")}
                {...formik.getFieldProps("text")}
              />
              <Button
                loading={editArticle.isLoading}
                variant="light"
                type="submit"
              >
                Update Article
              </Button>
              <Text>
                {article?.modifiedOn
                  ? `Last edited ${timeAgo(article?.modifiedOn ?? Date.now())}`
                  : `Posted ${timeAgo(article?.createdOn ?? Date.now())}`}
              </Text>
            </form>
          </Card>
        </>
      )}
    </Page>
  );
}
