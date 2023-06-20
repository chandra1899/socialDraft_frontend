import React,{useEffect,useContext, useState} from 'react'
import { appState } from '../App'
import logo from '../assets/logo.png'
import BACK from '../assets/BACK.png'
import {PostFooter,PostProfile} from '.'
 import { useNavigate } from 'react-router-dom'
 //loader
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Bookmark = () => {
  const navigate=useNavigate()
  const {user,setOpenLogin,dark,toast,imgsrc,setimgsrc,imgPreview,setImgPreview}=useContext(appState);
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
  const handleimgClick=(src)=>{
    setimgsrc(src)
    setImgPreview(true)
  }
  useEffect( () => {
    if(user){
      getsavedposts();
      }else{
        navigate('/')
        setOpenLogin(true)
       
          toast.warn('please log-in', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        
      }
 }, []);

  return (
   <>
   {user &&  <div className={`h-full min-w-[97%] ss:min-w-[65%] mr-2 rounded-3xl p-2 ${dark?"bg-black":"bg-gray-200"} flex flex-col overflow-scroll no-scrollbar `}>
   <img src={BACK} alt="back" className={`h-[30px] w-[30px] absolute top-5 sm:-left-9 left-1 cursor-pointer`} onClick={()=>{navigate(-1)}} />
      <div className='h-full min-w-[65%] mr-2 rounded-3xl p-2  '>
    {/* <div className='m-2 rounded-xl  text-white w-[100%] h-[50px] border-b-2 border-slate-600 p-2'>dfdsfv</div> */}
    {!bookmarkLoader &&  <div className='flex flex-col overflow-scroll no-scrollbar '>
      {savedposts.length===0 && <><p className='flex justify-center items-center text-[1.125rem] font-medium mt-[33%] text-red-600'>.......No Saved Posts........</p></>}
    {savedposts.map((post,i)=>(
      <>
      {post.bookmark.type!=='Retweet'?<div key={i}  className={`flex flex-col rounded-2xl mb-2 p-1 ${dark?"bg-black hover:bg-[#112]":"bg-white hover:bg-slate-100"} min-h-[50%]   hover:border-3 hover:border-slate-600  transition duration-150 ease-in-out `}>
{/* {console.log(post)} */}
      <PostProfile user={post.bookmark.user}/>
      <div className='ml-2 cursor-pointer whitespace-pre-wrap break-words' onClick={()=>{navigate(`/post/${post.bookmark._id}`)}}>
        <p className='font-medium text-[16px] p-2 '>{post.bookmark.content}</p>
      </div>
      {post.bookmark.photo && <img src={`http://localhost:8000/photo/${post.bookmark.photo}`} alt="logo" className={`h-[25vh] w-[40%] rounded-xl ml-[30%] my-[2%] object-contain hover:border-2  cursor-pointer ${dark?'hover:border-slate-800':"hover:border-slate-300"}`} onClick={()=>handleimgClick(`http://localhost:8000/photo/${post.bookmark.photo}`)} />}
        <PostFooter post={post.bookmark} />
    </div>:

    <div className={`flex flex-col rounded-2xl mb-2 p-1 ${dark?"bg-black ":"bg-white "} min-h-[50%]   hover:border-3 hover:border-slate-600  transition duration-150 ease-in-out `}>
      <PostProfile user={post.bookmark.user}/>
      <div className={`flex flex-col ml-6 rounded-2xl mb-2 p-1 ${dark?"bg-black hover:bg-[#112]":"bg-white hover:bg-slate-100"} min-h-[50%]   hover:border-3 hover:border-slate-600  border-t-2 border-l-2 ${dark?'border-slate-700':'border-slate-300'} transition duration-150 ease-in-out  cursor-pointer`} onClick={()=>{navigate(`/post/${post.bookmark.retweetedRef._id}`)}} >
      {/* {console.log(post)} */}
      <PostProfile user={post.bookmark.retweetedRef.user}/>
      <div className='ml-2 break-words'>
        <p className='font-medium text-[16px] p-2 '>{post.bookmark.retweetedRef.content}</p>
      </div>
      {post.bookmark.retweetedRef.photo && <img src={`http://localhost:8000/photo/${post.bookmark.retweetedRef.photo}`} alt="logo" className={`h-[25vh] w-[40%] rounded-xl ml-[30%] my-[2%] object-contain `} />}
    </div>
    <PostFooter post={post.bookmark} />
    </div>
    }
     </>
//       <div key={i}  className={`flex flex-col rounded-2xl mb-2 p-1 ${dark?"bg-black":"bg-white"} min-h-[50%]  ${dark?"hover:bg-[#112]":"hover:bg-slate-100"} `}>
//       <PostProfile user={post.bookmark
// .user}/>
//       <div className='ml-2 cursor-pointer break-words' onClick={()=>{navigate(`/post/${post.bookmark
// ._id}`)}}>
//         <p className='font-medium text-[16px] p-2'>{post.bookmark.content}</p>
//       </div>
//       {post.bookmark.photo && <img src={`http://localhost:8000/photo/${post.bookmark.photo}`} alt="logo" className={`h-[25vh] w-[40%] rounded-xl ml-[30%] my-[2%] object-contain hover:border-2  cursor-pointer ${dark?'hover:border-slate-800':"hover:border-slate-300"}`} onClick={()=>handleimgClick(`http://localhost:8000/photo/${post.bookmark.photo}`)} />}
//         <PostFooter post={post.bookmark} />
//     </div>
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
