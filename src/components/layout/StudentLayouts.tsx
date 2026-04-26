import { Outlet } from "react-router-dom";
// import StudentSidebar from "../student/StudentSidebar";
import StudentSidebar from "../../pages/student/StudentSidebar";

export default function StudentLayout() {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <StudentSidebar />

      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
