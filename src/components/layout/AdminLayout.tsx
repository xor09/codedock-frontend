import { Outlet } from "react-router-dom";
import Sidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}