import React,{useState,useContext} from 'react'
import {appState} from '../App'
// import { useNavigate ,useParams} from "react-router-dom";

const CreatePostForm = () => {
    const {postForm,setPostForm,dark}=useContext(appState);


    const [post,setpost]=useState("")
      const handleChange=(e)=>{
        setpost(e.target.value)
      }
     const submit=async ()=>{
        let res=await fetch("http://localhost:8000/api/post/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
          credentials:'include', 
            body:JSON.stringify({
                content:post
            })
          })
          const data=await res.json();
          if(res.status===200){
            setPostForm(false)
            setpost("")
              window.alert("sucessfully created post")
              
          }
          else{
              window.alert("unable to create post")
          }
     }
  return (
    <div className={`${postForm?"":"hidden"} absolute z-40 top-10 left-[10%] sm:left-[30%] h-[350px] p-4 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"} rounded-2xl border-2`}>
    <form action=""  className=' flex flex-col gap-6'>
    <label className='flex flex-col'>
          <span className={`${dark?"text-[#42f8ec]":"text-[#0f3330]"} font-medium text-[1.125rem] mb-4`}>Create Post</span>
          <textarea name="content" className={`p-2 ${dark?"bg-black":"bg-slate-100"} resize-none rounded-2xl`} value={post} onChange={(e)=>handleChange(e)} cols="30" rows="7"></textarea>
        </label>
    </form>
    <div className='m-6 right-3 font-medium'>
    <button className={`h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 ${dark?"hover:bg-slate-700":"hover:bg-slate-100"}`} onClick={()=>{setPostForm(false)}} >Cancel</button>
      <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1 ${dark?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700 text-white"}`} onClick={submit}>Post</button>
    </div>
  </div>
  )
}

export default CreatePostForm
