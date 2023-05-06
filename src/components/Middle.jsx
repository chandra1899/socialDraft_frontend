import React from 'react'
import {PostFooter,ProfileBox} from '../components'
import {posts} from '../constants'

const Post=({index})=>(
  
    <div key={index} className='flex flex-col rounded-2xl mb-2 p-1 bg-black min-h-[50%]  border-2 border-slate-700 hover:border-3 hover:border-slate-300 '>
    <ProfileBox/>
    <div>
      <p className='font-medium text-[18px] p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nulla modi cumque ducimus magni natus beatae autem cum? Nostrum sint incidunt cupiditate dolorum.</p>
    </div>
      <PostFooter/>
  </div>
  )

const Middle = () => {
  return (
   <div className='h-full min-w-[65%] mr-2 rounded-3xl p-2  overflow-scroll no-scrollbar'>
    {/* <div className='m-2 rounded-xl  text-white w-[100%] h-[50px] border-b-2 border-slate-600 p-2'>dfdsfv</div> */}
    <div className='flex flex-col overflow-scroll no-scrollbar '>
    {posts.map((post,i)=>(
      <Post key={i}/>
    ))}
    </div>
   </div>
  )
}

export default Middle
