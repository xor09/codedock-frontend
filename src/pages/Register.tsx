import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorMode,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiCheckCircle, FiEye, FiEyeOff, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupApi } from "../api/auth";
import TerminalToast from "../components/TerminalToast";
import { TOAST_COLOR } from "../constants";

export default function Register() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();
  const toast = useToast();


  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
        toast({
            position: "top-right",
            duration: 2500,
            render: () => (
                <TerminalToast
                title="Password Mismatch!"
                description={"Password not matched!"}
                accentColor={TOAST_COLOR.danger}
                icon={<FiXCircle size={16} />}
                />
            ),
        });
        return;
    }
    
    setLoading(true)
    try {
         await signupApi(form);
        toast({
            position: "top-right",
            duration: 2500,
            render: () => (
                <TerminalToast
                    title="User Created"
                    description="Account created successfully. You can login now."
                    accentColor={TOAST_COLOR.success}
                    icon={<FiCheckCircle size={16} />}
                />
            ),
        });

        setTimeout(() => navigate("/login"), 1200);
    } catch (error: any) {
        toast({
            position: "top-right",
            duration: 2500,
            render: () => (
                <TerminalToast
                    title="User Creation Failed"
                    description={error?.message || "Login failed"}
                    accentColor={TOAST_COLOR.danger}
                    icon={<FiXCircle size={16} />}
                />
            ),
        });
        // alert(error?.message || "Login failed");
    } finally {
        setLoading(false)
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

        <Heading size="md" textAlign="center" mb={1} className="neon-text">
          Create Account
        </Heading>

        <Text
          textAlign="center"
          fontSize="sm"
          color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
          mb={6}
        >
          Start coding in real-time
        </Text>

        <Stack spacing={4}>
          <Input
            placeholder="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            {...inputStyle}
          />

          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            {...inputStyle}
          />

          {/* Password */}
          <InputGroup>
            <Input
              placeholder="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
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
                _hover={{
                  color: "#00e066",
                  bg: "transparent",
                }}
              />
            </InputRightElement>
          </InputGroup>

          {/* Confirm Password */}
          <InputGroup>
            <Input
              placeholder="Confirm password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
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
                _hover={{
                  color: "#00e066",
                  bg: "transparent",
                }}
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
          >
            Create Account
          </Button>
        </Stack>

        <Text
          mt={6}
          fontSize="sm"
          textAlign="center"
          color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
        >
          Already have an account?{" "}
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
      </Box>
    </Flex>
  );
}
