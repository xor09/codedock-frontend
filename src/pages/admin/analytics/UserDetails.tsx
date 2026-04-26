import {
  Box,
  Button,
  Heading,
  Text,
  useColorMode,
  Progress,
  Flex,
} from "@chakra-ui/react";
import { Teacher, Student } from "../../types";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Props = {
  user: Teacher | Student;
  onBack: () => void;
};

export default function UserDetails({ user, onBack }: Props) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const courseName = "subject" in user ? user.subject : user.course;

  const lineData = [
    { topic: "Start", progress: 0 },
    { topic: "Intro", progress: 20 },
    { topic: "Basics", progress: 40 },
    { topic: "API", progress: 60 },
    { topic: "Current", progress: user.progress },
    { topic: "Target", progress: 100 },
  ];

  const pieData = [
    { name: "Completed", value: user.progress },
    { name: "Remaining", value: 100 - user.progress },
  ];

  const COLORS = ["#00e066", "#2a2a2e"];

  return (
    <Box w="100%">
      {/* 🔙 Back */}
      <Button mb={4} onClick={onBack}>
        ← Back
      </Button>

      {/* 👤 User Info */}
      <Heading size="md" mb={4}>
        {user.name}
      </Heading>

      <Text mb={2}>Course: {courseName}</Text>

      {/* 🔥 PROGRESS BAR */}
      <Box mb={6}>
        <Progress
          value={user.progress}
          size="md"
          borderRadius="full"
          mb={2}
          bg={isDark ? "gray.700" : "gray.200"}
          sx={{
            "& > div": {
              background: "linear-gradient(90deg, #00e066, #00b352)",
            },
          }}
        />
        <Text fontSize="sm" color="gray.400">
          {user.progress}% completed
        </Text>
      </Box>

      {/* 📈 LINE CHART */}
      <Box
        h="260px"
        mb={8}
        borderRadius="12px"
        bg={isDark ? "rgba(20,20,22,0.75)" : "white"}
        p={4}
      >
        <Text mb={3} fontWeight="600">
          Topic Progress (0 → 100%)
        </Text>

        <Box h="200px">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <XAxis dataKey="topic" stroke={isDark ? "#aaa" : "#333"} />
              <YAxis domain={[0, 100]} stroke={isDark ? "#aaa" : "#333"} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#00e066"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* 🥧 PIE CHART (FINAL FIXED) */}
      <Box
        h="320px"
        borderRadius="12px"
        bg={isDark ? "rgba(20,20,22,0.75)" : "white"}
        position="relative"
        display="flex"
        flexDirection="column"
      >
        <Text p={4} fontWeight="600">
          Course Completion
        </Text>

        {/* 🔥 CRITICAL FIX */}
        <Box flex="1" minH="0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}   // ✅ donut prevents clipping
                outerRadius={100}
                paddingAngle={2}
                isAnimationActive={true}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* 🔥 CENTER TEXT */}
        <Flex
          position="absolute"
          top="55%"
          left="50%"
          transform="translate(-50%, -50%)"
          direction="column"
          align="center"
          pointerEvents="none"
        >
          <Text fontSize="2xl" fontWeight="bold" color="#00e066">
            {user.progress}%
          </Text>
          <Text fontSize="xs" color="gray.400">
            Completed
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}