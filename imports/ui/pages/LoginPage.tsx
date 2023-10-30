import React from "react";
import Page from "../layouts/Page";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "/imports/hooks/requests/Accounts";
import { showNotification } from "@mantine/notifications";
import {
  Anchor,
  Button,
  Card,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

export default function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email!")
        .required("Please enter an email!"),
      password: Yup.string()
        .min(8, "Please enter at least 8 characters!")
        .required("Please enter a password!"),
    }),
    onSubmit: (values) => {
      login.mutate(values);
    },
  });
  const goTo = useNavigate();
  const login = useLoginUser({
    onSuccess: () => {
      showNotification({
        title: "Hello there!",
        message: "You have logged in now!",
        color: "green",
      });
      goTo("/");
    },
  });
  return (
    <Page center>
      <Card style={{ width: 400 }} withBorder shadow="md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e); // This is the function that handles the submit
          }}
          className="flex flex-col gap-3 justify-center items-stretch"
        >
          <Title order={2}>Login Now</Title>
          <TextInput
            label="Email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
            {...formik.getFieldMeta("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
            {...formik.getFieldMeta("password")}
          />
          <Text align="center">
            Don't you have an account?{" "}
            <Anchor
              onClick={(e) => {
                e.preventDefault();
                goTo("/login");
              }}
            >
              Register Now
            </Anchor>
          </Text>
          <Button loading={login.isLoading} variant="light" type="submit">
            Login
          </Button>
        </form>
      </Card>
    </Page>
  );
}
