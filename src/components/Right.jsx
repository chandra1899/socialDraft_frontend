import React from 'react'
import retweet from '../assets/retweet.png'
import {following} from '../constants'

const Following=({logo, name,email})=>(
  <div className='flex flex-col border-2 border-slate-600 rounded-2xl left-2  p-2 mb-2 min-w-[97%]'>
    <div>
      <img src={logo} className='h-[40px] w-[40px] rounded-full' alt="" />
      <div>
        <h3 className='font-bold text-xl mt-3'>{name}</h3>
        <p className='text-[#dfd9ff] text-[0.9rem]'>{email}</p>
      </div>
    </div>
    <div className='flex flex-row justify-around text-[0.7rem]'>
      <div className='flex justify-center items-center'>
        <p className='text-[0.8rem] text-[#dfd9ff]'>Followers &nbsp;</p>
        <p>65</p>
      </div>
      <div className='flex justify-center items-center'>
        <p className='text-[0.8rem] text-[#dfd9ff]'>following &nbsp;</p>
        <p className=''>65</p>
      </div>
      <div className='flex justify-center items-center'>
        <img src={retweet} className='h-[20px] w-[20px] mr-1' alt="retweet" />
        <p className=''>65</p>
      </div>
    </div>

  </div>
)

const Right = () => {
  return (
    <div className='h-full hidden sm:flex flex-col min-w-[33%] ml-2 items-center right-2 rounded-3xl p-2 border-2 border-slate-700 '>
    <h3 className='font-medium text-[23px] my-3'>Fowllowing</h3>
    <div className='border-t-2 border-slate-500 py-3 min-w-[95%] overflow-scroll no-scrollbar'>
      {following.map((follower)=>(
        <Following follower={follower}/>
      ))}
    </div>
   </div>
  )
}

export default Right
