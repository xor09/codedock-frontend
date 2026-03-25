import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { FiCheckCircle, FiXCircle, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TerminalToast from "../components/TerminalToast";
import { TOAST_COLOR } from "../constants";

export default function ForgotPassword() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      toast({
        position: "top-right",
        duration: 2500,
        render: () => (
          <TerminalToast
            title="Email Required"
            description="Please enter your email address."
            accentColor={TOAST_COLOR.danger}
            icon={<FiXCircle size={16} />}
          />
        ),
      });
      return;
    }

    setLoading(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setIsSubmitted(true);

      toast({
        position: "top-right",
        duration: 2500,
        render: () => (
          <TerminalToast
            title="Reset Link Sent"
            description="Check your inbox for the password reset link."
            accentColor={TOAST_COLOR.success}
            icon={<FiCheckCircle size={16} />}
          />
        ),
      });
    } catch (error: any) {
      toast({
        position: "top-right",
        duration: 2500,
        render: () => (
          <TerminalToast
            title="Request Failed"
            description={error?.message || "Something went wrong. Try again."}
            accentColor={TOAST_COLOR.danger}
            icon={<FiXCircle size={16} />}
          />
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    bg: isDark ? "whiteAlpha.50" : "gray.50",
    border: "1px solid",
    borderColor: isDark ? "whiteAlpha.200" : "blackAlpha.200",
    _focus: {
      borderColor: "#00e066",
      boxShadow: "0 0 0 1px #00e066",
    },
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient={
        isDark
          ? "radial(circle at top, rgba(0,224,102,0.15), transparent 60%)"
          : "gray.50"
      }
    >
      <Box
        w="100%"
        maxW="420px"
        px={8}
        py={10}
        borderRadius="16px"
        bg={isDark ? "rgba(20,20,22,0.75)" : "white"}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={isDark ? "whiteAlpha.200" : "blackAlpha.100"}
        boxShadow={
          isDark
            ? "0 20px 60px rgba(0,0,0,0.6)"
            : "0 20px 40px rgba(0,0,0,0.08)"
        }
      >
        {/* Logo */}
        <Flex justify="center" mb={4}>
          <Box
            w="44px"
            h="44px"
            bg="linear-gradient(135deg, #00e066, #00b352)"
            borderRadius="12px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 0 24px rgba(0,224,102,0.5)"
          >
            <Text fontWeight="900" color="black">
              {"</>"}
            </Text>
          </Box>
        </Flex>

        {!isSubmitted ? (
          <>
            <Heading size="md" textAlign="center" mb={1} className="neon-text">
              Reset Password
            </Heading>

            <Text
              textAlign="center"
              fontSize="sm"
              color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
              mb={6}
            >
              Enter your email to receive a reset link
            </Text>

            <Stack spacing={4}>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                {...inputStyle}
              />

              <Button
                mt={2}
                bg="linear-gradient(135deg, #00e066, #00b352)"
                color="black"
                fontWeight="800"
                _hover={{
                  transform: "translateY(-1px)",
                  boxShadow: "0 10px 30px rgba(0,224,102,0.4)",
                }}
                onClick={handleSubmit}
                isLoading={loading}
                loadingText="Sending..."
              >
                Send Reset Link
              </Button>
            </Stack>
          </>
        ) : (
          /* Success State */
          <Stack spacing={4} align="center">
            <Box
              w="56px"
              h="56px"
              borderRadius="full"
              border="2px solid #00e066"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 0 20px rgba(0,224,102,0.3)"
            >
              <FiCheckCircle size={24} color="#00e066" />
            </Box>

            <Heading size="md" textAlign="center" className="neon-text">
              Check Your Inbox
            </Heading>

            <Text
              textAlign="center"
              fontSize="sm"
              color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
            >
              If an account exists for{" "}
              <Text as="span" color="#00e066" fontWeight="700">
                {email}
              </Text>
              , you'll receive a reset link shortly.
            </Text>

            <Button
              w="full"
              mt={2}
              variant="outline"
              borderColor="#00e066"
              color="#00e066"
              fontWeight="700"
              leftIcon={<FiArrowLeft />}
              _hover={{
                bg: "rgba(0,224,102,0.08)",
                transform: "translateY(-1px)",
              }}
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>

            <Text
              fontSize="sm"
              color={isDark ? "whiteAlpha.500" : "blackAlpha.500"}
            >
              Didn't receive it?{" "}
              <Text
                as="span"
                color="#00e066"
                cursor="pointer"
                fontWeight="700"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
              >
                Try again
              </Text>
            </Text>
          </Stack>
        )}

        {!isSubmitted && (
          <Text
            mt={6}
            fontSize="sm"
            textAlign="center"
            color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
          >
            Remember your password?{" "}
            <Text
              as="span"
              color="#00e066"
              cursor="pointer"
              fontWeight="700"
              onClick={() => navigate("/login")}
            >
              Login
            </Text>
          </Text>
        )}
      </Box>
    </Flex>
  );
}
