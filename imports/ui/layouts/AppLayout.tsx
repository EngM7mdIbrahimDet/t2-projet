import React from "react";
import { AppShell, ScrollArea } from "@mantine/core";

export default function AppLayout({ children }: { children: any }) {
  return (
    <AppShell
      padding={0}
      header={<></>}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
        <ScrollArea
          style={{ minHeight: "calc(100vh - 90px)", margin: "0px" }}
          className="w-full"
        >
          {children}
        </ScrollArea>
    </AppShell>
  );
}
