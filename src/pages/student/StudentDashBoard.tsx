import {
  Flex,
  Heading,
  Grid,
  GridItem,
  Text,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiBook, FiFileText, FiBarChart2 } from "react-icons/fi";

export default function StudentDashboard() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();

  const card = {
    p: 6,
    borderRadius: "16px",
    cursor: "pointer",
    bg: isDark ? "rgba(20,20,22,0.75)" : "white",
    border: "1px solid",
    borderColor: isDark ? "whiteAlpha.200" : "blackAlpha.100",
    transition: "all 0.2s ease",
    _hover: {
      transform: "translateY(-4px)",
      boxShadow: "0 10px 30px rgba(0,224,102,0.25)",
    },
  };

  return (
    <Flex direction="column" p={8}>
      <Heading className="neon-text" mb={6}>
        Student Dashboard
      </Heading>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={6}>
        {/* My Courses */}
        <GridItem {...card} onClick={() => navigate("/student/courses")}>
          <Flex align="center" gap={4}>
            <Flex
              p={3}
              borderRadius="10px"
              bg="#00e066"
              color="black"
              align="center"
              justify="center"
            >
              <FiBook size={20} />
            </Flex>

            <Box>
              <Text fontWeight="700">My Courses</Text>
              <Text fontSize="sm" color="gray.400">
                View enrolled courses
              </Text>
            </Box>
          </Flex>
        </GridItem>

        {/* Assignments */}
        <GridItem {...card} onClick={() => navigate("/student/assignments")}>
          <Flex align="center" gap={4}>
            <Flex p={3} borderRadius="10px" bg="#00e066" color="black">
              <FiFileText size={20} />
            </Flex>

            <Box>
              <Text fontWeight="700">Assignments</Text>
              <Text fontSize="sm" color="gray.400">
                View & submit work
              </Text>
            </Box>
          </Flex>
        </GridItem>

        {/* Progress */}
        <GridItem {...card}>
          <Flex align="center" gap={4}>
            <Flex p={3} borderRadius="10px" bg="#00e066" color="black">
              <FiBarChart2 size={20} />
            </Flex>

            <Box>
              <Text fontWeight="700">Progress</Text>
              <Text fontSize="sm" color="gray.400">
                Track your learning
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
}
