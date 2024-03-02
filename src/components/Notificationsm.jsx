import React, { useEffect, useState } from 'react'
import config from '../source'
import { useNavigate } from 'react-router'
import { appState } from '../App'
import { useContext } from 'react'
//loader
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const SubNotification = ({notification}) => {
  const {dark,setCommentId,setMessageId}=useContext(appState);
  const navigate=useNavigate()
  return (
    <>
    
    {notification.typeOf==='LikedPost' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer `} onClick={()=>{navigate(`/post/${notification.LikedPost._id}`)}}>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-red-600'>Liked Your Post</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.LikedPost?.content?.length>=13?`${notification?.LikedPost?.content?.substring(0, 13)} ...`:`${notification?.LikedPost?.content}`}</p>
      </div> }

    {notification.typeOf==='LikedRetweet' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer `} onClick={()=>{navigate(`/post/${notification.LikedRetweet._id}`)}}>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-red-600'>Liked Your Retweet</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification.LikedRetweet?.retweetedRef?.content?.length>=13?`${notification.LikedRetweet?.retweetedRef?.content?.substring(0, 13)} ...`:`${notification.LikedRetweet?.retweetedRef?.content}`}</p>
      </div> }

    {notification.typeOf==='LikedComment' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer `} onClick={()=>{
      navigate(`/post/${notification?.LikedComment?.postId}`);
      setCommentId(notification?.LikedComment?.commentId?._id)
    }}>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-red-600'>Liked Your Comment</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.LikedComment?.commentId?.content?.length>=13?`${notification?.LikedComment?.commentId?.content.substring(0, 13)} ...`:`${notification?.LikedComment?.commentId?.content}`}</p>
      </div> }

    {notification.typeOf==='Commented' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer `} onClick={()=>{
      navigate(`/post/${notification?.Commented?.postId}`);
      setCommentId(notification?.Commented?.commentId?._id)
    }} >
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#f4c838]'>Commented Your Post</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.Commented?.commentId?.content?.length>=13?`${notification?.Commented?.commentId?.content.substring(0, 13)} ...`:`${notification?.Commented?.commentId?.content}`}</p>
      </div> }

    {notification.typeOf==='Retweeted' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer `} onClick={()=>{navigate(`/post/${notification.Retweeted._id}`)}}  >
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#3a3afb]'>Retweeted</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.Retweeted?.retweetedRef?.content?.length>=13?`${notification?.Retweeted?.retweetedRef?.content?.substring(0, 13)} ...`:`${notification?.Retweeted?.retweetedRef?.content}`}</p>
      </div> }

      {notification.typeOf==='Posted' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer `} onClick={()=>{navigate(`/post/${notification.Posted._id}`)}} >
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#3a3afb]'>Posted</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.Posted.content?.length>=13?`${notification?.Posted?.content?.substring(0, 13)} ...`:`${notification?.Posted?.content}`}</p>
      </div> }

    {notification.typeOf==='Messaged' && <div className={`${dark?`bg-slate-900 hover:bg-slate-950`:`bg-slate-200 hover:bg-slate-50`} p-2 rounded-lg my-1 cursor-pointer `} onClick={()=>{
      navigate(`/chat/${notification?.Messaged?.userId}`);
      setMessageId(notification?.Messaged?.messageId?._id)
    }} >
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{notification.fromEmail}</p>
        <p className={`text-[0.9rem] ml-2 mt-1 ${dark?`text-[#3ff339]`:`text-[#3ca739]`}`}>Messaged</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>{notification?.Messaged?.messageId?.message?.text?.length>=13?`${notification?.Messaged?.messageId?.message?.text?.substring(0, 13)} ...`:`${notification?.Messaged?.messageId?.message?.text}`}</p>
      </div> }
    </>
  )
}

const Notificationsm = () => {
  const {dark,user}=useContext(appState);
  const [notificationLoader, setNotificationLoader] = useState(false);
    const [notifications, setNotifications] = useState([]);
  const getNotifications = async ()=>{
    setNotificationLoader(true)
    let res=await fetch(`${config.baseUrl}/api/notification/getnotifications`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
    credentials:'include', 

    })
    let data=await res.json();
    setNotificationLoader(false)
    if(res.status===200){
      // console.log(data.notifications);
      setNotifications(data.notifications)
    }
  }

  useEffect(()=>{
    getNotifications()
  },[user])

  return (
    <div className={`absolute mx-auto top-0 rounded-xl min-w-[300px] w-[23vw] h-[100vh] ${dark?`bg-slate-800 border-slate-700`:`bg-slate-100 border-slate-300`} z-[11] p-2 flex ss:hidden flex-col overflow-scroll no-scrollbar border-2 `}>
      {!user && <div className={`bg-gray-900 ${dark?'bg-opacity-80':'bg-opacity-20'} rounded-xl  h-[100vh] w-[100%] z-[39]`}></div>}
      {!user && !notificationLoader && notifications?.length===0 && <><p className='flex justify-center items-center text-[1.125rem] font-medium absolute top-[35%] left-[20%] text-red-600 mt-10'>....... Please login .........</p></>}
      {user && !notificationLoader && notifications?.length===0 && <><p className='flex justify-center items-center text-[1.125rem] font-medium absolute top-[35%] left-[10%] text-red-600 mt-10'>..... No Notifications Found .....</p></>}
      {notifications.map((notification,i)=>(
        <SubNotification key={i} notification={notification}/>
        ))}
        {notificationLoader && <div className='m-auto mt-[60%]'> <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box></div>}
    </div>
  )
}

export default Notificationsm
