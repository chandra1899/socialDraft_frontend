import React, { useEffect, useState,useContext } from 'react'
import { useNavigate ,useParams} from "react-router-dom";
import {PostFooter,PostProfile} from '.'
import {Comment} from '../components'
import {appState} from '../App'


const Post = () => {
    const {openComment,setOpenComment,commentpostId,setCommentpostId,user,setOpenLogin}=useContext(appState);

    const {id}=useParams()

    const [post,setPost]=useState()
    const getpost=async ()=>{
        let res=await fetch(`http://localhost:8000/api/post/getpost/${id}`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
          credentials:'include', 

          })
          if(res.status===200){
            let data=await res.json();
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
    <div className='h-full flex flex-col min-w-[65%] bg-black p-2  rounded-xl overflow-scroll no-scrollbar'>
      {post &&<div className=' h-full flex flex-col overflow-scroll no-scrollbar'>
        <div >
        <PostProfile user={post.user}/>
        <div className='ml-2'>
        <p className='font-medium text-[16px] p-2'>{post.content}</p>
      </div>
        <PostFooter post={post} />
        </div>
        <button onClick={()=>{if(user){setOpenComment(true);setCommentpostId(id)}else{setOpenLogin(true)}}} className='min-h-[40px]  bg-green-600 hover:bg-green-700 m-2 font-medium rounded-xl mb-5'>Add Comment</button>
        {/* {console.log("post=",post)} */}
        {post.comments.map((comment,i)=>(
        <Comment key={i} comment={comment}/>
        ))}
      </div>}
    </div>
  )
}

export default Post
