import { AppShell, Box, Loader, ScrollArea } from "@mantine/core";
import React from "react";

import useCurrentUser from "/imports/hooks/current-user";
import { Navigate, matchPath, useLocation } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import AppHeader from "../components/AppHeader";

const loggedinRoutes = [
  "/articles/add",
  "/articles/:id/edit",
  "/articles/mine",
];

export default function Page({
  children,
  center = false,
  column = false,
  gap = 0,
  className,
}: {
  children: React.ReactNode;
  center?: boolean;
  column?: boolean;
  gap?: number;
  className?: string;
}) {
  const { currentUser, isLoading } = useCurrentUser();
  const location = useLocation();
  if (
    !currentUser &&
    !isLoading &&
    loggedinRoutes.some((route) => matchPath(location.pathname, route))
  ) {
    return <Navigate to="/login" />;
  }
  return (
    <AppShell padding={0} header={<AppHeader />}>
      <ScrollArea
        style={{ minHeight: "calc(100vh - 90px)", margin: "0px" }}
        className="w-full"
      >
        <Box
          style={{ minHeight: "calc(100vh - 90px)" }}
          className={`w-full h-full ${!!gap ? "gap-" + gap : ""} flex ${
            center || isLoading
              ? "items-center justify-center"
              : "justify-start items-center"
          } ${column ? "flex-col" : ""} ${className}`}
        >
          {isLoading ? <Loader size={50} /> : children}
        </Box>
      </ScrollArea>
    </AppShell>
  );
}
