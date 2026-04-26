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
  useColorMode,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import AddStudentModal from "../../components/teacher/AddStudentModal";

export default function TeacherStudents() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [students, setStudents] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  return (
    <Flex direction="column" p={8}>
      
      {/* ✅ HEADER (same as Courses) */}
      <Flex justify="space-between" align="center" mb={4}>
        <Heading className="neon-text">Students</Heading>

        <HStack>
          <Button
            bg="linear-gradient(135deg, #00e066, #00b352)"
            color="black"
            fontWeight="700"
            onClick={() => setOpen(true)}
            _hover={{
              transform: "translateY(-1px)",
              boxShadow: "0 6px 20px rgba(0,224,102,0.4)",
            }}
          >
            + Add Student
          </Button>
        </HStack>
      </Flex>

      {/* ✅ TABLE (same glass style as Courses) */}
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
              <Th>Course</Th>
            </Tr>
          </Thead>

          <Tbody>
            {students.map((s) => (
              <Tr key={s.id}>
                <Td color="#00e066" fontWeight="600">
                  {s.name}
                </Td>
                <Td>{s.course}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* ✅ MODAL */}
      <AddStudentModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={(data: any) =>
          setStudents([...students, { id: Date.now(), ...data }])
        }
      />
    </Flex>
  );
}