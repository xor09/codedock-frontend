import { Container, Text, SimpleGrid } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import CourseCard from "./CourseCard"
// import CourseTabs from "./CourseTabs"

export default function CoursesSection({ courses }: any) {
  const navigate = useNavigate()

  return (
    <Container maxW="1200px" px={6} mb={20}>
      <Text fontSize="12px" color="whiteAlpha.400" mb={2}>
        WHAT WE OFFER
      </Text>

      <Text fontSize="3xl" fontWeight="900" color="white" mb={2}>
        College training for placement{" "}
        <Text as="span" color="#00cfff">
          Courses
        </Text>
      </Text>

      <Text fontSize="sm" color="whiteAlpha.400" mb={8}>
        Gain practical tech skills and access opportunities with leading companies across India.
      </Text>

      {/* <CourseTabs /> */}

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
        {courses.map((c: any) => (
          <CourseCard key={c.category} c={c} navigate={navigate} />
        ))}
      </SimpleGrid>
    </Container>
  )
}