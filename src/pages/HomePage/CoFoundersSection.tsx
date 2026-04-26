import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Avatar,
  VStack,
} from "@chakra-ui/react";

import abhishekImg from "../../assets/abhishek.jpeg"
import shivImg from "../../assets/Shivshambhoo.jpeg"
import navnitImg from "../../assets/navnit.jpeg"


const founders = [
      {
    name: "Shivshambhoo Chaudhary",
    role: "Co-Founder & CEO",
    designation: "Software Engineer (Ex-Aridage AI)",
    desc: "Worked at Aridage AI and currently Working at SixPhrase as a senior technical trainer.",
    image: shivImg,
  },
  {
    name: "Bishal Suvecha Manindra",
    role: "Co-Founder & CTO",
    designation: "L2 Engineer (Minix Holding)",
    desc: "3+ years experience at Minix Holding, currently working as L2 Engineer and leading technical architecture.",
  },

  {
    name: "Kartik Santwani",
    role: "Co-Founder & COO",
    designation: "Ex-Infosys | Ops Manager",
    desc: "3 years experience at Infosys, now managing operations and training at SixPhrase.",
  },
  {
    name: "Navnit Kumar",
    role: "Co-Founder & CFO",
    designation: "Technical Trainer",
    desc: "1.5+ years at SixPhrase as Technical Trainer, handling finance and growth strategies.",
    image: navnitImg
  },
   {
    name: "Abhishek kumar Jha",
    role: "Co-Founder",
    designation: "Software Engineer (Ex-Netcracker)",
    desc: "Worked at Netcracker Technology for 2.8 years and currently working at SixPhrase as a Software Engineer II.",
    image: abhishekImg,
  },
];

function NeonCard({ children }: any) {
  return (
    <Box
      bg="rgba(10,10,14,0.85)"
      border="1px solid"
      borderColor="rgba(0,224,102,0.2)"
      borderRadius="16px"
      p={6}
      textAlign="center"
      transition="0.3s"
      _hover={{
        boxShadow: "0 0 25px rgba(0,224,102,0.3)",
        transform: "translateY(-4px)",
      }}
    >
      {children}
    </Box>
  );
}

export default function CoFoundersSection() {
  return (
    <Container maxW="1200px" px={6} mb={20}>
      <Text
        fontSize="12px"
        letterSpacing="0.2em"
        color="whiteAlpha.400"
        mb={2}
      >
        OUR TEAM
      </Text>

      <Text fontSize="3xl" fontWeight="900" color="white" mb={10}>
        Meet Our <Text as="span" color="#00e066">Co-Founders</Text>
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {founders.map((f) => (
          <NeonCard key={f.name}>
            <VStack spacing={3}>
              <Avatar size="lg" name={f.name} src={f.image} boxSize="150px"/>

              <Text fontWeight="800" color="white">
                {f.name}
              </Text>

              <Text fontSize="sm" color="#00e066" fontWeight="700">
                {f.role}
              </Text>

              <Text fontSize="xs" color="whiteAlpha.400">
                {f.designation}
              </Text>

              <Text fontSize="sm" color="whiteAlpha.500">
                {f.desc}
              </Text>
            </VStack>
          </NeonCard>
        ))}
      </SimpleGrid>
    </Container>
  );
}