import React,{useState,useContext,useEffect } from 'react'
import {ProfileBox} from '../components'
import {menubList} from '../constants'
import profile from '../assets/profile.png'
import dark from '../assets/dark.png'
import close from '../assets/close.svg'
import menu from '../assets/menu.svg'
import { Link } from "react-router-dom";
import { appState } from '../App'

const Left = () => {
  const {calluser,postForm,setPostForm}=useContext(appState);
  const [active,setActive]=useState('');
  const [toggle,setToggle]=useState(false);
  useEffect( () => {
    calluser();
   // console.log(user);
 }, []);

  return (
   <div >
    <div className='bg-gradient-to-b hidden sm:flex rounded-3xl fixed overflow-y-scroll top-6 left-4 bottom-4 z-0 from-black to-blue-950 h-full max-w-[28%] p-3 overflow-hidden flex-col no-scrollbar border-2 border-slate-700'>
      <ProfileBox/>
      <div className=' flex flex-col mt-4 py-5 '>
        <div className={`${
            active==='Home'?"text-white":"text-secondary"
          } hover:text-white text-bold text-[20px] font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Home')}}>
            <img src={profile} alt="" className='ml-10 h-[15px] mt-1 w-[15px]' />
            <Link className='ml-4' to='/'>Home</Link>
        </div>
        <div className={`${
            active==='Profile'?"text-white":"text-secondary"
          } hover:text-white text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Profile')}}>
            <img src={profile} alt="" className='ml-10 h-[15px] mt-1 w-[15px]' />
            <Link className='ml-4' to='/profile'>Profile</Link>
        </div>
        <div className={`${
            active==='Post'?"text-white":"text-secondary"
          } hover:text-white text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Post')}}>
            <img src={profile} alt="" className='ml-10 h-[15px] mt-1 w-[15px]' />
            <p className='ml-4' onClick={()=>{setPostForm((pre)=>!pre)}}>Post</p>
        </div>
        <div className={`${
            active==='Bookmark'?"text-white":"text-secondary"
          } hover:text-white text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Bookmark')}}>
            <img src={profile} alt="" className='ml-10 h-[15px] mt-1 w-[15px]' />
            <Link className='ml-4' to='/bookmark'>Bookmark</Link>
        </div>
        <div className={`${
            active==='Log-Out'?"text-white":"text-secondary"
          } hover:text-white text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Log-Out')}}>
            <img src={profile} alt="" className='ml-10 h-[15px] mt-1 w-[15px]' />
            <Link className='ml-4' to='/sign-out'>Log-Out</Link>
        </div>
      </div>
      <div className='flex flex-row justify-start items-center border-t-2  border-slate-400 p-2 '>
        <img className='h-[45px] w-[45]  mb-3 mt-2 mx-2 ml-6' src={dark} alt="mode" />
        <h3 className=' hover:text-secondary mb-3 mt-2   ml-3 text-[22px] font-medium 
         cursor-pointer' > Dark</h3>
      </div>
    </div>
    <div className='sm:hidden fixed top-0 z-10 flex flex-1 h-[600px] max-w-[38px] bg-gradient-to-t from-black to-blue-950'>
    <img src={toggle?close:menu} alt="menu" 
      className='w-[28px] h-[28px] object-contain m-1 cursor-pointer'
      onClick={()=>setToggle(!toggle)}
      />
      <div className={`${!toggle?'hidden':'flex'} p-6 bg-black-gradient absolute top-6 left-0 mx-6 my-3 min-w-[140px] z-10 rounded-xl`}>
      <ul className='list-none flex justify-end z-10 items-start flex-col gap-4'>
    {
      menubList.map((item)=>(
        <li
        key={item.name}
        className={`${
          active===item.name?"text-white":"text-secondary"
        } font-poppins font-medium cursor-pointer text-[16px]`}
        onClick={()=>{setToggle(!toggle);setActive(item.name)}}
        >
          <Link to={`${item.link}`}>{item.name}</Link>
        </li>
      ))
    }
    </ul>
      </div>
    </div>
   </div>
    
  )
}

export default Left
