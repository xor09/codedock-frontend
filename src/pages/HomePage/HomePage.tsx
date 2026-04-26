import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Button,
  Badge,
  SimpleGrid,
  Container,
  Tag,
  useColorMode,
  Avatar,
  Icon,
} from '@chakra-ui/react'
import { FiArrowRight, FiCode, FiBarChart2, FiDatabase, FiZap, FiUsers, FiBriefcase, FiStar } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import CoFoundersSection from './CoFoundersSection'
import Footer from './Footer'
import CoursesSection from './Courses/CoursesSection'

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { value: '10,000+', label: 'Students Placed' },
  { value: '500+', label: 'Hiring Partners' },
  { value: '95%', label: 'Placement Rate' },
  { value: '18 LPA', label: 'Avg. Package' },
]

const courses = [
  {
    icon: FiCode,
    category: 'FULL STACK DEVELOPMENT',
    title: 'MERN Full Stack',
    duration: '8 Months',
    stack: ['React', 'Node.js', 'MySQL', 'OpenAI'],
    projects: 60,
    students: '500+',
    nextBatch: '8th May, 2026',
    color: '#00e066',
    bg: 'rgba(0, 224, 102, 0.06)',
    border: 'rgba(0, 224, 102, 0.2)',
  },
  {
    icon: FiBarChart2,
    category: 'DATA ANALYTICS',
    title: 'Course',
    duration: '6 Months',
    stack: ['Power BI', 'Python', 'SQL', 'Excel'],
    projects: 7,
    students: '500+',
    nextBatch: '8th May, 2026',
    color: '#00cfff',
    bg: 'rgba(0, 207, 255, 0.06)',
    border: 'rgba(0, 207, 255, 0.2)',
  },
  {
    icon: FiDatabase,
    category: 'DATA SCIENCE & AI',
    title: 'Course',
    duration: '8 Months',
    stack: ['Python', 'TensorFlow', 'PyTorch', 'NumPy'],
    projects: 7,
    students: '500+',
    nextBatch: '8th May, 2026',
    color: '#bf80ff',
    bg: 'rgba(191, 128, 255, 0.06)',
    border: 'rgba(191, 128, 255, 0.2)',
  },
]

const testimonials = [
  {
    name: 'Gaganpreet Singh',
    role: 'Software Engineer (Backend)',
    company: 'Jio',
    package: '14 LPA',
    text: 'HavinCode\'s curriculum is well-structured and focuses on practical backend skills. The mentors were highly experienced and their guidance made learning smooth and effective.',
    avatar: 'GS',
  },
  {
    name: 'Archita Pandey',
    role: 'Software Engineer I',
    company: 'Smarsh',
    package: '14 LPA',
    text: 'The mentors have a very clear and practical teaching approach. Doubts are addressed patiently, which makes learning comfortable and effective.',
    avatar: 'AP',
  },
  {
    name: 'Sohini Gujjaru',
    role: 'Software Engineer I',
    company: 'Startup',
    package: '20 LPA',
    text: 'What stood out was the mentor support. They didn\'t just teach concepts — they guided us on how to apply them in real projects, giving me confidence for technical interviews.',
    avatar: 'SG',
  },
]

// const centres = ['Noida', 'Pune', 'Hyderabad', 'Bangalore', 'Chennai']

// ─── Neon Glow Box ────────────────────────────────────────────────────────────

