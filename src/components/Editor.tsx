import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box,
  Flex,
  HStack,
  VStack,
  Button,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  useToast,
  useColorMode,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Divider,
  Badge,
} from '@chakra-ui/react'
import {
  FiPlay,
  FiDownload,
  FiCopy,
  FiSettings,
  FiTerminal,
  FiCode,
  FiTrash2,
  FiCpu,
  FiZap,
  FiChevronDown,
} from 'react-icons/fi'
import MonacoEditor, { type Monaco, type OnMount } from '@monaco-editor/react'
import { TEMPLATES } from '../constants'
import { api } from '../lib/api'

type Lang = 'cpp' | 'java' | 'python'

const langConfig: Record<Lang, { label: string; ext: string }> = {
  cpp: { label: 'C++', ext: 'cpp' },
  java: { label: 'Java', ext: 'java' },
  python: { label: 'Python', ext: 'py' },
}

export default function Editor() {
  const toast = useToast()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const monacoRef = useRef<Monaco | null>(null)
  const editorRef = useRef<any>(null)

  const [language, setLanguage] = useState<Lang>('cpp')
  const [code, setCode] = useState(TEMPLATES.cpp)
  const [stdin, setStdin] = useState('')
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const [execTime, setExecTime] = useState<number | null>(null)

  // Editor settings
  const [fontSize, setFontSize] = useState(14)
  const [tabSize, setTabSize] = useState(2)

  // Custom theme
  const defineTheme = useCallback((monaco: Monaco) => {
    monaco.editor.defineTheme('codedock-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'C586C0' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
      ],
      colors: {
        'editor.background': '#00000000',
        'editor.foreground': '#D4D4D4',
        'editor.lineHighlightBackground': '#ffffff08',
        'editor.selectionBackground': '#00e06630',
        'editorCursor.foreground': '#00e066',
        'editorLineNumber.foreground': '#ffffff30',
        'editorLineNumber.activeForeground': '#00e066',
      },
    })

    monaco.editor.defineTheme('codedock-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'AF00DB' },
        { token: 'string', foreground: 'A31515' },
      ],
      colors: {
        'editor.background': '#00000000',
        'editor.foreground': '#1d1d1f',
        'editor.lineHighlightBackground': '#00000008',
        'editor.selectionBackground': '#00b35230',
        'editorCursor.foreground': '#00b352',
        'editorLineNumber.foreground': '#00000030',
        'editorLineNumber.activeForeground': '#00b352',
      },
    })
  }, [])

  const handleEditorMount: OnMount = useCallback(
    (editor, monaco) => {
      editorRef.current = editor
      monacoRef.current = monaco
      defineTheme(monaco)
      monaco.editor.setTheme(isDark ? 'codedock-dark' : 'codedock-light')
    },
    [isDark, defineTheme]
  )

  // Theme sync
  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(isDark ? 'codedock-dark' : 'codedock-light')
    }
  }, [isDark])

  // Language change
  const changeLanguage = useCallback(
    (lang: Lang) => {
      const current = editorRef.current?.getValue() ?? code
      const prevTemplate = TEMPLATES[language]
      if (current.trim() === prevTemplate.trim()) {
        setCode(TEMPLATES[lang])
      }
      setLanguage(lang)
    },
    [language, code]
  )

  // Download
  const downloadCode = useCallback(() => {
    const blob = new Blob([editorRef.current?.getValue() ?? code], {
      type: 'text/plain;charset=utf-8',
    })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `solution.${langConfig[language].ext}`
    a.click()
    URL.revokeObjectURL(a.href)
    toast({ title: 'Downloaded!', status: 'success', duration: 1500 })
  }, [language, code, toast])

  // Copy
  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(editorRef.current?.getValue() ?? code)
      toast({ title: 'Copied!', status: 'success', duration: 1200 })
    } catch {
      toast({ title: 'Copy failed', status: 'error', duration: 1500 })
    }
  }, [code, toast])

  // Run
