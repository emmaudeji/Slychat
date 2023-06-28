
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Post } from './post/Post';


export const Posts = ({ setCurrentId }) => {
  const allPosts = useSelector((state) => state.posts);

  const [posts, setPosts] = useState(allPosts?.allPosts)

  useEffect(() => {
    setPosts(allPosts?.allPosts)
  }, [allPosts])
  
  console.log('pppp', allPosts)
  return (
    <>
      { !allPosts ? (<div className='font-semibold text2xl'> Loading... </div>) :
        !allPosts?.length ? (<div className='font-semibold text2xl'> Na data in the list </div>) : (
          <div className=" grid md:grid-cols-2 xl:grid-cols-3 gap-3">
            {
              allPosts?.map(({ _id, name, creator, title, createdAt, message, likes, selectedFile,  tags }) => (
                <div key={_id}>
                  <Post setCurrentId={setCurrentId} _id={_id} creator={creator}
                    title={title} message={message} selectedFile={selectedFile} 
                     tags={tags} createdAt={createdAt} likes={likes} name={name} />
                </div>
              ))
            }
          </div>
        )
      }
    </>
  )
}

