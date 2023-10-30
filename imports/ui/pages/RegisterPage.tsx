import React from "react";
import Page from "../layouts/Page";
import {
  Anchor,
  Button,
  Card,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  useLoginUser,
  useRegisterUser,
} from "/imports/hooks/requests/Accounts";
import { showNotification } from "@mantine/notifications";

export default function RegisterPage() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, "Please enter at least 3 characters!")
        .required("Please enter a name!"),
      email: Yup.string()
        .email("Please enter a valid email!")
        .required("Please enter an email!"),
      password: Yup.string()
        .min(8, "Please enter at least 8 characters!")
        .required("Please enter a password!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match!")
        .required("Please confirm your password!"),
    }),
    onSubmit: (values) => {
      registerUser.mutate(values);
    },
  });
  const goTo = useNavigate();
  const login = useLoginUser({
    onSuccess: () => {
      showNotification({
        title: "Account Created!",
        message: "Your account has been created successfully!",
        color: "green",
      });
      goTo("/");
    },
  });
  const registerUser = useRegisterUser({
    onSuccess: () => {
      login.mutate({
        email: formik.values.email,
        password: formik.values.password,
      });
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
          <Title order={2}>Register Now</Title>
          <TextInput
            label="Name"
            placeholder="Name"
            {...formik.getFieldProps("name")}
            {...formik.getFieldMeta("name")}
          />
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
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            {...formik.getFieldProps("confirmPassword")}
            {...formik.getFieldMeta("confirmPassword")}
          />
          <Text align="center">
            Already have an account?{" "}
            <Anchor
              onClick={(e) => {
                e.preventDefault();
                goTo("/login");
              }}
            >
              Login
            </Anchor>
          </Text>
          <Button
            loading={login.isLoading || registerUser.isLoading}
            variant="light"
            type="submit"
          >
            Register
          </Button>
        </form>
      </Card>
    </Page>
  );
}
