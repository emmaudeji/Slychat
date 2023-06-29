import { Posts } from '@/components/posts/Posts';
import Form from '@/components/form/Form';
import { useDispatch } from 'react-redux'
import { getPosts } from '@/actions/posts'
import { useState, useEffect } from 'react';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const [currentId, setCurrentId] = useState(null)

    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPosts());
    }, [ dispatch]);



  return (
    <main
      className={`overflow-hidden px-4 sm:px-8 lg:px-16 min-h-screen grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 py-10 ${inter.className}`}
    >
        <div className='sm:col-span-1 md:col-span-2 xl:col-span-3'>
          <Posts setCurrentId={setCurrentId}/> 
        </div>
        <div className="sm:col-span-1 order-first sm:order-last">
          <div className='w-full'>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </div>
        </div>
    </main>
  )
}
