import {
  Box,
  Button,
  Card,
  Modal,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
export default function AppModal({
  opened,
  onClose,
  modalText,
  onYes,
  loading,
}: {
  opened: boolean;
  onClose: () => void;
  modalText: string;
  onYes: () => void;
  loading: boolean;
}) {
  const theme = useMantineTheme();
  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <Card>
        <Title align="center" order={3}>
          {modalText}
        </Title>
        <Box className="flex justify-center gap-5 mt-5">
          <Button
            loading={loading}
            variant="outline"
            color="red"
            onClick={onYes}
          >
            Yes
          </Button>
          <Button disabled={loading} variant="outline" onClick={onClose}>
            No
          </Button>
        </Box>
      </Card>
    </Modal>
  );
}
