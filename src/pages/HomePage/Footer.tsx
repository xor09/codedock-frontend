import {
  Box,
  Container,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Link,
  Icon,
  Divider
} from '@chakra-ui/react'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <Box
      mt={20}
      bg="rgba(10,10,14,0.95)"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      position="relative"
    >
      {/* Glow Background */}
      <Box
        position="absolute"
        top="-100px"
        left="50%"
        transform="translateX(-50%)"
        w="500px"
        h="500px"
        bg="radial-gradient(circle, rgba(0,224,102,0.08) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Container maxW="1200px" px={6} py={12} position="relative">

        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>

          {/* Logo + About */}
          <VStack align="flex-start" spacing={4}>
            <Text
              fontSize="xl"
              fontWeight="900"
              color="#00e066"
              textShadow="0 0 20px rgba(0,224,102,0.4)"
            >
              HavinCode
            </Text>
            <Text fontSize="sm" color="whiteAlpha.500" lineHeight="1.6">
              Empowering developers with real-world skills, mentorship,
              and placement-driven programs to launch successful tech careers.
            </Text>
          </VStack>

          {/* Links */}
          <VStack align="flex-start" spacing={3}>
            <Text fontSize="sm" fontWeight="700" color="white">
              Quick Links
            </Text>

            {['About', 'Courses', 'Jobs', 'Contact'].map((item) => (
              <Link
                key={item}
                fontSize="sm"
                color="whiteAlpha.500"
                _hover={{ color: '#00e066', textDecoration: 'none' }}
              >
                {item}
              </Link>
            ))}
          </VStack>

          {/* Address */}
          <VStack align="flex-start" spacing={3}>
            <Text fontSize="sm" fontWeight="700" color="white">
              Address
            </Text>

            <HStack align="flex-start">
              <Icon as={FiMapPin} color="#00e066" mt={1} />
              <Text fontSize="sm" color="whiteAlpha.500">
                HavinCode HQ,<br />
                India (Remote First)
              </Text>
            </HStack>
          </VStack>

          {/* Contact */}
          <VStack align="flex-start" spacing={3}>
            <Text fontSize="sm" fontWeight="700" color="white">
              Get in Touch
            </Text>

            <HStack>
              <Icon as={FiMail} color="#00e066" />
              <Text fontSize="sm" color="whiteAlpha.500">
                support@havincode.com
              </Text>
            </HStack>

            <HStack>
              <Icon as={FiPhone} color="#00e066" />
              <Text fontSize="sm" color="whiteAlpha.500">
                +91 7004504021
              </Text>
            </HStack>
          </VStack>

        </SimpleGrid>

        {/* Divider */}
        <Divider my={8} borderColor="whiteAlpha.100" />

        {/* Bottom */}
        <HStack justify="space-between" flexWrap="wrap">
          <Text fontSize="sm" color="whiteAlpha.400">
            © 2026 HavinCode. All rights reserved.
          </Text>

          <HStack spacing={4}>
            {['Twitter', 'LinkedIn', 'Instagram'].map((s) => (
              <Text
                key={s}
                fontSize="sm"
                color="whiteAlpha.400"
                cursor="pointer"
                _hover={{ color: '#00e066' }}
              >
                {s}
              </Text>
            ))}
          </HStack>
        </HStack>

      </Container>
    </Box>
  )
}