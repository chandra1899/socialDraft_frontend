import React, { useEffect, useState } from 'react'
import save from '../assets/save.png'
import saved from '../assets/saved.png'
import like from '../assets/like.png'
import liked from '../assets/liked.png'

const PostFooter =  ({post}) => {
  const [likes,setLikes]=useState(post.likes.length)
  const [likelogo,setLikelogo]=useState(post.likes.length)
  const [savelogo,setSavelogo]=useState(post.likes.length)
  const [issave,setIssaved]=useState("")
  const [islike,setIslike]=useState("")
  const like=async ()=>{
    // console.log(post._id);
    let res=await fetch(`http://localhost:8000/api/like?id=${post._id}&type=Post`,{
      method:'POST',
      // mode: 'no-cors',
      headers:{
        'Access-Control-Allow-Origin': '*',
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:'include', 
    });
    let data=await res.json()
    if(res.status===200){
      if(data.deleted){
        setLikes(likes-1);
        setIslike("Like")
      }else{
        setLikes(likes+1);
        setIslike("Liked")

      }
      // window.alert("successfully liked")
      // console.log("like=",res.status,data);
    }else{
      window.alert("unable to make like")
    }
  }
  const savepost=async ()=>{
    let res=await fetch(`http://localhost:8000/api/is/saved?id=${post._id}`,{
      method:'get',
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
      if(data.bookmarkexist)
      setIssaved("Saved")
      else
      setIssaved("Save")
    }
    else{
      // window.alert("some thing is wrong")
    }
  }
  const likepost=async ()=>{
    let res=await fetch(`http://localhost:8000/api/is/liked?id=${post._id}&type=Post`,{
      method:'get',
      // mode: 'no-cors',
      headers:{
        'Access-Control-Allow-Origin': '*',
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:'include', 
    });
    let data=await res.json();
    // console.log("liked",data.likeexit);
    if(res.status===200){
      if(data.likeexist)
      setIslike("Liked")
      else
      setIslike("Like")
    }
    else{
      // window.alert("some thing is wrong")
    }
    setLikes(data.likes)
  }
  const bookmark=async ()=>{
    let res=await fetch(`http://localhost:8000/api/bookmark?id=${post._id}`,{
      method:'post',
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
      if(data.deleted){
        setIssaved("Save")
      }
      else{
        setIssaved("Saved")
      }
    }
    else{
      window.alert("some thing is wrong in bookmark")
    }
  }
  useEffect( () => {
    likepost()
    savepost()
   
 }, []);
  return (
    <div className='flex flex-row justify-around items-center p-3'>
        <p onClick={like} className='text-[#f93838] text-[0.9rem] font-bold cursor-pointer'>{likes} {islike}</p>
        <p className='text-[#f4c838] text-[0.9rem] font-bold'>{post.comments.length} Comments</p>
        <p className='text-[#3a3afb] text-[0.9rem] font-bold'>Retweets</p>
        <p onClick={bookmark} className='text-[#3ff339] text-[0.9rem] font-bold cursor-pointer'>{issave}</p>      
    </div>
  )
}

export default PostFooter
