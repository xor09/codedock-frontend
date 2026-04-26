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
  Checkbox,
  Button,
  useColorMode,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import AddCourseModal from "../../components/teacher/AddCourseModal";
import NotesModal from "../../components/teacher/NotesModal";


export default function TeacherCourses() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [courses, setCourses] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);

  const [openCourse, setOpenCourse] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);

  //  Toggle topic completion
  const toggle = (id: number) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, completed: !c.completed } : c
      )
    );
  };

  //  Save Notes / Homework
  const handleSaveNotes = (data: any) => {
    setNotes([...notes, { id: Date.now(), ...data }]);
  };

  return (
   
    <Flex direction="column" p={8}>
      {/* HEADER */}
      <Flex justify="space-between" align="center" mb={4}>
        <Heading className="neon-text">Courses</Heading>

        <HStack>
          <Button
            bg="linear-gradient(135deg, #00e066, #00b352)"
            color="black"
            fontWeight="700"
            onClick={() => setOpenCourse(true)}
          >
            + Add Course
          </Button>

          <Button
            variant="outline"
            borderColor="#00e066"
            color="#00e066"
            onClick={() => setOpenNotes(true)}
          >
            + Add Notes
          </Button>
        </HStack>
      </Flex>

      {/* COURSES TABLE */}
      <Box
        borderRadius="16px"
        overflow="hidden"
        bg={isDark ? "rgba(20,20,22,0.75)" : "white"}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={isDark ? "whiteAlpha.200" : "blackAlpha.100"}
        mb={6}
      >
        <Table>
          <Thead>
            <Tr>
              <Th>Course</Th>
              <Th>Topic</Th>
              <Th>Completed</Th>
            </Tr>
          </Thead>

          <Tbody>
            {courses.map((c) => (
              <Tr key={c.id}>
                <Td>{c.name}</Td>
                <Td>{c.topic}</Td>
                <Td>
                  <Checkbox
                    isChecked={c.completed}
                    onChange={() => toggle(c.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* NOTES / HOMEWORK TABLE */}
      <Box
        borderRadius="16px"
        overflow="hidden"
        bg={isDark ? "rgba(20,20,22,0.75)" : "white"}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={isDark ? "whiteAlpha.200" : "blackAlpha.100"}
      >
        <Heading size="md" p={4}>
          Notes & Homework
        </Heading>

        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>

          <Tbody>
            {notes.map((n) => (
              <Tr key={n.id}>
                <Td color="#00e066" fontWeight="600">
                  {n.title}
                </Td>
                <Td>
                  <Text>
                    {n.type === "HOMEWORK" ? "📚 Homework" : "📝 Notes"}
                  </Text>
                </Td>
                <Td>{n.description}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/*  MODALS */}

      {/* Add Course */}
      <AddCourseModal
        isOpen={openCourse}
        onClose={() => setOpenCourse(false)}
        onSubmit={(data: any) =>
          setCourses([
            ...courses,
            { id: Date.now(), completed: false, ...data },
          ])
        }
      />

      {/* Add Notes */}
      <NotesModal
        isOpen={openNotes}
        onClose={() => setOpenNotes(false)}
        onSave={handleSaveNotes}
      />
    </Flex>
  
  );
}