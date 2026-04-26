import { Box, Flex, useColorMode } from '@chakra-ui/react'
import Navbar from './components/layout/Navbar'
import AppRoutes from './components/AppRouter'

function App() {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Flex
      direction="column"
      h="100vh"
      bg={isDark ? '#0a0a0c' : '#f5f5f7'}
      overflow="hidden"
    >
      <Box
        position="sticky"
        top="0"
        zIndex={2000}
      >
        <Navbar />
      </Box>
      <Box flex={1} overflow="hidden" p={4}>
        <AppRoutes />
      </Box>
    </Flex>
  )
}

export default App