function NeonCard({ children, color = '#00e066', ...props }: any) {
  return (
    <Box
      bg="rgba(10,10,14,0.85)"
      border="1px solid"
      borderColor={`${color}33`}
      borderRadius="16px"
      p={6}
      backdropFilter="blur(12px)"
      position="relative"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        borderColor: `${color}88`,
        boxShadow: `0 0 32px ${color}22, 0 8px 32px rgba(0,0,0,0.4)`,
        transform: 'translateY(-2px)',
      }}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${color}88, transparent)`,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <Text
      fontSize="11px"
      fontWeight="700"
      letterSpacing="0.2em"
      textTransform="uppercase"
      color="whiteAlpha.400"
      mb={2}
    >
      {children}
    </Text>
  )
}

// ─── Main HomePage ────────────────────────────────────────────────────────────

export default function HomePage() {
  const navigate = useNavigate()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Box
      overflowY="auto"
      h="100%"
      css={{
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { background: '#00e06633', borderRadius: '4px' },
      }}
    >
      {/* ── Ambient BG ── */}
      <Box
        position="fixed"
        top={0} left={0} right={0} bottom={0}
        pointerEvents="none"
        zIndex={0}
      >
        <Box
          position="absolute"
          top="-20%"
          left="-10%"
          w="600px"
          h="600px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(0,224,102,0.06) 0%, transparent 70%)"
        />
        <Box
          position="absolute"
          top="30%"
          right="-15%"
          w="500px"
          h="500px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(0,207,255,0.05) 0%, transparent 70%)"
        />
        <Box
          position="absolute"
          bottom="10%"
          left="30%"
          w="400px"
          h="400px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(191,128,255,0.04) 0%, transparent 70%)"
        />
      </Box>

      <Box position="relative" zIndex={1}>

        {/* ════════════════ HERO ════════════════ */}
        <Container maxW="1200px" px={6} pt={12} pb={16}>
          <Flex gap={12} align="center" direction={{ base: 'column', lg: 'row' }}>

            {/* Left: Copy */}
            <VStack align="flex-start" spacing={6} flex={1}>
              <HStack spacing={2}>
                <Box w="6px" h="6px" borderRadius="full" bg="#00e066" boxShadow="0 0 8px #00e066" />
                <Text fontSize="12px" fontWeight="600" color="#00e066" letterSpacing="0.15em" textTransform="uppercase">
                    From Learning to Earning               
                     </Text>
              </HStack>

              <Box>
                <Text
                  fontSize={{ base: '3xl', md: '5xl' }}
                  fontWeight="900"
                  lineHeight="1.1"
                  color="white"
                  fontFamily="'Space Grotesk', sans-serif"
                >
                  Launch Your{' '}
                  <Text as="span" color="#00e066" textShadow="0 0 40px rgba(0,224,102,0.4)">
                    Dev Career
                  </Text>
                  <br />with{' '}
                  <Text as="span" color="#00cfff" textShadow="0 0 40px rgba(0,207,255,0.3)">
                    Placement-First
                  </Text>
                  <br />Courses
                </Text>
              </Box>

              <Text fontSize="md" color="whiteAlpha.600" maxW="480px" lineHeight="1.7">
                Get job-ready through structured, mentor-led programs. Build real projects,
                crack interviews, and land roles at top tech companies across India.
              </Text>

              <HStack spacing={4} flexWrap="wrap">
                <Button
                  bg="#00e066"
                  color="black"
                  fontWeight="800"
                  px={7}
                  py={6}
                  borderRadius="12px"
                  fontSize="sm"
                  rightIcon={<FiArrowRight />}
                  boxShadow="0 0 24px rgba(0,224,102,0.35)"
                  _hover={{
                    bg: '#00ff73',
                    boxShadow: '0 0 40px rgba(0,224,102,0.5)',
                    transform: 'translateY(-1px)',
                  }}
                  transition="all 0.2s"
                  onClick={() => navigate('/courses')}
                >
                  Explore Courses
                </Button>
                <Button
                  variant="outline"
                  borderColor="whiteAlpha.200"
                  color="white"
                  fontWeight="700"
                  px={7}
                  py={6}
                  borderRadius="12px"
                  fontSize="sm"
                  rightIcon={<FiBriefcase />}
                  _hover={{
                    borderColor: '#00cfff',
                    color: '#00cfff',
                    boxShadow: '0 0 20px rgba(0,207,255,0.15)',
                  }}
                  transition="all 0.2s"
                  onClick={() => navigate('/jobs')}
                >
                  View Job Drives
                </Button>
              </HStack>

              {/* Trust badges */}
              <HStack spacing={5} pt={2} flexWrap="wrap">
                {['Y Combinator Backed', 'IIT Delhi Alumni', 'LinkedIn Top Company'].map((b) => (
                  <HStack key={b} spacing={1.5}>
                    <Box w="4px" h="4px" borderRadius="full" bg="whiteAlpha.300" />
                    <Text fontSize="11px" color="whiteAlpha.400" fontWeight="600">{b}</Text>
                  </HStack>
                ))}
              </HStack>
            </VStack>

            {/* Right: Cards */}
            <VStack spacing={4} w={{ base: 'full', lg: '340px' }} flexShrink={0}>

              {/* Courses card */}
              <NeonCard color="#00e066" w="full">
                <HStack justify="space-between" mb={3}>
                  <Text fontWeight="800" color="white" fontSize="lg">Courses</Text>
                  <Icon as={FiCode} color="#00e066" />
                </HStack>
                <Text fontSize="sm" color="whiteAlpha.500" mb={3}>
                  Industry-ready training to get you placed
                </Text>
                <HStack spacing={2} mb={4} flexWrap="wrap">
                  {['Live Projects', 'Mentorship', 'Certificate'].map((t) => (
                    <Tag key={t} size="sm" bg="rgba(0,224,102,0.1)" color="#00e066" borderRadius="full" fontWeight="600">
                      {t}
                    </Tag>
                  ))}
                </HStack>
                <Button
                  w="full"
                  variant="outline"
                  borderColor="#00e06644"
                  color="#00e066"
                  size="sm"
                  borderRadius="10px"
                  fontWeight="700"
                  rightIcon={<FiArrowRight />}
                  _hover={{ bg: 'rgba(0,224,102,0.08)', borderColor: '#00e066' }}
                  onClick={() => navigate('/courses')}
                >
                  View Courses
                </Button>
              </NeonCard>

              {/* Jobs card */}
              <NeonCard color="#00cfff" w="full">
                <HStack justify="space-between" mb={3}>
                  <Text fontWeight="800" color="white" fontSize="lg">Job Drives</Text>
                  <Icon as={FiBriefcase} color="#00cfff" />
                </HStack>
                <Text fontSize="sm" color="whiteAlpha.500" mb={3}>
                  Get hired directly via FREE verified hiring drives
                </Text>
                <HStack spacing={1} mb={4}>
                  {['A', 'S', 'D', 'I'].map((c, i) => (
                    <Box
                      key={i}
                      w="28px" h="28px"
                      borderRadius="full"
                      bg={['#ff9900', '#00b0ff', '#00b0ff', '#0a66c2'][i]}
                      display="flex" alignItems="center" justifyContent="center"
                      fontSize="10px" fontWeight="800" color="white"
                      ml={i > 0 ? '-8px' : 0}
                      border="2px solid"
                      borderColor="rgba(10,10,14,0.9)"
                    >
                      {c}
                    </Box>
                  ))}
                  <Text fontSize="12px" color="whiteAlpha.500" ml={2} fontWeight="600">+240 companies</Text>
                </HStack>
                <Button
                  w="full"
                  variant="outline"
                  borderColor="#00cfff44"
                  color="#00cfff"
                  size="sm"
                  borderRadius="10px"
                  fontWeight="700"
                  rightIcon={<FiArrowRight />}
                  _hover={{ bg: 'rgba(0,207,255,0.08)', borderColor: '#00cfff' }}
                  onClick={() => navigate('/jobs')}
                >
                  View Job Drives
                </Button>
              </NeonCard>
            </VStack>
          </Flex>
        </Container>

        {/* ════════════════ STATS ════════════════ */}
        <Box borderY="1px solid" borderColor="whiteAlpha.50" py={8} mb={16}>
          <Container maxW="1200px" px={6}>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={0}>
              {stats.map((s, i) => (
                <Box
                  key={s.label}
                  textAlign="center"
                  py={4}
                  borderRight={i < 3 ? '1px solid' : 'none'}
                  borderColor="whiteAlpha.50"
                >
                  <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="900" color="#00e066"
                    textShadow="0 0 30px rgba(0,224,102,0.4)">
                    {s.value}
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.400" fontWeight="600">{s.label}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <CoursesSection courses={courses} />

        {/* ════════════════ TESTIMONIALS ════════════════ */}
        <Container maxW="1200px" px={6} mb={20}>
          <SectionLabel>Our Testimonials</SectionLabel>
          <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="900" color="white" mb={8}>
            Those Who{' '}
            <Text as="span" color="#00e066">Acted</Text> And Transformed
          </Text>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
            {testimonials.map((t) => (
              <NeonCard key={t.name} color="#00e066">
                <HStack justify="space-between" mb={4}>
                  <HStack spacing={3}>
                    <Avatar
                      name={t.name}
                      size="sm"
                      bg="#00e06622"
                      color="#00e066"
                      fontWeight="800"
                      fontSize="12px"
                    />
                    <Box>
                      <Text fontSize="sm" fontWeight="800" color="white">{t.name}</Text>
                      <Text fontSize="11px" color="whiteAlpha.400">{t.role}</Text>
                    </Box>
                  </HStack>
                  <VStack spacing={0} align="flex-end">
                    <Text fontSize="14px" fontWeight="900" color="#00e066">{t.package}</Text>
                    <Text fontSize="10px" color="whiteAlpha.400">{t.company}</Text>
                  </VStack>
                </HStack>

                <HStack spacing={1} mb={3}>
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} as={FiStar} color="#00e066" w={3} h={3} />
                  ))}
                </HStack>

                <Text fontSize="sm" color="whiteAlpha.500" lineHeight="1.7">
                  "{t.text}"
                </Text>
              </NeonCard>
            ))}
          </SimpleGrid>
        </Container>



        {/* ════════════════ CTA BANNER ════════════════ */}
        <Container maxW="1200px" px={6} mb={16}>
          <Box
            p={10}
            borderRadius="20px"
            bg="linear-gradient(135deg, rgba(0,224,102,0.08) 0%, rgba(0,207,255,0.06) 50%, rgba(191,128,255,0.08) 100%)"
            border="1px solid"
            borderColor="rgba(0,224,102,0.15)"
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="400px"
              h="400px"
              borderRadius="full"
              bg="radial-gradient(circle, rgba(0,224,102,0.05) 0%, transparent 70%)"
              pointerEvents="none"
            />
            <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="900" color="white" mb={3}>
              Ready to Launch Your{' '}
              <Text as="span" color="#00e066">Tech Career?</Text>
            </Text>
            <Text fontSize="md" color="whiteAlpha.500" mb={6}>
              Join 10,000+ students who transformed their careers with HavinCode.
            </Text>
            <HStack justify="center" spacing={4} flexWrap="wrap">
              <Button
                bg="#00e066"
                color="black"
                fontWeight="800"
                px={8}
                py={6}
                borderRadius="12px"
                boxShadow="0 0 32px rgba(0,224,102,0.4)"
                rightIcon={<FiArrowRight />}
                _hover={{ bg: '#00ff73', boxShadow: '0 0 48px rgba(0,224,102,0.55)', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
                onClick={() => navigate('/courses')}
              >
                Get Started Today
              </Button>
              <Button
                variant="outline"
                borderColor="whiteAlpha.200"
                color="white"
                fontWeight="700"
                px={8}
                py={6}
                borderRadius="12px"
                _hover={{ borderColor: '#00e066', color: '#00e066' }}
                transition="all 0.2s"
              >
                Download Placement Report
              </Button>
            </HStack>
          </Box>
        </Container>

        {/* ════════════════ CO-FOUNDERS ════════════════ */}
     <CoFoundersSection />
     <Footer/>

      </Box>
    </Box>
  )
}
