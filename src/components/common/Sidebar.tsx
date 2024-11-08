import { navItems } from "@/utils/navitems";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="flex flex-col border-r w-60">
      <div className="flex items-center justify-center w-full p-4 border-b">
        <Link to={"/"} className="w-20 h-20">
          <img
            src="/assets/ASDM_Logo.png"
            alt="logo"
            className="w-full h-full bg-cover"
          />
        </Link>
      </div>

      <div>
        {navItems.map((item, index) => (
          <Link to={item.link || "/"} className="w-full h-full" key={index}>
            <div className="flex items-center justify-start p-4 border-b cursor-pointer hover:bg-gray-50 hover:shadow-inner">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
