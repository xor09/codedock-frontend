import {
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useColorMode,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import TerminalToast from "../../components/TerminalToast";
import { TOAST_COLOR } from "../../constants";


export default function ManageCourses() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const toast = useToast();

  // 🔥 Dummy teachers (later from API / context)
  const teachers = [
    { id: 1, name: "Jane Smith", subject: "React" },
    { id: 2, name: "Rahul Sharma", subject: "Spring Boot" },
  ];

  // 🔥 Courses State
  const [courses, setCourses] = useState([
    { id: 1, title: "React Basics", instructor: "Jane Smith" },
  ]);

  // 🔥 Modal State
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    teacherId: "",
  });

  // 🔥 Add Course
  const handleAddCourse = () => {
    const selectedTeacher = teachers.find(
      (t) => t.id === Number(form.teacherId)
    );

    const newCourse = {
      id: Date.now(),
      title: form.title,
      instructor: selectedTeacher?.name || "",
    };

    setCourses([...courses, newCourse]);

    setIsOpen(false);
    setForm({ title: "", teacherId: "" });

    toast({
      position: "top-right",
      duration: 2000,
      render: () => (
        <TerminalToast
          title="Course Created"
          description="Course added successfully"
          accentColor={TOAST_COLOR.success}
        />
      ),
    });
  };

  // 🔥 Delete
  const handleDelete = (id: number) => {
    setCourses(courses.filter((c) => c.id !== id));

    toast({
      position: "top-right",
      duration: 2000,
      render: () => (
        <TerminalToast
          title="Course Deleted"
          description="Course removed successfully"
          accentColor={TOAST_COLOR.success}
        />
      ),
    });
  };

  return (
    
      <Flex direction="column" p={8}>
        {/* Header */}
        <Flex justify="space-between" align="center" mb={4}>
          <Box>
            <Heading className="neon-text">Manage Courses</Heading>
            <Text
              color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
              fontSize="sm"
            >
              Create and assign courses to teachers
            </Text>
          </Box>

          {/* 🔥 ADD BUTTON */}
          <Button
            bg="linear-gradient(135deg, #00e066, #00b352)"
            color="black"
            fontWeight="700"
            onClick={() => setIsOpen(true)}
          >
            + Add Course
          </Button>
        </Flex>

        {/* Table */}
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
                <Th>Course Name</Th>
                <Th>Instructor</Th>
                <Th textAlign="right">Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses.map((course) => (
                <Tr key={course.id}>
                  <Td>{course.title}</Td>
                  <Td>{course.instructor}</Td>
                  <Td textAlign="right">
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      leftIcon={<FiTrash2 />}
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* 🔥 MODAL */}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Course</ModalHeader>

            <ModalBody>
              <Input
                placeholder="Course Name"
                mb={3}
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <Select
                placeholder="Select Teacher"
                value={form.teacherId}
                onChange={(e) =>
                  setForm({ ...form, teacherId: e.target.value })
                }
              >
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.subject})
                  </option>
                ))}
              </Select>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                bg="#00e066"
                color="black"
                onClick={handleAddCourse}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
   
  );
}