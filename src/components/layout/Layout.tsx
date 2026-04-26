import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "./AdminSidebar";

export default function Layout({ children }: any) {
  return (
    <Flex h="100%">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <Box flex={1} p={6} overflow="auto">
        {children}
      </Box>
    </Flex>
  );
}