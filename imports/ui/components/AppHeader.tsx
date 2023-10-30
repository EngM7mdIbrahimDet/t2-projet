import { Box, Button, Title } from "@mantine/core";
import React from "react";
import useCurrentUser from "/imports/hooks/current-user";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";

const sharedRoutes = [
  {
    path: "/",
    label: "Home",
  },
];
const loggedinRoutes = [
  ...sharedRoutes,
  {
    path: "/articles/add",
    label: "Add Article",
  },
  {
    path: "/articles/mine",
    label: "My Articles",
  },
];
const guestRoutes = [
  ...sharedRoutes,
  {
    path: "/login",
    label: "Login",
  },
  {
    path: "/register",
    label: "Register",
  },
];

export default function AppHeader() {
  const { currentUser } = useCurrentUser();
  const goTo = useNavigate();
  return (
    <Box className="h-16 w-full mb-11 flex items-center justify-center gap-3">
      {currentUser && (
        <Title order={5}>Hello {(currentUser.profile as any)?.name}</Title>
      )}
      {currentUser
        ? loggedinRoutes.map((route) => (
            <Button
              key={route.path}
              variant="light"
              onClick={() => {
                goTo(route.path);
              }}
            >
              {route.label}
            </Button>
          ))
        : guestRoutes.map((route) => (
            <Button
              key={route.path}
              variant="light"
              onClick={() => {
                goTo(route.path);
              }}
            >
              {route.label}
            </Button>
          ))}
      {currentUser && (
        <Button
          variant="light"
          onClick={() => {
            Meteor.logout();
            goTo("/login");
          }}
        >
          Logout
        </Button>
      )}
    </Box>
  );
}
