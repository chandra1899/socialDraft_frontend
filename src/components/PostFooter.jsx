import React from 'react'

const PostFooter = ({post}) => {
  return (
    <div className='flex flex-row justify-around items-center p-3'>
        <p className='text-[#f93838] text-[0.9rem] font-bold'>{post.likes.length} Like</p>
        <p className='text-[#f4c838] text-[0.9rem] font-bold'>Comments</p>
        <p className='text-[#3a3afb] text-[0.9rem] font-bold'>Retweets</p>
        <p className='text-[#3ff339] text-[0.9rem] font-bold'>Save</p>      
    </div>
  )
}

export default PostFooter
