import React ,{useContext} from 'react'
import retweet from '../assets/retweet.png'
import { appState } from '../App'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'



const Following=({following,logo})=>{
  const navigate=useNavigate()
return (
  <div className='flex flex-col hover:bg-[#232334] transition duration-150 ease-in-out bg-black rounded-2xl left-2  p-2 mb-2 min-w-[97%] cursor-pointer' onClick={()=>navigate(`/people/${following.followable._id}`)}>
    <div className='flex flex-row justify-center items-center'>
      <img src={logo} className='h-[40px] w-[40px] mr-2 rounded-full' alt="" />
      <div className='-mt-3'>
        <h3 className='font-medium text-[0.9rem] mt-3'>{following.followable.name}</h3>
        <p className='text-[#42a5c6] text-[0.75rem]'>#{following.followable.email}</p>
      </div>
    </div>
    <div className='flex flex-row justify-around text-[0.7rem] mt-3'>
      <div className='flex justify-center items-center text-[#f4c838]'>
        <p className='text-[0.8rem] text-[#f4c838]'>Followers &nbsp;</p>
        <p>{following.followable.followers?following.followable.followers.length:'0'}</p>
      </div>
      <div className='flex justify-center items-center text-[#f4c838]'>
        <p className='text-[0.8rem] text-[#f4c838]'>following &nbsp;</p>
        <p className=''>{following.followable.following?following.followable.following.length:'0'}</p>
      </div>
      <div className='flex justify-center items-center'>
        <img src={retweet} className='h-[20px] w-[20px] mr-1' alt="retweet" />
        <p className=''>0</p>
      </div>
    </div>

  </div>
)
}

const Right = () => {
  const {following,setFollowing}=useContext(appState);

  return (
    <div className='h-full hidden sm:flex flex-col min-w-[33%] ml-2 items-center right-2 rounded-3xl p-2 border-2 border-slate-700 scroll-smooth'>
    <h3 className='font-medium text-[23px] my-3'>Following</h3>
    <div className='border-t-2 border-slate-500 py-3 min-w-[95%] overflow-scroll no-scrollbar'>
      {following.map((following)=>(
        <Following following={following} logo={logo} />
      ))}
    </div>
   </div>
  )
}

export default Right
