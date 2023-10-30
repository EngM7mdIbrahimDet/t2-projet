import React from "react";
import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import useCurrentUser from "../hooks/current-user";
import HomePage from "./pages/HomePage";
import SingleArticlePage from "./pages/SingleArticlePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFound";
import AddArticlePage from "./pages/AddArticlePage";
import EditArticlePage from "./pages/EditArticlePage";
import MyArticlesPage from "./pages/MyArticlesPage";

const queryClient = new QueryClient();
export const App = () => {
  const currentUser = useCurrentUser();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withCSSVariables withGlobalStyles theme={DEFAULT_THEME}>
        <NotificationsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/articles/:id" element={<SingleArticlePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/not-found" element={<NotFoundPage />} />
              {currentUser && (
                <>
                  <Route path="/articles/add" element={<AddArticlePage />} />
                  <Route
                    path="/articles/:id/edit"
                    element={<EditArticlePage />}
                  />
                  <Route path="/articles/mine" element={<MyArticlesPage />} />
                </>
              )}
              <Route path="*" element={<Navigate to={"/not-found"} />} />
            </Routes>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
