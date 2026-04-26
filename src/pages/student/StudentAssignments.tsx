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
  Button,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";

export default function StudentAssignments() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  // ✅ Dummy data (backend-ready)
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "React Project",
      course: "React Basics",
      status: "Pending",
    },
    {
      id: 2,
      title: "API Integration",
      course: "Node.js",
      status: "Submitted",
    },
    {
      id: 3,
      title: "Database Design",
      course: "MongoDB",
      status: "Reviewed",
    },
  ]);

  // ✅ Simulate submit action (UI only)
  const handleSubmit = (id:any) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Submitted" } : a)),
    );
  };

  return (
    <Flex direction="column" p={8}>
      {/* HEADER */}
      <Heading className="neon-text" mb={6}>
        My Assignments
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
              <Th>Title</Th>
              <Th>Course</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {assignments.map((a) => (
              <Tr key={a.id}>
                {/* Title */}
                <Td color="#00e066" fontWeight="600">
                  {a.title}
                </Td>

                {/* Course */}
                <Td>{a.course}</Td>

                {/* Status */}
                <Td>
                  <Text
                    fontWeight="600"
                    color={
                      a.status === "Reviewed"
                        ? "green.400"
                        : a.status === "Submitted"
                          ? "blue.400"
                          : "yellow.400"
                    }
                  >
                    {a.status}
                  </Text>
                </Td>

                {/* Action */}
                <Td>
                  {a.status === "Pending" && (
                    <Button
                      size="sm"
                      bg="linear-gradient(135deg, #00e066, #00b352)"
                      color="black"
                      onClick={() => handleSubmit(a.id)}
                      _hover={{
                        transform: "translateY(-1px)",
                        boxShadow: "0 6px 20px rgba(0,224,102,0.4)",
                      }}
                    >
                      Submit
                    </Button>
                  )}

                  {a.status === "Submitted" && (
                    <Text color="blue.400" fontSize="sm">
                      Waiting Review
                    </Text>
                  )}

                  {a.status === "Reviewed" && (
                    <Text color="green.400" fontSize="sm">
                      Completed
                    </Text>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}
