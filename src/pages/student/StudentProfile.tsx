import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Button,
  useColorMode,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function StudentProfile() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  // ✅ Dummy user data (backend-ready)
  const [user] = useState({
    name: "Navnit Kumar",
    email: "navnit@example.com",
    role: "Student",
    course: "Full Stack Development",
  });

  return (
    <Flex direction="column" p={8}>
      {/* HEADER */}
      <Heading className="neon-text" mb={6}>
        My Profile
      </Heading>

      {/* PROFILE CARD */}
      <Box
        maxW="500px"
        borderRadius="20px"
        p={6}
        bg={isDark ? "rgba(20,20,22,0.75)" : "white"}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={isDark ? "whiteAlpha.200" : "blackAlpha.100"}
      >
        <VStack spacing={6} align="center">
          {/* Avatar */}
          <Avatar size="xl" name={user.name} bg="#00e066" color="black" />

          {/* User Info */}
          <VStack spacing={2}>
            <Text fontSize="xl" fontWeight="700" color="#00e066">
              {user.name}
            </Text>

            <Text fontSize="sm" color="gray.400">
              {user.email}
            </Text>

            <HStack spacing={2}>
              <Text fontSize="sm">Role:</Text>
              <Text fontSize="sm" color="#00e066" fontWeight="600">
                {user.role}
              </Text>
            </HStack>

            <HStack spacing={2}>
              <Text fontSize="sm">Course:</Text>
              <Text fontSize="sm" fontWeight="600">
                {user.course}
              </Text>
            </HStack>
          </VStack>

          {/* Edit Button */}
          <Button
            mt={4}
            bg="linear-gradient(135deg, #00e066, #00b352)"
            color="black"
            fontWeight="700"
            _hover={{
              transform: "translateY(-1px)",
              boxShadow: "0 6px 20px rgba(0,224,102,0.4)",
            }}
          >
            Edit Profile
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
