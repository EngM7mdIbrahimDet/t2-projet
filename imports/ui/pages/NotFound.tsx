import React from "react";
import Page from "../layouts/Page";
import { Title } from "@mantine/core";

export default function NotFoundPage() {
    return <Page center column gap={5}>
            <Title order={1}>404</Title>
            <Title order={2}>Page not found</Title>
    </Page>
}