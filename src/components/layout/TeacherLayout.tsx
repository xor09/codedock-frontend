import { Outlet } from "react-router-dom";
// import TeacherSidebar from "../teacher/TeacherSidebar";
import TeacherSidebar from "../../pages/teacher/TeacherSidebar";

export default function TeacherLayout() {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <TeacherSidebar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}