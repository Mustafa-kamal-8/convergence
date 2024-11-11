import { Outlet, useSearchParams } from "react-router-dom";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "@/utils/api";
import { LoaderIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Protected() {
  const [token] = useSearchParams();
  const cookie = Cookies.get("Authorization");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setIsAuth, isAuth } = useAuth();

  // const token = import.meta.env.VITE_PUBLIC_SAMPLE_TOKEN;
  const finalToken = token?.get("token") || cookie;
  // const finalToken = token || cookie;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await API.post(`/validate-token`, {
          headers: {
            authorization: "authorization " + finalToken,
          },
        });
        if (!data.success) {
          navigate("/login", { replace: true });
          setIsAuth(false, null);
        }
        setIsAuth(true, data.user);
      } catch (error) {
        console.log("Axios Error: " + error);
        navigate("/login", { replace: true });
        setIsAuth(false, null);
      } finally {
      }
    };

    if (!isAuth) {
      verifyUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, finalToken]);

  return loading ? (
    <div className="flex items-center justify-center h-full">
      <LoaderIcon className="w-10 h-10 animate-spin" />
    </div>
  ) : (
    <Outlet />
  );
}
