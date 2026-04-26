import {
  Box,
  HStack,
  Text,
  Tag,
  SimpleGrid,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react"
import { FiArrowRight } from "react-icons/fi"

export default function CourseCard({ c, navigate }: any) {
  return (
    <Box
      bg="rgba(10,10,14,0.85)"
      border="1px solid"
      borderColor={`${c.color}33`}
      borderRadius="16px"
      p={6}
      backdropFilter="blur(12px)"
      transition="all 0.3s ease"
      _hover={{
        borderColor: `${c.color}88`,
        boxShadow: `0 0 32px ${c.color}22`,
        transform: "translateY(-2px)",
      }}
    >
      <HStack justify="space-between" mb={4}>
        <Flex
          w="40px"
          h="40px"
          borderRadius="10px"
          bg={c.bg}
          border="1px solid"
          borderColor={c.border}
          align="center"
          justify="center"
        >
          <Icon as={c.icon} color={c.color} />
        </Flex>

        <Tag
          size="sm"
          bg={c.bg}
          color={c.color}
          borderRadius="full"
          fontWeight="700"
          fontSize="11px"
        >
          ⏱ {c.duration}
        </Tag>
      </HStack>

      <Text fontSize="10px" fontWeight="700" color="whiteAlpha.400" mb={1}>
        {c.category}
      </Text>

      <Text fontSize="xl" fontWeight="900" color="white" mb={3}>
        {c.title}
      </Text>

      <Text fontSize="11px" color="whiteAlpha.400" mb={2}>
        TECH STACK
      </Text>

      <HStack spacing={2} mb={4} flexWrap="wrap">
        {c.stack.map((s: string) => (
          <Tag key={s} size="sm" bg="whiteAlpha.50" color="whiteAlpha.600">
            {s}
          </Tag>
        ))}
      </HStack>

      <SimpleGrid columns={3} gap={2} mb={4}>
        {[
          { label: "PROJECTS", val: c.projects },
          { label: "ENROLLED", val: c.students },
          { label: "NEXT BATCH", val: "8 May" },
        ].map((item) => (
          <Box key={item.label} textAlign="center" p={2} bg="whiteAlpha.50">
            <Text fontWeight="800" color={c.color}>
              {item.val}
            </Text>
            <Text fontSize="9px" color="whiteAlpha.300">
              {item.label}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <HStack spacing={3}>
        <Button flex={1} variant="outline" borderColor={`${c.color}44`} color={c.color} size="sm">
          Brochure ↓
        </Button>

        <Button
          flex={2}
          bg={c.color}
          color="black"
          size="sm"
          rightIcon={<FiArrowRight />}
          onClick={() => navigate("/courses")}
        >
          View Program
        </Button>
      </HStack>

      <Box mt={3} pt={3} borderTop="1px solid" borderColor="whiteAlpha.50" textAlign="center">
        <Text fontSize="11px" fontWeight="700" color={c.color}>
          SCHOLARSHIP AVAILABLE
        </Text>
      </Box>
    </Box>
  )
}