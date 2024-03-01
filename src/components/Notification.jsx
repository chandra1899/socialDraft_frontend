import React, { useEffect, useState } from 'react'
import config from '../source'
import { useNavigate } from 'react-router'
import { appState } from '../App'
import { useContext } from 'react'

const SubNotification = ({notification}) => {
  const {dark,setCommentId,setMessageId}=useContext(appState);
  const navigate=useNavigate()
  return (
    <>
    
    {notification.typeOf==='LikedPost' && <div className='bg-slate-900 p-2 rounded-lg my-1 cursor-pointer hover:bg-slate-950' onClick={()=>{navigate(`/post/${notification.LikedPost._id}`)}}>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-red-600'>Liked Your Post</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.LikedPost?.content?.length>=13?`${notification?.LikedPost?.content?.substring(0, 13)} ...`:`${notification?.LikedPost?.content}`}</p>
      </div> }

    {notification.typeOf==='LikedRetweet' && <div className='bg-slate-900 p-2 rounded-lg my-1 cursor-pointer hover:bg-slate-950' onClick={()=>{navigate(`/post/${notification.LikedRetweet._id}`)}}>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-red-600'>Liked Your Retweet</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification.LikedRetweet?.retweetedRef?.content?.length>=13?`${notification.LikedRetweet?.retweetedRef?.content?.substring(0, 13)} ...`:`${notification.LikedRetweet?.retweetedRef?.content}`}</p>
      </div> }

    {notification.typeOf==='LikedComment' && <div className='bg-slate-900 p-2 rounded-lg my-1 cursor-pointer hover:bg-slate-950' onClick={()=>{
      navigate(`/post/${notification?.LikedComment?.postId}`);
      setCommentId(notification?.LikedComment?.commentId?._id)
    }}>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-red-600'>Liked Your Comment</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.LikedComment?.commentId?.content?.length>=13?`${notification?.LikedComment?.commentId?.content.substring(0, 13)} ...`:`${notification?.LikedComment?.commentId?.content}`}</p>
      </div> }

    {notification.typeOf==='Commented' && <div className='bg-slate-900 p-2 rounded-lg my-1 cursor-pointer hover:bg-slate-950' onClick={()=>{
      navigate(`/post/${notification?.Commented?.postId}`);
      setCommentId(notification?.Commented?.commentId?._id)
    }} >
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#f4c838]'>Commented Your Post</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.Commented?.commentId?.content?.length>=13?`${notification?.Commented?.commentId?.content.substring(0, 13)} ...`:`${notification?.Commented?.commentId?.content}`}</p>
      </div> }

    {notification.typeOf==='Retweeted' && <div className='bg-slate-900 p-2 rounded-lg my-1 cursor-pointer hover:bg-slate-950' onClick={()=>{navigate(`/post/${notification.Retweeted._id}`)}}  >
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#3a3afb]'>Retweeted</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.Retweeted?.retweetedRef?.content?.length>=13?`${notification?.Retweeted?.retweetedRef?.content?.substring(0, 13)} ...`:`${notification?.Retweeted?.retweetedRef?.content}`}</p>
      </div> }

      {notification.typeOf==='Posted' && <div className='bg-slate-900 p-2 rounded-lg my-1 cursor-pointer hover:bg-slate-950' onClick={()=>{navigate(`/post/${notification.Posted._id}`)}} >
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#3a3afb]'>Posted</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.Posted.content?.length>=13?`${notification?.Posted?.content?.substring(0, 13)} ...`:`${notification?.Posted?.content}`}</p>
      </div> }

    {notification.typeOf==='Messaged' && <div className='bg-slate-900 p-2 rounded-lg my-1 cursor-pointer hover:bg-slate-950' onClick={()=>{
      navigate(`/chat/${notification?.Messaged?.userId}`);
      setMessageId(notification?.Messaged?.messageId?._id)
    }} >
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#3ff339]'>Messaged</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.Messaged?.messageId?.message?.text?.length>=13?`${notification?.Messaged?.messageId?.message?.text?.substring(0, 13)} ...`:`${notification?.Messaged?.messageId?.message?.text}`}</p>
      </div> }
    </>
  )
}

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
  const getNotifications = async ()=>{
    let res=await fetch(`${config.baseUrl}/api/notification/getnotifications`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
    credentials:'include', 

    })
    let data=await res.json();
    if(res.status===200){
      console.log(data.notifications);
      setNotifications(data.notifications)
    }
  }

  useEffect(()=>{
    getNotifications()
  },[])

  return (
    <div className='absolute right-[18rem] top-16 rounded-xl w-[23vw] h-[100vh] bg-slate-800 z-[1] p-2 flex flex-col overflow-scroll no-scrollbar'>
      {notifications.map((notification,i)=>(
        <SubNotification key={i} notification={notification}/>
        ))}
    </div>
  )
}

export default Notification
