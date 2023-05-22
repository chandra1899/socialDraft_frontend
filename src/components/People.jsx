import React,{useEffect,useContext, useState} from 'react'
import { appState } from '../App'
import logo from '../assets/logo.png'
import {PostFooter,PostProfile} from '.'
 import { useNavigate,useParams } from 'react-router-dom'

const People = () => {
    const {user,editProfile,setEditProfile}=useContext(appState);
    const navigate=useNavigate()
    const {id}=useParams()
    const [userdetails,setUserdetails]=useState({})
    const [posts,setPost]=useState([])
    const getUser=async ()=>{
      let res= await fetch('http://localhost:8000/api/user/userdetails/645502adb17a640821a20c68',{
      method:'GET',
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
        setUserdetails(data.user)
        setPost(data.posts)
        console.log(data.user);
    }
    else{
      window.alert("something wrong in getting your posts")
    }
    }
    useEffect( () => {
        getUser();
        console.log("id=",id,'user.id=',user._id);
        if(id==user._id){
            navigate('/profile')
        }
        
   }, []);
  
  return (
    <div className='h-full min-w-[65%] mr-2 rounded-3xl p-2 bg-black flex flex-col overflow-scroll no-scrollbar '>
      <div className='flex flex-row  pr-7 justify-center items-center my-3'>
          <img src={logo} alt={user.name} className='ml-[5%] sm:h-[140px] sm:w-[140px] h-[100px] w-[100px] rounded-full' />
          <div className='flex flex-col  min-w-[50%] items-center'>
            <div className='flex justify-center items-center mt-[12%]  h-[40px] w-[120px] cursor-pointer hover:bg-slate-700 font-bold tracking-[0.08em] transition duration-150 ease-in-out  border-slate-400 border-2 mb-3 rounded-3xl'>Edit Profile</div>
            <div className='flex flex-wrap justify-center items-center mx-6 '>
              <p className='m-2 mr-3 sm:text-[0.9rem] text-[0.6rem] font-medium '> Followers</p>
              <p className='m-2 sm:text-[0.9rem] text-[0.6rem] font-medium '># Following</p>
            </div>
          </div>
      </div>
      <div className='m-2'>
        <h3 className='font-bold text-[#3ff63f] text-[1.125rem] ml-3'>Description :</h3>
        <p className='ml-6 text-[#b2e4ecf0]'>{userdetails.description}</p>
      </div>
      <p className='text-[1.125rem] font-bold flex justify-center my-2 text-[#06ceedf0]'> Posts</p>
      <div className='h-full min-w-[65%] mr-2 rounded-3xl p-2  '>
    {/* <div className='m-2 rounded-xl  text-white w-[100%] h-[50px] border-b-2 border-slate-600 p-2'>dfdsfv</div> */}
    <div className='flex flex-col overflow-scroll no-scrollbar '>
    {posts.map((post,i)=>(
      <div key={i}  className='flex flex-col rounded-2xl mb-2 p-1 bg-black min-h-[50%]  border-2 border-slate-700 hover:bg-[#112]  hover:border-3 hover:border-slate-600 '>
      <PostProfile user={user}/>
      <div className='ml-2 cursor-pointer' onClick={()=>{navigate(`/post/${post._id}`)}}>
        <p className='font-medium text-[16px] p-2'>{post.content}</p>
      </div>
        <PostFooter post={post} />
    </div>
    ))}
    </div>
   </div>
    </div>
  )
}

export default People
