import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { verifyOtpApi, resendOtpApi } from "../../api/auth";
import TerminalToast from "../../components/TerminalToast";
import { TOAST_COLOR } from "../../constants";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30; // seconds

export default function VerifyEmail() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  // Email passed from Register page via navigate state
  const email = (location.state as any)?.email || "";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto-focus first box on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Allow only digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last char
    setOtp(newOtp);

    // Auto move to next box
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous box on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);

    // Focus last filled box
    const lastIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");

    if (otpValue.length < OTP_LENGTH) {
      toast({
        position: "top-right",
        duration: 2500,
        render: () => (
          <TerminalToast
            title="Incomplete OTP"
            description="Please enter all 6 digits."
            accentColor={TOAST_COLOR.danger}
            icon={<FiXCircle size={16} />}
          />
        ),
      });
      return;
    }

    setLoading(true);
    try {
      await verifyOtpApi(email, otpValue);

      toast({
        position: "top-right",
        duration: 2500,
        render: () => (
          <TerminalToast
            title="Email Verified!"
            description="Your account is now active. Please login."
            accentColor={TOAST_COLOR.success}
            icon={<FiCheckCircle size={16} />}
          />
        ),
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (error: any) {
      toast({
        position: "top-right",
        duration: 2500,
        render: () => (
          <TerminalToast
            title="Verification Failed"
            description={error?.message || "Invalid or expired OTP."}
            accentColor={TOAST_COLOR.danger}
            icon={<FiXCircle size={16} />}
          />
        ),
      });
      // Clear OTP boxes and refocus first
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await resendOtpApi(email);

      toast({
        position: "top-right",
        duration: 2500,
        render: () => (
          <TerminalToast
            title="OTP Resent"
            description="A new OTP has been sent to your email."
            accentColor={TOAST_COLOR.success}
            icon={<FiCheckCircle size={16} />}
          />
        ),
      });

      // Reset countdown
      setOtp(Array(OTP_LENGTH).fill(""));
      setCanResend(false);
      setCountdown(RESEND_COOLDOWN);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      toast({
        position: "top-right",
        duration: 2500,
        render: () => (
          <TerminalToast
            title="Resend Failed"
            description={error?.message || "Could not resend OTP."}
            accentColor={TOAST_COLOR.danger}
            icon={<FiXCircle size={16} />}
          />
        ),
      });
    } finally {
      setResendLoading(false);
    }
  };

  const inputStyle = {
    w: "48px",
    h: "56px",
    textAlign: "center" as const,
    fontSize: "xl",
    fontWeight: "700",
    bg: isDark ? "whiteAlpha.50" : "gray.50",
    border: "1px solid",
    borderColor: isDark ? "whiteAlpha.200" : "blackAlpha.200",
    borderRadius: "10px",
    _focus: {
      borderColor: "#00e066",
      boxShadow: "0 0 0 1px #00e066",
      bg: isDark ? "whiteAlpha.100" : "white",
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

        <Heading size="md" textAlign="center" mb={1} className="neon-text">
          Verify Your Email
        </Heading>

        <Text
          textAlign="center"
          fontSize="sm"
          color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
          mb={2}
        >
          Enter the 6-digit code sent to
        </Text>

        <Text
          textAlign="center"
          fontSize="sm"
          color="#00e066"
          fontWeight="700"
          mb={6}
        >
          {email || "your email"}
        </Text>

        <Stack spacing={6}>
          {/* 6 OTP input boxes */}
          <HStack justify="center" spacing={2} onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength={1}
                inputMode="numeric"
                {...inputStyle}
              />
            ))}
          </HStack>

          <Button
            bg="linear-gradient(135deg, #00e066, #00b352)"
            color="black"
            fontWeight="800"
            _hover={{
              transform: "translateY(-1px)",
              boxShadow: "0 10px 30px rgba(0,224,102,0.4)",
            }}
            onClick={handleVerify}
            isLoading={loading}
            loadingText="Verifying..."
          >
            Verify Email
          </Button>
        </Stack>

        {/* Resend section */}
        <Text
          mt={6}
          fontSize="sm"
          textAlign="center"
          color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
        >
          Didn't receive the code?{" "}
          {canResend ? (
            <Text
              as="span"
              color="#00e066"
              cursor={resendLoading ? "not-allowed" : "pointer"}
              fontWeight="700"
              onClick={!resendLoading ? handleResend : undefined}
            >
              {resendLoading ? "Sending..." : "Resend OTP"}
            </Text>
          ) : (
            <Text
              as="span"
              color={isDark ? "whiteAlpha.400" : "blackAlpha.400"}
              fontWeight="700"
            >
              Resend in {countdown}s
            </Text>
          )}
        </Text>

        <Text
          mt={3}
          fontSize="sm"
          textAlign="center"
          color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
        >
          Wrong email?{" "}
          <Text
            as="span"
            color="#00e066"
            cursor="pointer"
            fontWeight="700"
            onClick={() => navigate("/signup")}
          >
            Go back
          </Text>
        </Text>
      </Box>
    </Flex>
  );
}
