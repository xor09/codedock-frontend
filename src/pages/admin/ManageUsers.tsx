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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";


import TeacherForm from "../../components/forms/TeacherForm";
import StudentForm from "../../components/forms/StudentForm";
import PlacementModal from "../../components/modals/PlacementModals";
import TerminalToast from "../../components/TerminalToast";
import { TOAST_COLOR } from "../../constants";

export default function ManageUsers() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const toast = useToast();

  // USERS
  const [users, setUsers] = useState<any[]>([]);

  // MODALS
  const [openTeacher, setOpenTeacher] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [placementUser, setPlacementUser] = useState<any>(null);

  // FORM STATE
  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    age: "",
    subject: "",
    experience: "",
  });

  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    progress: "",
  });

  // DELETE
  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));

    toast({
      position: "top-right",
      duration: 2000,
      render: () => (
        <TerminalToast
          title="User Deleted"
          description="User removed successfully"
          accentColor={TOAST_COLOR.success}
        />
      ),
    });
  };

  // ADD TEACHER
  const handleAddTeacher = () => {
    setUsers([
      ...users,
      { id: Date.now(), role: "TEACHER", ...teacherForm },
    ]);

    setOpenTeacher(false);
    setTeacherForm({
      name: "",
      email: "",
      age: "",
      subject: "",
      experience: "",
    });

    toast({
      position: "top-right",
      duration: 2000,
      render: () => (
        <TerminalToast
          title="Teacher Added"
          description="Teacher created successfully"
          accentColor={TOAST_COLOR.success}
        />
      ),
    });
  };

  // ADD STUDENT
  const handleAddStudent = () => {
    setUsers([
      ...users,
      { id: Date.now(), role: "STUDENT", placed: false, ...studentForm },
    ]);

    setOpenStudent(false);
    setStudentForm({
      name: "",
      email: "",
      age: "",
      course: "",
      progress: "",
    });

    toast({
      position: "top-right",
      duration: 2000,
      render: () => (
        <TerminalToast
          title="Student Added"
          description="Student created successfully"
          accentColor={TOAST_COLOR.success}
        />
      ),
    });
  };

  // PLACEMENT
  const handlePlacementSave = (data: any) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === placementUser.id
          ? { ...u, placed: true, ...data }
          : u
      )
    );
    setPlacementUser(null);

    toast({
      position: "top-right",
      duration: 2000,
      render: () => (
        <TerminalToast
          title="Placement Updated"
          description="Student placement saved"
          accentColor={TOAST_COLOR.success}
        />
      ),
    });
  };

  return (
   
      <Flex direction="column" p={8}>
        {/* HEADER */}
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading className="neon-text">Manage Users</Heading>
            <Text
              fontSize="sm"
              color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
            >
              Manage teachers & students
            </Text>
          </Box>

          {/* ADD BUTTON */}
          <Menu>
            <MenuButton
              as={Button}
              bg="linear-gradient(135deg, #00e066, #00b352)"
              color="black"
              fontWeight="700"
              _hover={{
                transform: "translateY(-1px)",
                boxShadow: "0 10px 25px rgba(0,224,102,0.4)",
              }}
            >
              + Add
            </MenuButton>

            <MenuList>
              <MenuItem onClick={() => setOpenTeacher(true)}>
                Add Teacher
              </MenuItem>
              <MenuItem onClick={() => setOpenStudent(true)}>
                Add Student
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

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
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Age</Th>
                <Th>Subject / Course</Th>
                <Th>Extra</Th>
                <Th>Placed</Th>
                <Th textAlign="right">Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {users.map((u) => (
                <Tr key={u.id}>
                  <Td>{u.name}</Td>
                  <Td>{u.email}</Td>
                  <Td>{u.role}</Td>
                  <Td>{u.age}</Td>

                  <Td>{u.subject || u.course || "-"}</Td>

                  <Td>
                    {u.role === "TEACHER"
                      ? `${u.experience} yrs`
                      : `${u.progress}%`}
                  </Td>

                  {/* PLACEMENT */}
                  <Td>
                    {u.role === "STUDENT" && (
                      <Checkbox
                        isChecked={u.placed}
                        onChange={() => setPlacementUser(u)}
                      />
                    )}
                  </Td>

                  <Td textAlign="right">
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      leftIcon={<FiTrash2 />}
                      onClick={() => handleDelete(u.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* TEACHER MODAL */}
        <Modal isOpen={openTeacher} onClose={() => setOpenTeacher(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Teacher</ModalHeader>

            <ModalBody>
              <TeacherForm
                form={teacherForm}
                setForm={setTeacherForm}
              />
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={() => setOpenTeacher(false)}>
                Cancel
              </Button>
              <Button bg="#00e066" onClick={handleAddTeacher}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* STUDENT MODAL */}
        <Modal isOpen={openStudent} onClose={() => setOpenStudent(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Student</ModalHeader>

            <ModalBody>
              <StudentForm
                form={studentForm}
                setForm={setStudentForm}
              />
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={() => setOpenStudent(false)}>
                Cancel
              </Button>
              <Button bg="#00e066" onClick={handleAddStudent}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* PLACEMENT MODAL */}
        {placementUser && (
          <PlacementModal
            isOpen={true}
            onClose={() => setPlacementUser(null)}
            onSubmit={handlePlacementSave}
          />
        )}
      </Flex>
   
  );
}