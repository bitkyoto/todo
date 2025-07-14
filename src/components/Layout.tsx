import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};
