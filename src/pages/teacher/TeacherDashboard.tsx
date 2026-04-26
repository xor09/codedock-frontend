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
import { FiBook, FiUsers, FiFileText } from "react-icons/fi";

export default function TeacherDashboard() {
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
        Teacher Dashboard
      </Heading>

      <Grid templateColumns="repeat(3,1fr)" gap={6}>
        
        {/* Courses */}
        <GridItem {...card} onClick={() => navigate("/teacher/courses")}>
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
              <Text fontWeight="700">Courses</Text>
              <Text fontSize="sm" color="gray.400">
                Manage your courses
              </Text>
            </Box>
          </Flex>
        </GridItem>

        {/* Students */}
        <GridItem {...card} onClick={() => navigate("/teacher/student")}>
          <Flex align="center" gap={4}>
            <Flex
              p={3}
              borderRadius="10px"
              bg="#00e066"
              color="black"
              align="center"
              justify="center"
            >
              <FiUsers size={20} />
            </Flex>

            <Box>
              <Text fontWeight="700">Students</Text>
              <Text fontSize="sm" color="gray.400">
                View enrolled students
              </Text>
            </Box>
          </Flex>
        </GridItem>

        {/* Assignments */}
        <GridItem {...card} onClick={() => navigate("/teacher/assignment")}>
          <Flex align="center" gap={4}>
            <Flex
              p={3}
              borderRadius="10px"
              bg="#00e066"
              color="black"
              align="center"
              justify="center"
            >
              <FiFileText size={20} />
            </Flex>

            <Box>
              <Text fontWeight="700">Assignments</Text>
              <Text fontSize="sm" color="gray.400">
                Manage assignments
              </Text>
            </Box>
          </Flex>
        </GridItem>

      </Grid>
    </Flex>
  );
}