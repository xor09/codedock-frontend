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
} from '@chakra-ui/react'
import { FiSun, FiMoon, FiUser, FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'



export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const [time, setTime] = useState(new Date())
  console.log(user)

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
        {/* Left: Traffic lights + Logo */}
        <HStack spacing={4}>
          <HStack spacing={2}>
            <Box className="traffic-light close" />
            <Box className="traffic-light minimize" />
            <Box className="traffic-light maximize" />
          </HStack>

          <HStack spacing={3}>
            <Flex
              w="32px"
              h="32px"
              borderRadius="8px"
              bg="linear-gradient(135deg, #00e066 0%, #00b352 100%)"
              align="center"
              justify="center"
              boxShadow="0 4px 12px rgba(0, 224, 102, 0.3)"
              onClick={() => navigate('/')}
              _hover={{
                cursor: "pointer",
                transform: "translateY(-1px)",
              }}
              transition="all 0.2s ease"
            >
              <Text fontSize="sm" fontWeight="900" color="black">
                {'</>'}
              </Text>
            </Flex>
            <Box>
              <Text
                fontSize="md"
                fontWeight="800"
                letterSpacing="-0.5px"
                className="neon-text"
              >
                CodeDock
              </Text>
              <Text
                fontSize="10px"
                fontWeight="600"
                color={isDark ? 'whiteAlpha.500' : 'blackAlpha.500'}
                textTransform="uppercase"
                letterSpacing="0.5px"
              >
                Live Terminal
              </Text>
            </Box>
          </HStack>
        </HStack>

        {/* Right: Clock + Theme */}
        <HStack spacing={4}>
          {!user ? (
  // 🔐 NOT LOGGED IN — EXACT SAME BUTTON
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
        transform: "translateY(-1px)",
      }}
      transition="all 0.2s ease"
    />
  </Tooltip>
) : (
  // 👤 LOGGED IN — SAME BUTTON, JUST A MENU WRAPPER
  <Menu>
    <Tooltip label="Account">
      <MenuButton
        as={IconButton}
        aria-label="Account"
        icon={<FiUser />}
        size="sm"
        variant="ghost"
        color={isDark ? "whiteAlpha.800" : "blackAlpha.700"}
        _hover={{
          bg: isDark ? "whiteAlpha.100" : "blackAlpha.100",
          transform: "translateY(-1px)",
        }}
        transition="all 0.2s ease"
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
          logout();
          navigate("/login");
        }}
      >
        Logout
      </MenuItem>
    </MenuList>
  </Menu>
)}

          <Box textAlign="right" display={{ base: 'none', md: 'block' }}>
            <Text
              fontSize="13px"
              fontWeight="700"
              fontFamily="mono"
              color={isDark ? 'white' : 'black'}
            >
              {time.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </Text>
            <Text
              fontSize="9px"
              fontWeight="600"
              color={isDark ? 'whiteAlpha.400' : 'blackAlpha.400'}
              textTransform="uppercase"
            >
              {time.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </Box>

          <Tooltip label={isDark ? 'Light mode' : 'Dark mode'}>
            <IconButton
              aria-label="Toggle theme"
              icon={isDark ? <FiSun /> : <FiMoon />}
              onClick={toggleColorMode}
              size="sm"
              variant="ghost"
              color={isDark ? 'whiteAlpha.800' : 'blackAlpha.700'}
            />
          </Tooltip>
        </HStack>
      </Flex>
    </Box>
  )
}