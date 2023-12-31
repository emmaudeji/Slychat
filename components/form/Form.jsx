
import { useState, useEffect } from "react";
import FileBase from 'react-file-base64';
import { createPost, updatePost } from "../../actions/posts";
import { useDispatch, useSelector } from 'react-redux';

import { FormInput } from "./FormInput";
import { UnsplashPhotos } from "./UnsplashPhotos";


const Form = ({currentId, setCurrentId}) => {
  const [user, setUser] = useState(null)
  const [show, setShow] = useState(false)
  const [pickedImg, setPickedImg] = useState('')
 

  const [postData, setPostData] = useState({ 
     title: '', message: '', tags: '', selectedFile: '' });
      
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [])
  
  

  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null) ;

  const dispatch = useDispatch()

  useEffect(() => {
      if(post) setPostData(post)
    }, [post])


  const handleChange = (e) => {
    const {name, value} = e.target;
    setPostData(prevValue => {
      if(name === 'tags'){
        return {
          ...prevValue,
          [name]: value.split(',')
        } 
      } else {
      return {
        ...prevValue,
        [name]: value
      }
    }
  })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // post request
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }))
    }
    clearData();
  }

  const clearData = () => {
    setPostData({
       title: '', message: '', tags: '', selectedFile: ''
      })
    setCurrentId(null);
    setPickedImg('')
    setShow(false)
  }


  
  if(!user?.result?.name){
    return (
      <div className="grid gap-3 p-4 text-[14px] border border-zinc-300 rounded">
        <p>{`You can register or signin to start adding memories and liking others post.`}</p> 
        <a href='/auth'
        className="bg-green-700 p-2 text-white hover:bg-green-500 duration-300 rounded text-center cursor-pointer">
          Register
        </a>
      </div>
    )
  }

  return (
    <>
    {/* for wide screen */}
    <div className="w-full p-2 border border-zinc-300 sm:block hidden">
        <div 
        className="flex justify-center items-center p-3 font-semibold mb-2">
          <h3>
            {currentId ? `Editting a Memory` : `Create a Memory`}
          </h3>
        </div>
        <PostForm handleChange={handleChange} handleSubmit={handleSubmit} postData={postData} clearData={clearData} setPostData={setPostData} pickedImg={pickedImg} setPickedImg={setPickedImg}/>
      </div>
      
{/* for small screen */}
      <div className="w-full p-2 border border-zinc-300 block sm:hidden">
        <div onClick={() => setShow(prev => !prev)}
        className="flex justify-center items-center p-3 font-semibold mb-2 bg-green-700 text-white rounded-lg hover:bg-green-500 duration-300 cursor-pointer">
          <h3>
            {currentId ? `Editting a Memory` : `Create a Memory`}
          </h3>
        </div>
        { show && <PostForm handleChange={handleChange} handleSubmit={handleSubmit} postData={postData} clearData={clearData} setPostData={setPostData} pickedImg={pickedImg} setPickedImg={setPickedImg} setShow={setShow}/>}
      </div>
    </>
    
  )
}

export default Form;

export const PostForm = ({postData, handleChange, handleSubmit, clearData, setPostData, pickedImg, setPickedImg}) => {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-col ">
        <FormInput
          handleChange={handleChange} value={postData.title} title={'title'} placeholder={`Enter title of message`}
        />

        
          <div className="rounded w-full">
            <p className="text-zinc-700 capitalize">Message</p>
            <textarea type="text"
              onChange={handleChange} value={postData.message} name="message" placeholder="Enter your chat"
              className="w-full h-20 flex p-3 border border-zinc-300 bg-white "
            >{postData.message} 
              </textarea>
              
          </div>

        <FormInput
          handleChange={handleChange} value={postData.tags} title={'tags'} placeholder={``}
        />

      
        <div className="">
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>

        <UnsplashPhotos postData={postData} setPostData={setPostData} pickedImg={pickedImg} setPickedImg={setPickedImg}/>


        <button type="submit" className="flex text-white rounded cursor-pointer hover:bg-red-500 duration-300 bg-red-700 w-full p-3 justify-center items-center">
          Submit
        </button>

       
        <div className="flex text-white cursor-pointer hover:bg-green-500 duration-300 rounded bg-green-700 w-full p-3 justify-center items-center"
        onClick={clearData}>
          Clear
        </div>

      </form>
  )
}

