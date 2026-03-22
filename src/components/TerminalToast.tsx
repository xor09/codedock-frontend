import { Box, Text, HStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TerminalToastProps {
  title: string;
  description?: string;
  accentColor?: string;
  icon?: ReactNode;
}

export default function TerminalToast({
  title,
  description,
  accentColor = "#00e066",
  icon,
}: TerminalToastProps) {
  return (
    <Box
      bg="rgba(10, 10, 12, 0.9)"
      color="white"
      px={4}
      py={3}
      borderRadius="12px"
      border={`1px solid ${accentColor}66`}
      boxShadow={`0 0 24px ${accentColor}55`}
      backdropFilter="blur(14px)"
      minW="280px"
    >
      <HStack spacing={3} align="start">
        {icon && <Box mt="2px">{icon}</Box>}

        <Box>
          <Text fontWeight="800" fontSize="sm" letterSpacing="0.3px">
            {title}
          </Text>

          {description && (
            <Text fontSize="xs" color="whiteAlpha.700" mt={0.5}>
              {description}
            </Text>
          )}
        </Box>
      </HStack>
    </Box>
  );
}
