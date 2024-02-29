import React from 'react'

const SubNotification = () => {
    let dark=true
    let notification={
    type:'Messaged'
    }
  return (
    <>
    
    {notification.type==='Liked' && <div className='bg-slate-900 p-2 rounded-lg my-1'>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#c4746665@gmail.com</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-red-600'>Liked Your Post</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>No one able to ...</p>
      </div> }

    {notification.type==='Commented' && <div className='bg-slate-900 p-2 rounded-lg my-1'>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#c4746665@gmail.com</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#f4c838]'>Commented Your Post</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>No one able to ...</p>
      </div> }

    {notification.type==='Retweeted' && <div className='bg-slate-900 p-2 rounded-lg my-1'>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#c4746665@gmail.com</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#3a3afb]'>Retweeted</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>No one able to ...</p>
      </div> }

      {notification.type==='Posted' && <div className='bg-slate-900 p-2 rounded-lg my-1'>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#c4746665@gmail.com</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#3a3afb]'>Posted</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>No one able to ...</p>
      </div> }

    {notification.type==='Messaged' && <div className='bg-slate-900 p-2 rounded-lg my-1'>
        <p className={`text-[0.95rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#c4746665@gmail.com</p>
        <p className='text-[0.9rem] ml-2 mt-1 text-[#3ff339]'>Messaged</p>
        <p className='text-[0.85rem] ml-3 mt-1 border-t-2 border-l-2 border-slate-700 m-1 p-1'>No one able to ...</p>
      </div> }
    </>
  )
}

const Notification = () => {
    
  return (
    <div className='absolute right-[18rem] top-16 rounded-xl w-[23vw] h-[100vh] bg-slate-800 z-[1] p-2 flex flex-col overflow-scroll no-scrollbar'>
      <SubNotification />
      <SubNotification />
      <SubNotification />
      <SubNotification />
      <SubNotification />
      <SubNotification />
      <SubNotification />
      <SubNotification />
      <SubNotification />
      <SubNotification />
      <SubNotification />
    </div>
  )
}

export default Notification
