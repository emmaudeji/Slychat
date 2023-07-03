import React from 'react'

const DesktopNav = ({user,logout}) => {
  return (
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

  )
}

export default DesktopNav