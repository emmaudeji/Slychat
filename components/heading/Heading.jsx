import { useState, useEffect } from "react"
import { Link} from "next/link"
import { useDispatch,  } from "react-redux"
import { LOGOUT } from "../../constants/actionTypes"
import decode from 'jwt-decode';
import { useRouter } from "next/router";

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
          Chatboard
        </a>

        <div className="text-[14px] capitalize flex items-center gap-2 sm:gap-4 justify-end ">
         {user ? ( <>
              <div className="rounded-full text-white bg-green-700 p-2 h-8 w-8 flex items-center justify-center">
                <p>{user?.result.name[0]}</p>
              </div>
              <div>
                <p className=" font-semibold">{user?.result.name}</p>
              </div>
            </>
          ) : null}

          {!user ? <a href={'/auth'} className="rounded-full text-white bg-green-700 py-2 cursor-pointer  px-8 ">
            {'Sign In'}
          </a> : 
          <div onClick={logout}
          className="rounded-full text-white bg-green-700 py-2  cursor-pointer   px-8 ">
            {'Sign Out'}
          </div>}
          
        </div>
      </div>

  )
}

