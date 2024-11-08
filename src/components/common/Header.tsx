import { LoaderIcon, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import cookie from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      cookie.remove("Authorization");
      setTimeout(() => {
        navigate("/unauthorized");
      }, 1000);
    }, 500);
    setLoading(false);
  };

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b">
      <h1> Assam Skill Development Mission</h1>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="rounded-md border p-2 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-red-500 rounded-full cursor-pointer"></div>
              <h1>{user?.vsEntityName}</h1>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              <span>
                Log out{" "}
                {loading ? (
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : null}
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
