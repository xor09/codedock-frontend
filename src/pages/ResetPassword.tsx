import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Stack,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import {
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import TerminalToast from "../components/TerminalToast";
import { TOAST_COLOR } from "../constants";
import { resetpasswordApi } from "../api/auth";

export default function ResetPassword() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();
  const toast = useToast();

  // Token comes from the email link: /reset-password?token=XXXX
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.newPassword || !form.confirmPassword) {
      toast({
        position: "top-right",
        duration: 2500,
        render: () => (
          <TerminalToast
            title="Fields Required"
            description="Please fill in both password fields."
            accentColor={TOAST_COLOR.danger}
            icon={<FiXCircle size={16} />}
          />
        ),
      });
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast({
        position: "top-right",
        duration: 2500,
        render: () => (
          <TerminalToast
            title="Password Mismatch"
            description="Passwords do not match. Please try again."
            accentColor={TOAST_COLOR.danger}
            icon={<FiXCircle size={16} />}
          />
        ),
      });
      return;
    }

    if (!token) {
      toast({
        position: "top-right",
        duration: 2500,
        render: () => (
          <TerminalToast
            title="Invalid Link"
            description="Reset token is missing. Please request a new link."
            accentColor={TOAST_COLOR.danger}
            icon={<FiXCircle size={16} />}
          />
        ),
      });
      return;
    }

    setLoading(true);
    try {
      await resetpasswordApi({ token, newPassword: form.newPassword });

      setIsSuccess(true);

      toast({
        position: "top-right",
        duration: 2500,
        render: () => (
          <TerminalToast
            title="Password Updated"
            description="Your password has been reset successfully."
            accentColor={TOAST_COLOR.success}
            icon={<FiCheckCircle size={16} />}
          />
        ),
      });

      // Auto-redirect to login after 2s
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      toast({
        position: "top-right",
        duration: 2500,
        render: () => (
          <TerminalToast
            title="Reset Failed"
            description={
              error?.message || "Something went wrong. Please try again."
            }
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

        {!isSuccess ? (
          <>
            <Heading size="md" textAlign="center" mb={1} className="neon-text">
              Set New Password
            </Heading>

            <Text
              textAlign="center"
              fontSize="sm"
              color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
              mb={6}
            >
              Enter your new password below
            </Text>

            <Stack spacing={4}>
              {/* New Password */}
              <InputGroup>
                <Input
                  placeholder="New password"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={form.newPassword}
                  onChange={handleChange}
                  {...inputStyle}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Toggle password"
                    icon={showPassword ? <FiEyeOff /> : <FiEye />}
                    size="sm"
                    variant="ghost"
                    color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
                    onClick={() => setShowPassword(!showPassword)}
                    _hover={{ color: "#00e066", bg: "transparent" }}
                  />
                </InputRightElement>
              </InputGroup>

              {/* Confirm Password */}
              <InputGroup>
                <Input
                  placeholder="Confirm new password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                  {...inputStyle}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Toggle password"
                    icon={showPassword ? <FiEyeOff /> : <FiEye />}
                    size="sm"
                    variant="ghost"
                    color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
                    onClick={() => setShowPassword(!showPassword)}
                    _hover={{ color: "#00e066", bg: "transparent" }}
                  />
                </InputRightElement>
              </InputGroup>

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
                loadingText="Updating..."
              >
                Update Password
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
              Password Updated!
            </Heading>

            <Text
              textAlign="center"
              fontSize="sm"
              color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
            >
              Your password has been reset successfully. Redirecting you to
              login...
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
              Go to Login
            </Button>
          </Stack>
        )}

        {!isSuccess && (
          <Text
            mt={6}
            fontSize="sm"
            textAlign="center"
            color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
          >
            Remembered your password?{" "}
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
