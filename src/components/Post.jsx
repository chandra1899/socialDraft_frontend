import React, { useEffect, useState,useContext } from 'react'
import { useNavigate ,useParams} from "react-router-dom";
import {PostFooter,PostProfile} from '.'
import {Comment} from '../components'
import {appState} from '../App'
//loader
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DeleteD from '../assets/delete_dark.png'
import DeleteW from '../assets/delete_white.png'


const Post = () => {
  const navigate=useNavigate()
    const {openComment,setOpenComment,commentpostId,setCommentpostId,user,setOpenLogin,dark,toast}=useContext(appState);

    const {id}=useParams()

    const [post,setPost]=useState()
    const [postLoader,setPostLoader]=useState(false)
    const handleDeletePost=async ()=>{
      let res= await fetch(`http://localhost:8000/api/post/delete/${id}`,{
          method:'GET',
          // mode: 'no-cors',
          headers:{
            'Access-Control-Allow-Origin': '*',
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:'include', 
        });
        if(res.status===200){
          navigate('/')
        
            toast.success('Successfully deleted post', {
              position: "bottom-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          
          // window.alert('sucessfully deleted post')
        }
        else{
          
            toast.error('error in deleting post', {
              position: "bottom-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          
          // window.alert('error in deleting post')

        }
    }
    const getpost=async ()=>{
      setPostLoader(true)
        let res=await fetch(`http://localhost:8000/api/post/getpost/${id}`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
          credentials:'include', 

          })
          let data=await res.json();
          setPostLoader(false)
          if(res.status===200){
            setPost(data.post)
            console.log(data.post);
          }else{
            window.alert("something wrong in geting post details")
          }
    }
    useEffect( () => {
        getpost();
        
     }, []);

  return (
    <div className={`h-full flex flex-col min-w-[97%] ss:min-w-[65%] ${dark?"bg-black":"bg-slate-200"} p-2  rounded-xl overflow-scroll no-scrollbar`}>
      {post && !postLoader &&<div className=' h-full flex flex-col overflow-scroll no-scrollbar'>
        <div className='relative' >
        <PostProfile user={post.user}/>
        <div className='ml-2 '>
        <p className='font-medium text-[16px] p-2'>{post.content}</p>
      </div>
      {post.photo && <img src={`http://localhost:8000/photo/${post.photo}`} alt="logo" className='h-[50vh] w-[80%] rounded-xl ml-14 my-2 object-contain' />}
        <PostFooter post={post} />
       {(user && post.user._id===user._id) && <img 
        className={`absolute right-5 top-5 cursor-pointer h-[45px] w-[40px]`}
        src={`${dark?DeleteD:DeleteW}`} 
        alt="Delete_Post"
        onClick={handleDeletePost}
         />}

        </div>
        <button onClick={()=>{if(user){setOpenComment(true);setCommentpostId(id)}else{setOpenLogin(true)}}} className={`min-h-[40px]  ${dark?"bg-green-600 hover:bg-green-700":"text-white bg-blue-600 hover:bg-blue-700"} m-2 font-medium rounded-xl mb-5`}>Add Comment</button>
        {/* {console.log("post=",post)} */}
        {post.comments.map((comment,i)=>(
        <Comment key={i} comment={comment}/>
        ))}
      </div>}
      {postLoader && <div className='m-auto mt-[40%]'> <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box></div>}
    </div>
  )
}

export default Post
