import React,{useState,useContext,useEffect } from 'react'
import {ProfileBox} from '../components'
import {menubList} from '../constants'
import profile from '../assets/profile.png'
import Dark from '../assets/dark.png'
import close from '../assets/close.svg'
import menu from '../assets/menu.svg'
import { Link } from "react-router-dom";
import { appState } from '../App'


const Left = () => {
  const {calluser,postForm,setPostForm,dark,setDark}=useContext(appState);
  const [active,setActive]=useState('');
  const [toggle,setToggle]=useState(false);
  useEffect( () => {
    calluser();
   // console.log(user);
 }, []);

  return (
   <div >
    <div className={`bg-gradient-to-b hidden sm:flex rounded-3xl fixed overflow-y-scroll top-6 left-4 bottom-4 z-0 ${dark?"from-black to-blue-950 border-slate-700":"bg-gray-200 border-slate-300"} h-full max-w-[27%] p-3 overflow-hidden flex-col no-scrollbar border-2 `}>
      <ProfileBox/>
      <div className=' flex flex-col mt-4 py-5 '>
        <div className={`${
            active==='Home'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-bold text-[20px] font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Home')}}>
            <img src={profile} alt="" className='ml-10 h-[15px] mt-1 w-[15px]' />
            <Link className='ml-4' to='/'>Home</Link>
        </div>
        <div className={`${
            active==='Profile'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Profile')}}>
            <img src={profile} alt="" className='ml-10 h-[15px] mt-1 w-[15px]' />
            <Link className='ml-4' to='/profile'>Profile</Link>
        </div>
        <div className={`${
            active==='Post'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Post')}}>
            <img src={profile} alt="" className='ml-10 h-[15px] mt-1 w-[15px]' />
            <p className='ml-4' onClick={()=>{setPostForm((pre)=>!pre)}}>Post</p>
        </div>
        <div className={`${
           active==='Bookmark'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Bookmark')}}>
            <img src={profile} alt="" className='ml-10 h-[15px] mt-1 w-[15px]' />
            <Link className='ml-4' to='/bookmark'>Bookmark</Link>
        </div>
        <div className={`${
            active==='Log-Out'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Log-Out')}}>
            <img src={profile} alt="" className='ml-10 h-[15px] mt-1 w-[15px]' />
            <Link className='ml-4' to='/sign-out'>Log-Out</Link>
        </div>
      </div>
      <div  className='flex flex-row justify-start items-center border-t-2  border-slate-400 p-2 '>
      
          <label   htmlFor="check" className='bg-blue-600 cursor-pointer relative w-16 h-8 rounded-full ' >
            <input onClick={()=>{setDark((prev)=> !prev);}} type="checkbox" id='check' className='sr-only peer ' />
            <span onClick={()=>{setDark((prev)=> !prev);}} className={`w-2/5 h-4/5  absolute rounded-full ${dark?"left-1 bg-black":"left-9  bg-white"}  top-1 peer-checked:  translate-all duration-500`}></span>
          </label>

        <h3 onClick={()=>{setDark((prev)=> !prev);}} className={` ${dark?"hover:text-secondary":"hover:text-black"} mb-3 mt-2   ml-3 text-[22px] font-medium 
         cursor-pointer`} >{` ${dark?"Dark on":"Dark off"}`}</h3>
      </div>
    </div>
    <div className='sm:hidden fixed top-0 z-10 flex flex-1 h-[600px] max-w-[38px] bg-gradient-to-t from-black to-blue-950'>
    <img src={toggle?close:menu} alt="menu" 
      className='w-[28px] h-[28px] object-contain m-1 cursor-pointer'
      onClick={()=>setToggle(!toggle)}
      />
      <div className={`${!toggle?'hidden':'flex'} p-6 bg-black-gradient absolute top-6 left-0 mx-6 my-3 min-w-[140px] z-10 rounded-xl`}>
      <ul className='list-none flex justify-end z-10 items-start flex-col gap-4'>
     
        <li
        className={`${
          active==='Home'?"text-white":"text-secondary"
        } font-poppins font-medium cursor-pointer text-[16px]`}
        onClick={()=>{setToggle(!toggle);setActive("Home")}}
        >
          <Link to='/'>Home</Link>
        </li>
        <li
        className={`${
          active==='Profile'?"text-white":"text-secondary"
        } font-poppins font-medium cursor-pointer text-[16px]`}
        onClick={()=>{setToggle(!toggle);setActive('Profile')}}
        >
          <Link to='/profile'>Profile</Link>
        </li>
        <li
        className={`${
          active==='Post'?"text-white":"text-secondary"
        } font-poppins font-medium cursor-pointer text-[16px]`}
        onClick={()=>{setToggle(!toggle);setActive('Post')}}
        >
          <p className='' onClick={()=>{setPostForm((pre)=>!pre)}}>Post</p>
        </li>
        <li
        className={`${
          active==='Bookmark'?"text-white":"text-secondary"
        } font-poppins font-medium cursor-pointer text-[16px]`}
        onClick={()=>{setToggle(!toggle);setActive('Bookmark')}}
        >
          <Link to='/bookmark'>Bookmark</Link>
        </li>
        <li
        className={`${
          active==='Log-Out'?"text-white":"text-secondary"
        } font-poppins font-medium cursor-pointer text-[16px]`}
        onClick={()=>{setToggle(!toggle);setActive(Log-Out)}}
        >
          <Link to='/sign-out'>Log-Out</Link>
        </li>
      
    </ul>
    {/* <div className=' flex flex-col mt-4 py-5 '>
        <div className={`${
            active==='Home'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-bold text-[20px] font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Home')}}>
            
            <Link className='ml-4' to='/'>Home</Link>
        </div>
        <div className={`${
            active==='Profile'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Profile')}}>
            
            <Link className='ml-4' to='/profile'>Profile</Link>
        </div>
        <div className={`${
            active==='Post'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Post')}}>
            
            <p className='ml-4' onClick={()=>{setPostForm((pre)=>!pre)}}>Post</p>
        </div>
        <div className={`${
           active==='Bookmark'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Bookmark')}}>
           
            <Link className='ml-4' to='/bookmark'>Bookmark</Link>
        </div>
        <div className={`${
            active==='Log-Out'?`${dark?"text-white":"text-black"}`:`${dark?"text-secondary":"text-[#841808]"}`
          } ${dark?"hover:text-white":"hover:text-black"} text-[18px]  font-medium cursor-pointer flex mb-4 `} onClick={()=>{setActive('Log-Out')}}>
            
            <Link className='ml-4' to='/sign-out'>Log-Out</Link>
        </div>
      </div> */}
      </div>
    </div>
   </div>
    
  )
}

export default Left
