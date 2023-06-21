import React,{useState,useContext} from 'react'
import {appState} from '../App'

const SetPasswd = () => {
    const {openLogin,setOpenLogin,dark,setOpenSignUp,setForgotPasswdForm,setpasswd,setSetpasswd,forgotpasswdemail,toast}=useContext(appState);
    const [form,setForm]=useState({
        password:'',
        confirm_password:'',
        otp:''
      })
      const handleChange=(e)=>{
        const {name,value} =e.target;
        setForm({...form,[name]:value})
      }
      const handleKeyEnter=(e)=>{
        if(e.key=='Enter'){
          submit();
        }
       }
      const submit=async ()=>{
        const {password,confirm_password,otp}=form
        let res=await fetch("http://localhost:8000/api/user/verifyOtp",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include', 
            body:JSON.stringify({
                password,confirm_password,otp,email:forgotpasswdemail
            })
          })
          let data=await res.json();
          if(res.status===200){
            setSetpasswd(false)
            setOpenLogin(true)
            setForm({
                password:'',
                confirm_password:'',
                otp:''
              })
            toast.success('sucessfully changed password', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
          }else if(res.status===400){
            toast.warn('Password does not match', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
          }else if(res.status===401){
            toast.warn('Invalid OTP', {
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
          else{
            toast.error('error in changing password', {
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
    <div className={`${setpasswd?"":"hidden"} transition duration-150 ease-in-out  absolute z-40 top-10 left-[10%] sm:left-[30%] h-auto p-8 pb-0 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"} rounded-2xl border-2`}>
    <form action=""  className=' flex flex-col gap-6 mb-3' onKeyUp={handleKeyEnter}>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Password</span>
          <input 
          type="password" 
          name='password'
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
          />
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Confirm Password</span>
          <input 
          type="password" 
          name='confirm_password'
          value={form.confirm_password}
          onChange={handleChange}
          placeholder="Confirm_password"
          className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
          />
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Enter OTP</span>
          <input 
          type="text" 
          name='otp'
          value={form.otp}
          onChange={handleChange}
          placeholder="Enter OTP"
          className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
          />
        </label>
   
    </form>
    <div className='m-6 mb-4 right-3 font-medium' >
    <button className={`h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 bg-red-500 hover:bg-red-600`} onClick={()=>{setSetpasswd(false);setForgotPasswdForm(true)}} >&larr;Back</button>
      <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1 ${dark?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700 text-white"}`} onClick={submit}>Submit</button>

    </div>
  </div>
  )
}

export default SetPasswd
