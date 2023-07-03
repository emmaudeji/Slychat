import {useState} from 'react'

const MobileNav = ({ user, logout }) => {
  const [show, setShow] = useState(false)

  return (
    <div className='relative z-50'>
      <div className="">
      {user ? (
          <div onClick={()=>setShow(p=>!p)} 
          className="rounded-full text-white bg-green-700 p-2 h-8 w-8 flex items-center justify-center">
            <p>{user?.result.name[0]}</p>
          </div>
        ) : <a href={'/auth'} className="rounded-full text-white bg-green-700 py-2 cursor-pointer  px-8 ">
        {'Sign In'}
      </a> }
      </div>

      { show ? <div className="absolute w-48 grid top-14 right-0  border  text-[14px] capitalize gap-2 bg-zinc-200 p-4 rounded-lg">
        {/* <div>
          <p onClick={''}
              className="rounded-full text-white bg-green-700 py-2  cursor-pointer w-full  text-center">
              Create Post
            </p>
        </div> */}
          <div>
          <p onClick={logout}
            className="rounded-full text-white bg-green-700 py-2  cursor-pointer w-full  text-center ">
            Sign Out
          </p>
          </div>
          
      </div> : null}

    </div>
  )
}

export default MobileNav