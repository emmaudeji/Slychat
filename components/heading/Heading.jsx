import { useState, useEffect } from "react"
import { useDispatch,  } from "react-redux"
import { LOGOUT } from "../../constants/actionTypes"
import decode from 'jwt-decode';
import { useRouter } from "next/router";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export const Heading = () => {
  const [user, setUser] = useState(JSON.parse(typeof window !== "undefined" ? window.localStorage.getItem('profile') : false));

  const initialState = {
    access: typeof window !== "undefined" ? window.localStorage.getItem('access') : false,
    refresh: typeof window !== "undefined" ?  window.localStorage.getItem('refresh') : false,
    isAuthenticated: null,
    user: null
};

  const dispatch = useDispatch();
  const router = useRouter()
  // console.log(user)

  const logout = () => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
    router.reload();
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(typeof window !== "undefined" ? window.localStorage.getItem('profile') : false));
  }, [router.pathname]);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16  h-24 flex justify-between border-b border-zinc-300 items-center">
        <a href="/" className="logo font-bold text-2xl">
          Slychat
        </a>

        <div className="hidden sm:flex">
          <DesktopNav user={user} logout={logout}/>
        </div>

        <div className="sm:hidden flex">
          <MobileNav user={user} logout={logout}/>
        </div>

      </div>

  )
}

