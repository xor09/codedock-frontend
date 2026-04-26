import {
  Box,
  Button,
  Heading,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { College, Teacher, Student } from "../../types";

type Props = {
  college: College;
  onBack: () => void;
  onSelectUser: (user: Teacher | Student) => void;
};

export default function CollegeDetails({
  college,
  onBack,
  onSelectUser,
}: Props) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [type, setType] = useState<"TEACHER" | "STUDENT">("TEACHER");

  const teachers: Teacher[] = [
    { id: 1, name: "John Doe", subject: "React", progress: 70 },
    { id: 2, name: "Jane Smith", subject: "Spring Boot", progress: 50 },
  ];

  const students: Student[] = [
    { id: 1, name: "Aman", course: "React", progress: 80 },
    { id: 2, name: "Riya", course: "Java", progress: 60 },
  ];

  return (
    <Flex direction="column">
      {/* 🔹 Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <Box>
          <Heading className="neon-text">{college.name}</Heading>
          <Text
            fontSize="sm"
            color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
          >
            View teachers and students performance
          </Text>
        </Box>

        <Button onClick={onBack}>← Back</Button>
      </Flex>

      {/* 🔹 Filter */}
      <Select
        mb={4}
        value={type}
        onChange={(e) =>
          setType(e.target.value as "TEACHER" | "STUDENT")
        }
        maxW="200px"
      >
        <option value="TEACHER">Teachers</option>
        <option value="STUDENT">Students</option>
      </Select>

      {/* 🔹 Table Container */}
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
              <Th>Name</Th>
              <Th>{type === "TEACHER" ? "Subject" : "Course"}</Th>
              <Th>Progress</Th>
            </Tr>
          </Thead>

          <Tbody>
            {type === "TEACHER" &&
              teachers.map((u) => (
                <Tr
                  key={u.id}
                  cursor="pointer"
                  _hover={{ bg: "rgba(0,224,102,0.1)" }}
                  onClick={() => onSelectUser(u)}
                >
                  <Td color="#00e066" fontWeight="600">
                    {u.name}
                  </Td>
                  <Td>{u.subject}</Td>
                  <Td>{u.progress}%</Td>
                </Tr>
              ))}

            {type === "STUDENT" &&
              students.map((u) => (
                <Tr
                  key={u.id}
                  cursor="pointer"
                  _hover={{ bg: "rgba(0,224,102,0.1)" }}
                  onClick={() => onSelectUser(u)}
                >
                  <Td color="#00e066" fontWeight="600">
                    {u.name}
                  </Td>
                  <Td>{u.course}</Td>
                  <Td>{u.progress}%</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}