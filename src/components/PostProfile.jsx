import React ,{useContext} from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { appState } from '../App'

const PostProfile = ({user}) => {
  const {dark}=useContext(appState);

  const navigate=useNavigate()
  return (
    <div className='flex flex-row p-3 ml-2' >
     {user && <img src={`${user.avatar?`http://localhost:8000/photo/${user.avatar}`:logo}`} alt="logo" className='h-[40px] w-[40px] rounded-full mr-3 cursor-pointer' onClick={()=>{navigate(`/people/${user._id}`)}} />}
      {user && <div className='flex flex-col break-all'>
        <h3 className={`font-medium -mt-1 ${dark?"":"text-black"}`} >{user.name}</h3>
        <p className={`text-[0.8rem] ${dark?"text-[#42a5c6]":"text-[#674bf3]"}`}>#{user.email}</p>
      </div>}
    </div>
  )
}

export default PostProfile
