import { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  useColorMode,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image
} from '@chakra-ui/react'
import { FiSun, FiMoon, FiUser, FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logo from "../../../dist/HavinCode.jpeg"

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const [time, setTime] = useState(new Date())

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box px={4} py={3}>
      <Flex
        align="center"
        justify="space-between"
        bg={isDark ? 'rgba(30, 30, 32, 0.8)' : 'rgba(255, 255, 255, 0.8)'}
        backdropFilter="blur(20px)"
        borderRadius="14px"
        border="1px solid"
        borderColor={isDark ? 'whiteAlpha.100' : 'blackAlpha.100'}
        px={4}
        py={2.5}
        boxShadow={isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.08)'}
      >

        {/* Left */}
        <HStack spacing={4}>
          {/*
          <HStack spacing={2}>
            <Box className="traffic-light close" />
            <Box className="traffic-light minimize" />
            <Box className="traffic-light maximize" />
          </HStack> */}

    <HStack spacing={3}>
  {/* Logo */}
  <Flex
    w="65px"
    h="65px"
    borderRadius="12px"
    bg="linear-gradient(135deg, rgba(0,224,102,0.15), rgba(0,207,255,0.12))"
    align="center"
    justify="center"
    boxShadow="0 0 18px rgba(0,224,102,0.25)"
    backdropFilter="blur(10px)"
    onClick={() => navigate('/')}
    cursor="pointer"
    transition="all 0.25s ease"
    _hover={{
      transform: "translateY(-2px) scale(1.05)",
      boxShadow: "0 0 28px rgba(0,224,102,0.45)",
    }}
  >
    <Image
      src={logo}
      alt="HavinCode"
      w="70%"
      h="70%"
      objectFit="contain"
    />
  </Flex>

  {/* Brand Text */}
  <Box lineHeight="1">
    <Text
      fontSize="lg"
      fontWeight="900"
      bgGradient="linear(to-r, #00e066, #00cfff)"
      bgClip="text"
      letterSpacing="0.5px"
    >
      HavinCode
    </Text>

  </Box>
</HStack>
        </HStack>

        {/* Right */}
        <HStack spacing={4}>

          {/* 🔥 ADMIN BUTTON */}
          <Text
            fontSize="sm"
            fontWeight="700"
            color="#00e066"
            cursor="pointer"
            onClick={() => navigate("/admin")}
            _hover={{
              textDecoration: "underline",
              transform: "translateY(-1px)",
            }}
            transition="all 0.2s ease"
          >
            Admin
          </Text>

          {/* 🔥 TEACHER BUTTON */}
          <Text
            fontSize="sm"
            fontWeight="700"
            color="#00e066"
            cursor="pointer"
            onClick={() => navigate("/teacher")}
            _hover={{
              textDecoration: "underline",
              transform: "translateY(-1px)",
            }}
            transition="all 0.2s ease"
          >
            Teacher
          </Text>

          {/* 🔥 STUDENT BUTTON (ADDED) */}
          <Text
            fontSize="sm"
            fontWeight="700"
            color="#00e066"
            cursor="pointer"
            onClick={() => navigate("/student")}
            _hover={{
              textDecoration: "underline",
              transform: "translateY(-1px)",
            }}
            transition="all 0.2s ease"
          >
            Student
          </Text>

          {/* User */}
          {!user ? (
            <Tooltip label="Login">
              <IconButton
                aria-label="Login"
                icon={<FiUser />}
                size="sm"
                variant="ghost"
                color={isDark ? "whiteAlpha.800" : "blackAlpha.700"}
                onClick={() => navigate("/login")}
                _hover={{
                  bg: isDark ? "whiteAlpha.100" : "blackAlpha.100",
                }}
              />
            </Tooltip>
          ) : (
            <Menu>
              <Tooltip label="Account">
                <MenuButton
                  as={IconButton}
                  aria-label="Account"
                  icon={<FiUser />}
                  size="sm"
                  variant="ghost"
                />
              </Tooltip>

              <MenuList
                bg={isDark ? "blackAlpha.900" : "white"}
                borderColor={isDark ? "whiteAlpha.200" : "blackAlpha.200"}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>

                <MenuItem
                  icon={<FiLogOut />}
                  onClick={() => {
                    logout()
                    navigate("/login")
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}

          {/* Clock */}
          <Box textAlign="right" display={{ base: 'none', md: 'block' }}>
            <Text fontSize="13px" fontWeight="700" fontFamily="mono">
              {time.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </Text>
            <Text fontSize="9px" color="gray.500">
              {time.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </Box>

          {/* Theme */}
          <Tooltip label={isDark ? 'Light mode' : 'Dark mode'}>
            <IconButton
              aria-label="Toggle theme"
              icon={isDark ? <FiSun /> : <FiMoon />}
              onClick={toggleColorMode}
              size="sm"
              variant="ghost"
            />
          </Tooltip>

        </HStack>
      </Flex>
    </Box>
  )
}