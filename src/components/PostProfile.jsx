import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const PostProfile = ({user}) => {
  const navigate=useNavigate()
  return (
    <div className='flex flex-row p-3 ml-2' >
      <img src={logo} alt="logo" className='h-[40px] w-[40px] rounded-full mr-3 cursor-pointer' onClick={()=>{navigate(`/people/${user._id}`)}} />
      <div className='flex flex-col'>
        <h3 className='font-medium -mt-1' >{user.name}</h3>
        <p className='text-[0.8rem] text-[#42a5c6]'>#{user.email}</p>
      </div>
    </div>
  )
}

export default PostProfile
