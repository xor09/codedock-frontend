import { Box, VStack, Text, Button } from "@chakra-ui/react";

export default function AuthForm({
  title,
  subtitle,
  fields,
  footer,
  onSubmit,
  buttonLabel,
}: any) {
  return (
    <Box
      maxW="420px"
      mx="auto"
      mt="10vh"
      p={6}
      borderRadius="16px"
      bg="rgba(20, 20, 24, 0.85)"
      backdropFilter="blur(20px)"
      border="1px solid"
      borderColor="whiteAlpha.200"
    >
      {/* Header */}
      <VStack spacing={1} mb={6}>
        <Text fontSize="xl" fontWeight="800">
          {title}
        </Text>

        {subtitle && (
          <Text fontSize="xs" color="whiteAlpha.500">
            {subtitle}
          </Text>
        )}
      </VStack>

      {/* Form */}
      <form onSubmit={onSubmit}>
        <VStack spacing={4}>
          {/* ✅ fields must NOT be inside <Text> */}
          <Box w="100%">{fields}</Box>

          <Button
            type="submit"
            w="100%"
            bg="green.400"
            color="black"
            _hover={{ bg: "green.300" }}
          >
            {buttonLabel}
          </Button>

          {/* ✅ footer must NOT be inside <Text> */}
          {footer && <Box pt={2}>{footer}</Box>}
        </VStack>
      </form>
    </Box>
  );
}
