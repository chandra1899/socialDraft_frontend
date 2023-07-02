import React, { useEffect, useState,useContext } from 'react'
import { useNavigate ,useParams} from "react-router-dom";
import {PostFooter,PostProfile} from '.'
import {Comment} from '../components'
import {appState} from '../App'
import BACK from '../assets/BACK.png'
//loader
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DeleteD from '../assets/delete_dark.png'
import DeleteW from '../assets/delete_white.png'
import config from '../source'

const Post = () => {
  const navigate=useNavigate()
    const {openComment,setOpenComment,commentpostId,setCommentpostId,user,setOpenLogin,dark,toast,confirmForm,setConfirmForm,confirm,setConfirm,postId,setPostId,imgsrc,setimgsrc,imgPreview,setImgPreview,commentEvent,setCommentEvent,comments,setComments}=useContext(appState);

    const {id}=useParams()

    const [post,setPost]=useState()
    const [postLoader,setPostLoader]=useState(false)
    const handleDeletePost=async (id)=>{
      setConfirmForm(true);
      setPostId(id)
    }
    const getpost=async ()=>{
      setPostLoader(true)
        let res=await fetch(`${config.baseUrl}/api/post/getpost/${id}`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
          credentials:'include', 

          })
          let data=await res.json();
          setPostLoader(false)
          if(res.status===200 && data.post!==null){
            setPost(data.post)
            setComments(data.post.comments)
          }else if(data.post===null){
          }
          else{
           
          }
    }
    const AddComment=(e)=>{
      setCommentEvent(e.target)
      {if(user){
        setOpenComment(true);
        setCommentpostId(id);
      }
      else{
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
    }
    }
    const handleimgClick=(src)=>{
      setimgsrc(src)
      setImgPreview(true)
    }
    useEffect( () => {
        getpost();
        
     }, [id]);

  return (
    <div className={`h-full flex flex-col min-w-[97%] ss:min-w-[65%] ${dark?"bg-black":"bg-slate-200"} p-2  rounded-xl overflow-scroll no-scrollbar`}>
       <img src={BACK} alt="back" className={`h-[30px] w-[30px] absolute top-5 sm:-left-9 left-1 cursor-pointer`} onClick={()=>{navigate(-1)}} />
       {post===undefined && !postLoader && <p className='flex justify-center items-center text-[1.125rem] font-medium text-red-600 mt-[33%]'>....... No such Post found .........</p>}
      {post && !postLoader &&<div className=' h-full flex flex-col overflow-scroll no-scrollbar'>
       <>
       {post.type!=='Retweet'? <div className='relative' >
        <PostProfile user={post.user}/>
        <div className='ml-2 '>
        <p className='font-medium text-[16px] p-2 whitespace-pre-wrap break-words'>{post.content}</p>
      </div>
      {post.isPhoto && <img src={`${config.baseUrl}/api/post/postPhoto/${post._id}`} alt="logo" className={`h-[50vh] w-[80%] rounded-xl ml-14 my-2 object-contain hover:border-2  cursor-pointer ${dark?'hover:border-slate-800':"hover:border-slate-300"} `} onClick={()=>handleimgClick(`${config.baseUrl}/api/post/postPhoto/${post._id}`)} />}
        <PostFooter post={post} />
       {(user && post.user._id===user._id) && <img 
        className={`absolute right-5 top-5 cursor-pointer h-[40px] w-[35px]`}
        src={`${dark?DeleteD:DeleteW}`} 
        alt="Delete_Post"
        onClick={()=>handleDeletePost(post._id)}
         />}

        </div>:
         <div className={`flex flex-col rounded-2xl mb-2 p-1 ${dark?"bg-black ":"bg-white "} hover:border-3 hover:border-slate-600  transition duration-150 ease-in-out `}>
         <PostProfile user={post.user}/>
         <div className={`flex flex-col ml-6 rounded-2xl mb-2 p-1 ${dark?"bg-black hover:bg-[#112]":"bg-white hover:bg-slate-100"} min-h-[50%]   hover:border-3 hover:border-slate-600 border-t-2 border-l-2 ${dark?'border-slate-700':'border-slate-300'} transition duration-150 ease-in-out  cursor-pointer`} onClick={()=>{navigate(`/post/${post.retweetedRef._id}`)}} >
         <PostProfile user={post.retweetedRef.user}/>
         <div className='ml-2 whitespace-pre-wrap break-words'>
           <p className='font-medium text-[16px] p-2 '>{post.retweetedRef.content}</p>
         </div>
         {post.retweetedRef.isPhoto && <img src={`${config.baseUrl}/api/post/postPhoto/${post.retweetedRef._id}`} alt="logo" className={`h-[25vh] w-[40%] rounded-xl ml-[30%] my-[2%] object-contain `} />}
       </div>
       <PostFooter post={post} />
       </div>
        
      }
       </>
        <button onClick={AddComment} className={`min-h-[40px]  ${dark?"bg-green-600 hover:bg-green-700":"text-white bg-blue-600 hover:bg-blue-700"} m-2 font-medium rounded-xl mb-5`}>Add Comment</button>
       <div className='commentDiv'>
       {comments.map((comment,i)=>(
        <Comment key={i} comment={comment}/>
        ))}
       </div>
      </div>}
      {postLoader && <div className='m-auto mt-[40%]'> <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box></div>}
    </div>
  )
}

export default Post
