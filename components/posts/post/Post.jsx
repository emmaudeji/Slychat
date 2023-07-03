import moment from 'moment'
import {MdThumbUp, MdDelete, MdMore, MdThumbUpOutline} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { Toaster, toast } from 'react-hot-toast';

export const Post = ({_id, title, message, selectedFile, creator, likes, createdAt, name, tags,  setCurrentId}) => {

const dispatch = useDispatch()
const user = JSON.parse(localStorage.getItem('profile'));

const likeThisPost = (id) => {
  if (!user) {
    return toast.error('You are not signed in')
  }
  dispatch(likePost(id))
}

const deleteThisPost = (id) => {
  if(!user) {
    return toast.error('You are not signed in')
  }
  dispatch(deletePost(id))
}

const likedByUser = () => {
  if(user) {
    const userIdExist = likes?.filter(id => id === user._id);
    if(userIdExist) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}


  return (
    <div>
        <div className="w-full rounded border border-zinc-300  relative">
        <Toaster/>
      <div className="absolute top-5 right-0 left-0 px-3 z-20 text-white pb-0">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl">{name} </h2>
          
          {(user?.result?.googleId === creator || user?.result?._id === creator) && (
          <div onClick={() => setCurrentId(_id)}
          className="font-bold cursor-pointer hover:scale-110 duration-300">
            <MdMore/>
          </div>
          )}
          
        </div>
        <div className="pt-0">
        {moment(createdAt).fromNow()}
        </div>
      </div>

      <div className="img w-full h-48 overflow-hidden relative" >
        <img src={selectedFile} alt="post_img" className="w-full h-full object-cover hover:scale-110 duration-300"/>
        <div className="absolute bg-gradient-to-t from-black w-full h-full z-10 top-0 right-0 left-0" >
          {' '}
        </div>
      </div>
  
      <div className="p-3 h-48 relative">
        <div className="flex">
          {tags?.map((item, idx) => (
            <div key={idx} className="text-zinc-400  text-sm pr-1">{`#${item}`}</div>
          ))}
        </div>
        <div className="grid gap-2 h-full items-stretch pb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className=""><p>{message}</p></div>
          <div className="flex justify-between items-center" >

            <div onClick={() => likeThisPost(_id)}
            className="flex gap-1 cursor-pointer"> <Likes likes={likes} likedByUser={likedByUser}/> </div>
            
            {(user?.result?.googleId === creator || user?.result?._id === creator) && ( 
            <button onClick={() => deleteThisPost()}
            className='cursor-pointer' ><MdDelete/></button> )}

          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
}



export const Likes = ({likes, likedByUser}) => {
  
  const liked = likedByUser()

  if(likes?.length > 0) {
    return (
      <div className='text-sm flex gap-2'>
        <MdThumbUp/>
        <p>
        {
          liked && likes?.length > 1 ? `You and ${likes?.length - 1} others`  : `${likes?.length} like${likes?.length > 1 ? 's' : ''}`
        
        }
        </p>
      </div>
    )
  }

  return (
    <div className='text-sm flex gap-2'>
      <MdThumbUp/> <p> {`${likes?.length} Likes` }</p>  
    </div>
  )
}