import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import CollegeTable from "./CollegeTable";
import CollegeDetails from "./CollegeDetails";
import UserDetails from "./UserDetails";
import { College, Teacher, Student } from "../../types";

export default function Analytics() {
  const [view, setView] = useState<
    "colleges" | "collegeDetails" | "userDetails"
  >("colleges");

  const [selectedCollege, setSelectedCollege] =
    useState<College | null>(null);

  const [selectedUser, setSelectedUser] =
    useState<Teacher | Student | null>(null);

  return (
    // <Layout>
      <Flex direction="column" p={8}>
        <Heading mb={6} className="neon-text">
          Analytics
        </Heading>

        {/* LEVEL 1 */}
        {view === "colleges" && (
          <CollegeTable
            onSelectCollege={(college) => {
              setSelectedCollege(college);
              setView("collegeDetails");
            }}
          />
        )}

        {/* LEVEL 2 */}
        {view === "collegeDetails" && selectedCollege && (
          <CollegeDetails
            college={selectedCollege}
            onBack={() => setView("colleges")}
            onSelectUser={(user) => {
              setSelectedUser(user);
              setView("userDetails");
            }}
          />
        )}

        {/* LEVEL 3 */}
        {view === "userDetails" && selectedUser && (
          <UserDetails
            user={selectedUser}
            onBack={() => setView("collegeDetails")}
          />
        )}
      </Flex>
    // </Layout>
  );
}