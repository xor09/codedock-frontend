import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function StudentCourses() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  // ✅ Dummy data (backend-ready structure)
  const [courses] = useState([
    { id: 1, name: "React Basics", instructor: "John Doe", progress: 70 },
    { id: 2, name: "Node.js", instructor: "Jane Smith", progress: 40 },
    { id: 3, name: "MongoDB", instructor: "Alex", progress: 90 },
  ]);

  return (
    <Flex direction="column" p={8}>
      
      {/* HEADER */}
      <Heading className="neon-text" mb={6}>
        My Courses
      </Heading>

      {/* TABLE CONTAINER */}
      <Box
        borderRadius="16px"
        overflow="hidden"
        bg={isDark ? "rgba(20,20,22,0.75)" : "white"}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={isDark ? "whiteAlpha.200" : "blackAlpha.100"}
      >
        <Table>
          <Thead>
            <Tr>
              <Th>Course</Th>
              <Th>Instructor</Th>
              <Th>Progress</Th>
            </Tr>
          </Thead>

          <Tbody>
            {courses.map((course) => (
              <Tr key={course.id}>
                
                {/* Course Name */}
                <Td color="#00e066" fontWeight="600">
                  {course.name}
                </Td>

                {/* Instructor */}
                <Td>{course.instructor}</Td>

                {/* Progress */}
                <Td>
                  <Box>
                    <Progress
                      value={course.progress}
                      size="sm"
                      borderRadius="full"
                      bg={isDark ? "whiteAlpha.200" : "gray.200"}
                      sx={{
                        "& > div": {
                          background:
                            "linear-gradient(90deg, #00e066, #00b352)",
                        },
                      }}
                    />
                    <Text fontSize="xs" mt={1}>
                      {course.progress}%
                    </Text>
                  </Box>
                </Td>

              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}