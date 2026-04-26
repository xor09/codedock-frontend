import {
  Box,
  Flex,
  Heading,
  Text,
  Grid,
  GridItem,
  useColorMode,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { FiUsers, FiBookOpen, FiActivity } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import TerminalToast from "../../components/TerminalToast";
import { TOAST_COLOR } from "../../constants";
import Layout from "../../components/layout/Layout";

export default function AdminDashboard() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();
  const toast = useToast();

  //  Dummy Placement Data
  const placedStudents = [
    {
      id: 1,
      name: "Aman Sharma",
      college: "ABC College",
      company: "TCS",
      package: "6 LPA",
    },
    {
      id: 2,
      name: "Riya Patel",
      college: "XYZ College",
      company: "Infosys",
      package: "5 LPA",
    },
  ];

  const cardStyle = {
    p: 6,
    borderRadius: "16px",
    cursor: "pointer",
    transition: "0.2s",
    bg: isDark ? "rgba(20,20,22,0.75)" : "white",
    backdropFilter: "blur(20px)",
    border: "1px solid",
    borderColor: isDark ? "whiteAlpha.200" : "blackAlpha.100",
    _hover: {
      transform: "translateY(-4px)",
      boxShadow: "0 10px 30px rgba(0,224,102,0.25)",
    },
  };

  const handleClick = (type: string) => {
    toast({
      position: "top-right",
      duration: 2000,
      render: () => (
        <TerminalToast
          title="Navigation"
          description={`Opening ${type}`}
          accentColor={TOAST_COLOR.success}
        />
      ),
    });

    if (type === "Users") navigate("/admin/users");
    if (type === "Courses") navigate("/admin/courses");
    if (type === "Analytics") navigate("/admin/analytics");
  };

  return (
    // <Layout>
      <Flex
        direction="column"
        minH="100vh"
        p={8}
        bgGradient={
          isDark
            ? "radial(circle at top, rgba(0,224,102,0.12), transparent 60%)"
            : "gray.50"
        }
      >
        {/* Header */}
        <Box mb={8}>
          <Heading className="neon-text">Admin Dashboard</Heading>
          <Text mt={2} color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}>
            Manage users, courses, and platform activity
          </Text>
        </Box>

        {/* Cards */}
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
          
          {/* Users */}
          <GridItem {...cardStyle} onClick={() => handleClick("Users")}>
            <Flex align="center" gap={4}>
              <Box p={3} borderRadius="12px" bg="rgba(0,224,102,0.15)" color="#00e066">
                <FiUsers size={22} />
              </Box>
              <Box>
                <Heading size="md">Users</Heading>
                <Text fontSize="sm" color="gray.500">
                  Manage students & teachers
                </Text>
              </Box>
            </Flex>
          </GridItem>

          {/* Courses */}
          <GridItem {...cardStyle} onClick={() => handleClick("Courses")}>
            <Flex align="center" gap={4}>
              <Box p={3} borderRadius="12px" bg="rgba(0,224,102,0.15)" color="#00e066">
                <FiBookOpen size={22} />
              </Box>
              <Box>
                <Heading size="md">Courses</Heading>
                <Text fontSize="sm" color="gray.500">
                  Create and manage courses
                </Text>
              </Box>
            </Flex>
          </GridItem>

          {/* Analytics ✅ FIXED */}
          <GridItem {...cardStyle} onClick={() => handleClick("Analytics")}>
            <Flex align="center" gap={4}>
              <Box p={3} borderRadius="12px" bg="rgba(0,224,102,0.15)" color="#00e066">
                <FiActivity size={22} />
              </Box>
              <Box>
                <Heading size="md">Analytics</Heading>
                <Text fontSize="sm" color="gray.500">
                  Platform usage insights
                </Text>
              </Box>
            </Flex>
          </GridItem>
        </Grid>

        {/*  Placement Section */}
        <Box mt={10}>
          <Heading size="md" mb={4}>
            Placed Students
          </Heading>

          <Box
            borderRadius="16px"
            overflow="hidden"
            bg={isDark ? "rgba(20,20,22,0.75)" : "white"}
            border="1px solid"
            borderColor={isDark ? "whiteAlpha.200" : "blackAlpha.100"}
          >
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>College</Th>
                  <Th>Company</Th>
                  <Th>Package</Th>
                </Tr>
              </Thead>

              <Tbody>
                {placedStudents.map((s) => (
                  <Tr key={s.id}>
                    <Td>{s.name}</Td>
                    <Td>{s.college}</Td>
                    <Td>{s.company}</Td>
                    <Td>{s.package}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    //{/* </Layout> */}
  );
}