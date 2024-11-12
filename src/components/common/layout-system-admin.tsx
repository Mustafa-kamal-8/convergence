import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function LayoutSystemAdmin() {
  return (
    <div className="flex h-full">
      <main className="w-full bg-gray-100 min-h-screen">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
