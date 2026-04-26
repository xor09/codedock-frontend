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
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import AssignmentModal from "../../components/teacher/AssignmentModal";

export default function TeacherAssignments() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [assignments, setAssignments] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  return (
    <Flex direction="column" p={8}>

      {/* ✅ HEADER */}
      <Flex justify="space-between" align="center" mb={4}>
        <Heading className="neon-text">Assignments</Heading>

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
            + Create Assignment
          </Button>
        </HStack>
      </Flex>

      {/* ✅ TABLE CONTAINER (GLASS UI) */}
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
              <Th>Student</Th>
              <Th>Title</Th>
              <Th>Status</Th>
              <Th>Feedback</Th>
            </Tr>
          </Thead>

          <Tbody>
            {assignments.map((a) => (
              <Tr key={a.id}>
                <Td color="#00e066" fontWeight="600">
                  {a.student}
                </Td>
                <Td>{a.title}</Td>

                {/* ✅ Status Highlight */}
                <Td>
                  <Text
                    color={
                      a.status === "Completed"
                        ? "green.400"
                        : a.status === "Pending"
                        ? "yellow.400"
                        : "red.400"
                    }
                    fontWeight="600"
                  >
                    {a.status}
                  </Text>
                </Td>

                <Td>{a.feedback}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* ✅ MODAL */}
      <AssignmentModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={(data: any) =>
          setAssignments([...assignments, { id: Date.now(), ...data }])
        }
      />
    </Flex>
  );
}