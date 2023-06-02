import React,{useState,useContext} from 'react'
import {appState} from '../App'
import backArrow from '../assets/backArrow.gif'


const ForgotPasswd = () => {
  const {forgotPasswdForm,setForgotPasswdForm,dark,setOpenLogin,setpasswd,setSetpasswd,forgotpasswdemail,setForgotpasswdemail,toast}=useContext(appState);

   const [email,setEmail]=useState('')
      const handleChange=(e)=>{
        setEmail(e.target.value)
      }
      const handleKeyEnter=(e)=>{
        if(e.key=='Enter'){
          submit();
          console.log('run');
        }
       }
      const submit=async ()=>{
        let res=await fetch("http://localhost:8000/api/user/sendOtp",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include', 
            body:JSON.stringify({
                email
            })
          })
          let data=await res.json();
          if(res.status===200){
            setForgotPasswdForm(false)
            setSetpasswd(true)
            // console.log(data.email);
            setEmail('');
            setForgotpasswdemail(data.email);
            toast.info('OTP sent to email', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            // window.alert('successfully send otp to email');
          }else{
            // window.alert('error in send otp to email');
            toast.error('error in sending OTP to email', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
          }
        
      }
     
      
  return (
    <div className={`${forgotPasswdForm?"":"hidden"} transition duration-150 ease-in-out  absolute z-40 top-10 left-[10%] sm:left-[30%] h-auto p-8 pb-0 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"} rounded-2xl border-2`}>
    <form action=""  className=' flex flex-col gap-6 mb-3' onKeyUp={handleKeyEnter}>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Your Email</span>
          <input 
          type="email" 
          name='email'
          value={email}
          onChange={handleChange}
          placeholder="Enter Email"
          className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-6  rounded-lg outline-none border-none font-medium`}
          />
        </label>   
    </form>
    <div className='m-6 mb-4 right-3 font-medium' >
    <button className={`h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 bg-red-500 hover:bg-red-600`} onClick={()=>{setForgotPasswdForm(false);setOpenLogin(true)}} >&larr;Back</button>
      <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1  ${dark?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700 text-white"}`}  onClick={submit}>Send OTP</button>
    </div>
  </div>
  )
}

export default ForgotPasswd
