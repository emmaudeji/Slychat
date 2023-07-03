
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Post } from './post/Post';
import { BallTriangle } from  'react-loader-spinner'

export const Posts = ({ setCurrentId }) => {
  const allPosts = useSelector((state) => state.posts);

  const [posts, setPosts] = useState(allPosts?.allPosts)

  useEffect(() => {
    setPosts(allPosts?.allPosts)
  }, [allPosts])
  


  // console.log('pppp', allPosts)
  return (
    <>
      { !allPosts?.length ? 
        <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      /> : (
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

