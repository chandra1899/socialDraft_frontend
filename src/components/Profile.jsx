
import React,{useEffect,useContext, useState} from 'react'
import { appState } from '../App'
import logo from '../assets/logo.png'
import {PostFooter,PostProfile} from '.'
 import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const {user,editProfile,setEditProfile,openLogin,setOpenLogin,calluser,dark}=useContext(appState);
  const navigate=useNavigate()
  const [yourposts,setYourposts]=useState([])
  const getposts=async ()=>{
    let res= await fetch('http://localhost:8000/api/post/yourposts',{
    method:'GET',
    // mode: 'no-cors',
    headers:{
      'Access-Control-Allow-Origin': '*',
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    credentials:'include', 
  });
  let data=await res.json();
  if(res.status===200){
    setYourposts(data.yourposts)
  }
  else{
    window.alert("something wrong in getting your posts")
  }
  }
  useEffect( () => {
    // calluser()
    if(user){
      getposts();
    calluser()
    }else{
      navigate('/')
      setOpenLogin(true)
    }
 }, []);

  return (
    <>
    {user && <div className={`h-full min-w-[97%] ss:min-w-[65%] mr-2 rounded-3xl p-2 ${dark?"bg-black":"bg-slate-200"} flex flex-col overflow-scroll no-scrollbar`}>
      <div className='flex flex-row  pr-7 justify-center items-center my-3'>
          <img src={`${user.avatar?`http://localhost:8000/photo/${user.avatar}`:logo}`}  alt={user.name} className='ml-[5%] sm:h-[140px] sm:w-[140px] h-[100px] w-[100px] rounded-full' />
          <div className='flex flex-col  min-w-[50%] items-center'>
            <div className={`flex justify-center items-center mt-[12%]  h-[40px] w-[120px] cursor-pointer ${dark?"hover:bg-slate-700":"hover:bg-slate-100"} font-bold tracking-[0.08em] transition duration-150 ease-in-out  border-slate-400 border-2 mb-3 rounded-3xl` }onClick={()=>setEditProfile(true)}>Edit Profile</div>
            <div className='flex flex-wrap justify-center items-center mx-6 '>
              <p className='m-2 mr-3 sm:text-[0.9rem] text-[0.6rem] font-medium '>{user.followers?user.followers.length:'0'} Followers</p>
              <p className='m-2 sm:text-[0.9rem] text-[0.6rem] font-medium '>{user.following?user.following.length:'0'} Following</p>
            </div>
          </div>
      </div>
      <div className='m-2'>
        <h3 className={`font-bold ${dark?"text-[#3ff63f]":"text-black"} text-[1.125rem] ml-3`}>Name :</h3>
        <p className={`ml-6 ${dark?"text-[#b2e4ecf0]":"text-slate-700"}`}>{user.name}</p>
      </div>
      <div className='m-2'>
        <h3 className={`font-bold ${dark?"text-[#3ff63f]":"text-black"} text-[1.125rem] ml-3`}>Email :</h3>
        <p className={`ml-6 ${dark?"text-[#b2e4ecf0]":"text-slate-700"}`}>{user.email}</p>
      </div>
      <div className='m-2'>
        <h3 className={`font-bold ${dark?"text-[#3ff63f]":"text-black"} text-[1.125rem] ml-3`}>Description :</h3>
        <p className={`ml-6 ${dark?"text-[#b2e4ecf0]":"text-slate-700"}`}>{user.description}</p>
      </div>
      <p className={`text-[1.125rem] font-bold flex justify-center my-2 ${dark?"text-[#06ceedf0]":"text-black"}`}>Your Posts</p>
      {yourposts.length===0 && <><p className='flex justify-center items-center text-[1.125rem] font-medium text-red-600 mt-10'>....... No Posts .........</p></>}
      <div className='h-full min-w-[65%] mr-2 rounded-3xl p-2  '>
    {/* <div className='m-2 rounded-xl  text-white w-[100%] h-[50px] border-b-2 border-slate-600 p-2'>dfdsfv</div> */}
    <div className='flex flex-col overflow-scroll no-scrollbar '>
    {yourposts.map((post,i)=>(
      <div key={i}  className={`flex flex-col rounded-2xl mb-2 p-1 ${dark?"bg-black hover:bg-[#112]":"bg-white hover:bg-slate-100"} min-h-[50%]    transition duration-150 ease-in-out  hover:border-3 hover:border-slate-600 `}>
      <PostProfile user={user}/>
      <div className='ml-2 cursor-pointer' onClick={()=>{navigate(`/post/${post._id}`)}}>
        <p className='font-medium text-[16px] p-2'>{post.content}</p>
      </div>
      {post.photo && <img src={`http://localhost:8000/photo/${post.photo}`} alt="logo" className='h-[40vh] w-[60%] rounded-xl ml-20 my-0 bg-green-400' />}
        <PostFooter post={post} />
    </div>
    ))}
    </div>
   </div>
    </div>}
    </>
  )
}

export default Profile
