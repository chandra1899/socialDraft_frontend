import React,{useState} from 'react'

const Tweet = () => {
    const [content,setContent]=useState("")
    const handlehange=(e)=>{
        setContent(e.target.value)
    }
    const submit=async ()=>{
        let res=await fetch('http://localhost:8000/api/post/create',{
            method:"POST",
            headers:{
                'Access-Control-Allow-Origin': '*',
                Accept:"application/json",
                "Content-Type":"application/json"
              },
              credentials:'include',
              body:JSON.stringify({
                content
              })
        })
        let data=await res.json();
        console.log(data.msg);

    }
  return (
    <div className='absolute z-30 top-6 p-4 overflow-hidden left-[30%] h-[250px] flex flex-col w-[500px] bg-black-gradient rounded-xl'>
      
        <textarea className='bg-black outline-none p-3 rounded-xl text-[0.9rem]' value={content} cols="50" rows="3" onChange={(e)=>handlehange(e)}></textarea>
        <button className='bg-green-600 h-[38px] font-medium rounded-2xl mt-3 hover:bg-green-700 w-[70px]' onClick={submit}>Tweet</button>
     
    </div>
  )
}

export default Tweet
