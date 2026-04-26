import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorMode,
} from "@chakra-ui/react";
import { College } from "../../types";

type Props = {
  onSelectCollege: (college: College) => void;
};

export default function CollegeTable({ onSelectCollege }: Props) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const colleges: College[] = [
    { id: 1, name: "ABC College", teachers: 5, students: 50 },
    { id: 2, name: "XYZ College", teachers: 3, students: 30 },
  ];

  return (
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
            <Th>College Name</Th>
            <Th>Teachers</Th>
            <Th>Students</Th>
          </Tr>
        </Thead>

        <Tbody>
          {colleges.map((c) => (
            <Tr
              key={c.id}
              cursor="pointer"
              _hover={{ bg: "rgba(0,224,102,0.1)" }}
              onClick={() => onSelectCollege(c)}
            >
              <Td color="#00e066" fontWeight="700">
                {c.name}
              </Td>
              <Td>{c.teachers}</Td>
              <Td>{c.students}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}