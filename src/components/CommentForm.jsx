import React,{useState,useContext} from 'react'
import {appState} from '../App'
// import { useNavigate ,useParams} from "react-router-dom";

const CommentForm = () => {
    const {openComment,setOpenComment,commentpostId,setCommentpostId}=useContext(appState);


    const [comment,setComment]=useState("")
      const handleChange=(e)=>{
        setComment(e.target.value)
      }
     const submit=async ()=>{
        let res=await fetch("http://localhost:8000/api/comment/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
          credentials:'include', 
            body:JSON.stringify({
                post:commentpostId,
                content:comment
            })
          })
          const data=await res.json();
          if(res.status===200){
            setOpenComment(false)
              // window.alert("sucessfully created comment")
              
          }
          else{
              window.alert("unable to create comment")
          }
     }
  return (
    <div className={`${openComment?"":"hidden"} absolute z-40 top-10 left-[10%] sm:left-[30%] h-[350px] p-4 w-[500px] bg-black-gradient rounded-2xl border-2 border-slate-600`}>
    <form action=""  className=' flex flex-col gap-6'>
    <label className='flex flex-col'>
          <span className='text-[#42f8ec] font-medium text-[1.125rem] mb-4'>Your Comment</span>
          <textarea name="content" className='p-2 bg-black resize-none rounded-2xl' value={comment} onChange={(e)=>handleChange(e)} cols="30" rows="7"></textarea>
        </label>
    </form>
    <div className='m-6 right-3 font-medium'>
    <button className='h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 bg-transparent plane' onClick={()=>{setOpenComment(false)}} >Cancel</button>
      <button className='h-[42px] rounded-xl w-[80px] m-2 p-1 bg-green-600 hover:bg-green-700' onClick={submit}>Comment</button>
    </div>
  </div>
  )
}

export default CommentForm