const runCode = useCallback(async () => {
  setRunning(true);
  setOutput('');
  setExecTime(null);
  const start = performance.now();

  try {
    const res = await api.post(`/run/${language}`, {
      language,
      code: editorRef.current?.getValue() ?? code,
      stdin,
    });

    const elapsed = Math.round(performance.now() - start);
    setExecTime(elapsed);

    const json = res.data;

    const lines: string[] = [];
    if (json.stdout) lines.push(json.stdout);
    if (json.stderr) lines.push(`[stderr]\n${json.stderr}`);
    if (json.exitCode !== undefined) lines.push(`\n[exit] ${json.exitCode}`);

    setOutput(lines.join("\n"));
  } catch (err: any) {
    setOutput(`Error: ${err?.message ?? "Unknown error"}`);
  } finally {
    setRunning(false);
  }
}, [language, code, stdin]);


  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        runCode()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [runCode])

  // Update editor options
  useEffect(() => {
    editorRef.current?.updateOptions({ fontSize, tabSize })
  }, [fontSize, tabSize])

  return (
    <Flex h="100%" direction="column" gap={4}>
      {/* Main Editor Window */}
      <Box
        flex={1}
        bg={isDark ? 'rgba(18, 18, 20, 0.9)' : 'rgba(255, 255, 255, 0.85)'}
        borderRadius="16px"
        border="1px solid"
        borderColor={isDark ? 'whiteAlpha.100' : 'blackAlpha.100'}
        backdropFilter="blur(40px)"
        boxShadow={
          isDark
            ? '0 24px 80px rgba(0,0,0,0.5)'
            : '0 24px 80px rgba(0,0,0,0.1)'
        }
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        {/* Title Bar */}
        <Flex
          align="center"
          justify="space-between"
          px={4}
          py={3}
          borderBottom="1px solid"
          borderColor={isDark ? 'whiteAlpha.50' : 'blackAlpha.50'}
          bg={isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)'}
        >
          <HStack spacing={4}>
            <HStack spacing={2}>
              <Box className="traffic-light close" />
              <Box className="traffic-light minimize" />
              <Box className="traffic-light maximize" />
            </HStack>

            {/* Language Selector */}
            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                variant="ghost"
                leftIcon={<FiCode />}
                rightIcon={<FiChevronDown />}
                fontWeight="600"
              >
                {langConfig[language].label}
              </MenuButton>
              <MenuList>
                {(Object.keys(langConfig) as Lang[]).map(lang => (
                  <MenuItem
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    fontWeight={language === lang ? '600' : '400'}
                  >
                    {langConfig[lang].label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <Text
              fontSize="12px"
              fontFamily="mono"
              color={isDark ? 'whiteAlpha.500' : 'blackAlpha.500'}
            >
              solution.{langConfig[language].ext}
            </Text>
          </HStack>

          <HStack spacing={2}>
            {/* Settings */}
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Settings"
                icon={<FiSettings />}
                size="sm"
                variant="ghost"
              />
              <MenuList p={4} minW="200px">
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="11px" fontWeight="600" mb={2} color="gray.500">
                      FONT SIZE: {fontSize}px
                    </Text>
                    <Slider
                      value={fontSize}
                      min={11}
                      max={20}
                      onChange={setFontSize}
                      colorScheme="green"
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </Box>
                  <Box>
                    <Text fontSize="11px" fontWeight="600" mb={2} color="gray.500">
                      TAB SIZE: {tabSize}
                    </Text>
                    <Slider
                      value={tabSize}
                      min={2}
                      max={8}
                      onChange={setTabSize}
                      colorScheme="green"
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </Box>
                  <Divider />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setCode(TEMPLATES[language])}
                  >
                    Reset Template
                  </Button>
                </VStack>
              </MenuList>
            </Menu>

            <Tooltip label="Download">
              <IconButton
                aria-label="Download"
                icon={<FiDownload />}
                size="sm"
                variant="ghost"
                onClick={downloadCode}
              />
            </Tooltip>

            <Tooltip label="Copy">
              <IconButton
                aria-label="Copy"
                icon={<FiCopy />}
                size="sm"
                variant="ghost"
                onClick={copyCode}
              />
            </Tooltip>

            <Divider orientation="vertical" h="20px" />

            <Tooltip label="Run (⌘+Enter)">
              <Button
                leftIcon={<FiPlay />}
                size="sm"
                bg="#00e066"
                color="black"
                fontWeight="600"
                onClick={runCode}
                isLoading={running}
                loadingText="Running"
                _hover={{
                  bg: '#00ff73',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 20px rgba(0,224,102,0.4)',
                }}
              >
                Run
              </Button>
            </Tooltip>
          </HStack>
        </Flex>

        {/* Monaco Editor */}
        <Box flex={1}>
          <MonacoEditor
            height="100%"
            language={language === 'cpp' ? 'cpp' : language}
            value={code}
            onChange={val => setCode(val ?? '')}
            onMount={handleEditorMount}
            theme={isDark ? 'codedock-dark' : 'codedock-light'}
            options={{
              automaticLayout: true,
              minimap: { enabled: false },
              fontSize,
              tabSize,
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              fontFamily: '"SF Mono", "JetBrains Mono", "Fira Code", monospace',
              fontLigatures: true,
              cursorBlinking: 'smooth',
              smoothScrolling: true,
            }}
          />
        </Box>
      </Box>

      {/* IO Panels */}
      <Flex gap={4} h="180px">
        {/* Input */}
        <Box
          flex={1}
          bg={isDark ? 'rgba(18, 18, 20, 0.8)' : 'rgba(255, 255, 255, 0.75)'}
          borderRadius="14px"
          border="1px solid"
          borderColor={isDark ? 'whiteAlpha.100' : 'blackAlpha.100'}
          backdropFilter="blur(20px)"
          overflow="hidden"
          display="flex"
          flexDirection="column"
        >
          <Flex
            align="center"
            px={4}
            py={2.5}
            borderBottom="1px solid"
            borderColor={isDark ? 'whiteAlpha.50' : 'blackAlpha.50'}
          >
            <HStack spacing={2}>
              <FiTerminal size={14} color="#00e066" />
              <Text fontSize="12px" fontWeight="700">
                Input
              </Text>
              <Text fontSize="10px" color="gray.500">
                stdin
              </Text>
            </HStack>
          </Flex>
          <Box flex={1} p={3}>
            <textarea
              placeholder="Enter program input..."
              value={stdin}
              onChange={e => setStdin(e.target.value)}
              style={{
                width: '100%',
                height: '100%',
                resize: 'none',
                background: 'transparent',
                color: isDark ? '#e8e8ed' : '#1d1d1f',
                border: 'none',
                outline: 'none',
                fontFamily: '"SF Mono", monospace',
                fontSize: '13px',
                lineHeight: 1.6,
              }}
            />
          </Box>
        </Box>

        {/* Output */}
        <Box
          flex={1.5}
          bg={isDark ? 'rgba(18, 18, 20, 0.8)' : 'rgba(255, 255, 255, 0.75)'}
          borderRadius="14px"
          border="1px solid"
          borderColor={isDark ? 'whiteAlpha.100' : 'blackAlpha.100'}
          backdropFilter="blur(20px)"
          overflow="hidden"
          display="flex"
          flexDirection="column"
        >
          <Flex
            align="center"
            justify="space-between"
            px={4}
            py={2.5}
            borderBottom="1px solid"
            borderColor={isDark ? 'whiteAlpha.50' : 'blackAlpha.50'}
          >
            <HStack spacing={2}>
              <FiCpu size={14} color="#00e066" />
              <Text fontSize="12px" fontWeight="700">
                Output
              </Text>
              {execTime !== null && (
                <Badge colorScheme="green" variant="subtle" fontSize="10px" borderRadius="full">
                  <HStack spacing={1}>
                    <FiZap size={10} />
                    <Text>{execTime}ms</Text>
                  </HStack>
                </Badge>
              )}
            </HStack>

            <HStack spacing={2}>
              <Tooltip label="Copy output">
                <IconButton
                  aria-label="Copy output"
                  icon={<FiCopy />}
                  size="xs"
                  variant="ghost"
                  onClick={() => navigator.clipboard.writeText(output)}
                  isDisabled={!output}
                />
              </Tooltip>
              <Tooltip label="Clear">
                <IconButton
                  aria-label="Clear"
                  icon={<FiTrash2 />}
                  size="xs"
                  variant="ghost"
                  onClick={() => {
                    setOutput('')
                    setStdin('')
                    setExecTime(null)
                  }}
                />
              </Tooltip>
            </HStack>
          </Flex>

          <Box
            flex={1}
            p={3}
            overflow="auto"
            fontFamily='"SF Mono", monospace'
            fontSize="13px"
            lineHeight={1.6}
            whiteSpace="pre-wrap"
            color={isDark ? 'whiteAlpha.900' : 'blackAlpha.900'}
          >
            {running ? (
              <HStack color="gray.500">
                <Box
                  w="8px"
                  h="8px"
                  borderRadius="full"
                  bg="#00e066"
                  className="pulse"
                />
                <Text>Executing...</Text>
              </HStack>
            ) : output ? (
              output
            ) : (
              <Text color="gray.500">Program output will appear here...</Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}