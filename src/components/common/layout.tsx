import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex h-full">
      <Sidebar />

      <main className="w-full bg-gray-100 min-h-screen">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
