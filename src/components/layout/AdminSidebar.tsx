import {
  Box,
  VStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FiUsers, FiBookOpen, FiHome, FiActivity } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: FiHome, path: "/admin" },
    { label: "Users", icon: FiUsers, path: "/admin/users" },
    { label: "Courses", icon: FiBookOpen, path: "/admin/courses" },
    {label: "Analytics", icon: FiActivity, path: "/admin/analytics"}
  ];

  return (
    <Box
      w="240px"
      h="100%"
      p={4}
      bg={isDark ? "rgba(20,20,22,0.8)" : "white"}
      borderRight="1px solid"
      borderColor={isDark ? "whiteAlpha.200" : "blackAlpha.100"}
      backdropFilter="blur(20px)"
    >
      <VStack align="stretch" spacing={2}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Box
              key={item.label}
              px={4}
              py={3}
              borderRadius="12px"
              display="flex"
              alignItems="center"
              gap={3}
              cursor="pointer"
              bg={isActive ? "rgba(0,224,102,0.15)" : "transparent"}
              color={isActive ? "#00e066" : undefined}
              _hover={{
                bg: "rgba(0,224,102,0.1)",
                transform: "translateX(4px)",
              }}
              transition="all 0.2s ease"
              onClick={() => navigate(item.path)}
            >
              <item.icon />
              <Text fontWeight="600">{item.label}</Text>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}