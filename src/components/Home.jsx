import React,{useEffect,useContext, useState} from 'react'
import {PostFooter,PostProfile} from '.'
// import {posts} from '../constants'
import { appState } from '../App'
import { useNavigate ,useParams} from "react-router-dom";

//loader
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


// const Post=({index})=>(
  
//     <div key={index} className='flex flex-col rounded-2xl mb-2 p-1 bg-black min-h-[50%]  border-2 border-slate-700 hover:border-3 hover:border-slate-300 '>
//     <ProfileBox/>
//     <div>
//       <p className='font-medium text-[18px] p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nulla modi cumque ducimus magni natus beatae autem cum? Nostrum sint incidunt cupiditate dolorum.</p>
//     </div>
//       <PostFooter/>
//   </div>
//   )

const Home = () => {
  const navigate=useNavigate()
  const {posts,setPosts,user,dark,calluser}=useContext(appState);
  const [homeLoader,setHomeLoader]=useState(false);

    const getposts=async ()=>{
      setHomeLoader(true);
      let res=await fetch("http://localhost:8000/api",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      let data=await res.json();
      setPosts(data.posts)
      setHomeLoader(false);
      console.log(data.posts)
    }

  useEffect( () => {
    calluser()
    getposts();
 }, []);

  return (
    
   <div className={`h-full min-w-[97%] ss:min-w-[65%] mr-2 rounded-3xl p-2  ${homeLoader?`${dark?"bg-black":"bg-slate-200"}`:""} overflow-scroll no-scrollbar`}>
    {/* <div className='m-2 rounded-xl  text-white w-[100%] h-[50px] border-b-2 border-slate-600 p-2'>dfdsfv</div> */}
    <div className='flex flex-col overflow-scroll no-scrollbar '>
      
    {!homeLoader && posts.map((post,i)=>(
      <div key={i}  className={`flex flex-col rounded-2xl mb-2 p-1 ${dark?"bg-black hover:bg-[#112]":"bg-white hover:bg-slate-100"} min-h-[50%]   hover:border-3 hover:border-slate-600  transition duration-150 ease-in-out `}>
{/* {console.log(post)} */}
      <PostProfile user={post.user}/>
      <div className='ml-2 cursor-pointer' onClick={()=>{navigate(`/post/${post._id}`)}}>
        <p className='font-medium text-[16px] p-2'>{post.content}</p>
      </div>
      {post.photo && <img src={`http://localhost:8000/photo/${post.photo}`} alt="logo" className='h-[50vh] w-[80%] rounded-xl ml-14 my-2 bg-green-400' />}
        <PostFooter post={post} />
    </div>


    ))}
    {homeLoader && <div className='m-auto mt-[40%]'> <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box></div>}
    </div>
   </div>
  )
}

export default Home
