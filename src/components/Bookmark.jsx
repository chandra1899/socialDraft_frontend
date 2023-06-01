import React,{useEffect,useContext, useState} from 'react'
import { appState } from '../App'
import logo from '../assets/logo.png'
import {PostFooter,PostProfile} from '.'
 import { useNavigate } from 'react-router-dom'
 //loader
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Bookmark = () => {
  const navigate=useNavigate()
  const {user,setOpenLogin,dark}=useContext(appState);
  const [savedposts,setSavedposts]=useState([])
  const [bookmarkLoader,setBookmarkLoader]=useState(false);
  const getsavedposts=async ()=>{
    setBookmarkLoader(true);
    let res=await fetch("http://localhost:8000/api/post/savedposts",{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
    credentials:'include'
    })
    let data=await res.json();
    setBookmarkLoader(false);
    if(res.status===200){
      setSavedposts(data.savedposts)
      // console.log(data.savedposts);
    }
    else{
      window.alert("something wrong in fetching saved posts");
    }
  }
  useEffect( () => {
    if(user){
      getsavedposts();
      }else{
        navigate('/')
        setOpenLogin(true)
      }
 }, []);

  return (
   <>
   {user &&  <div className={`h-full min-w-[97%] ss:min-w-[65%] mr-2 rounded-3xl p-2 ${dark?"bg-black":"bg-gray-200"} flex flex-col overflow-scroll no-scrollbar `}>
      <div className='h-full min-w-[65%] mr-2 rounded-3xl p-2  '>
    {/* <div className='m-2 rounded-xl  text-white w-[100%] h-[50px] border-b-2 border-slate-600 p-2'>dfdsfv</div> */}
    {!bookmarkLoader &&  <div className='flex flex-col overflow-scroll no-scrollbar '>
      {savedposts.length===0 && <><p className='flex justify-center items-center text-[1.125rem] font-medium text-red-600'>No Saved Posts</p></>}
    {savedposts.map((post,i)=>(
      <div key={i}  className={`flex flex-col rounded-2xl mb-2 p-1 ${dark?"bg-black":"bg-white"} min-h-[50%]  ${dark?"hover:bg-[#112]":"hover:bg-slate-100"} `}>
      <PostProfile user={post.bookmark
.user}/>
      <div className='ml-2 cursor-pointer' onClick={()=>{navigate(`/post/${post.bookmark
._id}`)}}>
        <p className='font-medium text-[16px] p-2'>{post.bookmark.content}</p>
      </div>
      {post.bookmark.photo && <img src={`http://localhost:8000/photo/${post.bookmark.photo}`} alt="logo" className='h-[50vh] w-[80%] rounded-xl ml-14 my-2 bg-green-400' />}
        <PostFooter post={post.bookmark} />
    </div>
    ))}
    </div>}
    {bookmarkLoader && <div className='m-auto ml-[40%] mt-[40%]'> <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box></div>}
   </div>
      
    </div>}
   </>
  )
}

export default Bookmark
