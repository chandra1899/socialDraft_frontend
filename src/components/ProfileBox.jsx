import React,{useState,useContext} from 'react'
import logo from '../assets/logo.png'
import {appState} from '../App'

const ProfileBox = () => {
  const {user,setUser,openSignUp,setOpenSignUp,openLogin,setOpenLogin}=useContext(appState)
  // console.log(user);
  const {name,email,following,followers}=user;
  return (
    <>
    {user && <div className='flex flex-col  border-b-2 border-slate-400 mt-4 pb-3 '>
        <div className='flex flex-row flex-wrap  justify-center items-center h-full px-7 text-white'>
      <img src={logo} alt="logo" className='-ml-2 h-[60px] w-[60px] m-3 rounded-full' />
      <div className='flex flex-col'>
        <h3 className='font-bold text-xl mt-3'>{name}</h3>
        <p className='text-[#dfd9ff] text-[0.9rem] '>#{email}</p>
      </div>
    </div>
    <div className='ml-10 mt-2 mb-2 text-white'>
        {/* <h3 className=' text-white text-bold'>{following.length} <span className='text-[#dfd9ff] text-[0.9rem]'>following</span>&nbsp; | &nbsp; {followers.length} <span className='text-[#dfd9ff] text-[0.9rem]'>followers</span></h3> */}
    </div>
    </div>}
    {!user && <div className='fllex flex-row justify-center h-[60px] w-[200px] font-medium p-3 items-center'>
      <button className='h-[35px] rounded-xl w-[70px] m-2 p-1 bg-green-600 cursor-pointer' 
       onClick={()=>{setOpenLogin(prev=>!prev);setOpenSignUp(false)}} >Login</button>
        <button className='h-[35px] rounded-xl w-[70px] m-2 p-1 bg-red-600 cursor-pointer' 
         onClick={()=>{setOpenSignUp(prev=>!prev);setOpenLogin(false)}}>SignUp</button>
      </div>}
    </>
  )
}

export default ProfileBox
