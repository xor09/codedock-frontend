import {
  Box,
  VStack,
  Text,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import { FiHome, FiBookOpen, FiUsers, FiFileText } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

export default function TeacherSidebar() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: FiHome, path: "/teacher" },
    { label: "Courses", icon: FiBookOpen, path: "/teacher/courses" },
    { label: "Students", icon: FiUsers, path: "/teacher/student" },
    { label: "Assignments", icon: FiFileText, path: "/teacher/assignment" },
  ];

  return (
    <Box
      w="240px"
      h="100vh"
      p={4}
      bg={isDark ? "rgba(20,20,22,0.85)" : "white"}
      backdropFilter="blur(20px)"
      borderRight="1px solid"
      borderColor={isDark ? "whiteAlpha.200" : "blackAlpha.100"}
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
              cursor="pointer"
              transition="all 0.2s ease"
              bg={isActive ? "rgba(0,224,102,0.15)" : "transparent"}
              border={isActive ? "1px solid #00e066" : "1px solid transparent"}
              _hover={{
                bg: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.05)",
                transform: "translateX(4px)",
              }}
              onClick={() => navigate(item.path)}
            >
              <HStack spacing={3}>
                <Box
                  color={isActive ? "#00e066" : isDark ? "whiteAlpha.700" : "blackAlpha.700"}
                  fontSize="18px"
                >
                  <item.icon />
                </Box>

                <Text
                  fontWeight="600"
                  color={isActive ? "#00e066" : "inherit"}
                >
                  {item.label}
                </Text>
              </HStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}