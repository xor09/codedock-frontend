import { useState } from "react";
import {
  Input,
  Link,
  VStack,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import { loginApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const accent = useColorModeValue("#00b352", "#00e066");
  const border = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const placeholder = useColorModeValue("blackAlpha.500", "whiteAlpha.500");
  const bg = useColorModeValue("gray.50", "whiteAlpha.50");

  const inputStyle = {
    variant: "unstyled",
    px: 3,
    py: 2.5,
    bg,
    border: "1px solid",
    borderColor: border,
    borderRadius: "10px",
    fontSize: "sm",
    _focus: {
      borderColor: accent,
      boxShadow: `0 0 0 1px ${accent}`,
    },
    _placeholder: { color: placeholder },
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res: any = await loginApi(email, password);
      login(res.token);
      navigate("/");
    } catch (err: any) {
      alert(err?.message || "Login failed");
    }
  };

  return (
    <AuthForm
      title="Access Terminal"
      subtitle="Authenticate to continue into CodeDock"
      buttonLabel="Enter"
      onSubmit={handleLogin}
      fields={
        <VStack spacing={4}>
          {/* Email */}
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            {...inputStyle}
          />

          {/* Password */}
          <InputGroup>
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              {...inputStyle}
              pr="40px"
            />

            <InputRightElement h="100%">
              <IconButton
                aria-label="Toggle password"
                icon={showPassword ? <FiEyeOff /> : <FiEye />}
                size="sm"
                variant="ghost"
                color={isDark ? "whiteAlpha.600" : "blackAlpha.600"}
                onClick={() => setShowPassword(!showPassword)}
                _hover={{
                  color: accent,
                  bg: "transparent",
                }}
              />
            </InputRightElement>
          </InputGroup>
        </VStack>
      }
      footer={
        <VStack spacing={2} pt={2}>
          <Link
            href="/signup"
            fontSize="xs"
            color={accent}
            fontWeight="600"
            _hover={{ textDecoration: "underline" }}
          >
            Create an account
          </Link>

          <Text fontSize="10px" color="whiteAlpha.400">
            or
          </Text>

          <Link
            href="/forgot-password"
            fontSize="xs"
            color="whiteAlpha.500"
            _hover={{ color: accent }}
          >
            Forgot password?
          </Link>
        </VStack>
      }
    />
  );
}
