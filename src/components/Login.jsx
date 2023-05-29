import React,{useState,useContext} from 'react'
import {appState} from '../App'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {openLogin,setOpenLogin,dark,calluser,setOpenSignUp}=useContext(appState);
  const navigate=useNavigate();
    const [form,setForm]=useState({
        email:'',
        password:''
      })
      const handleChange=(e)=>{
        const {name,value} =e.target;
        setForm({...form,[name]:value})
      }
     const submit=async ()=>{
        const {email,password}=form
        let res=await fetch("http://localhost:8000/api/user/create-session",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include', 
            body:JSON.stringify({
                email,password
            })
          })
          const data=await res.json();
          if(res.status===200){
              // window.alert("sucessfully logged in")
              calluser();

              navigate('/')
              setOpenLogin(false)
              console.log("data=",data,res.status);
          }
          else if(res.status===401){
              window.alert("invalid email/password")
              console.log(data,res.status);
    
          }
          else{
            window.alert('unable to login');
          }
          setForm({
            email:'',
            password:''
          })
     }
  return (
    <div className={`${openLogin?"":"hidden"} absolute z-40 top-10 left-[10%] sm:left-[30%] h-[350px] p-8 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"} rounded-2xl border-2`}>
    <form action=""  className=' flex flex-col gap-6'>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Your Name</span>
          <input 
          type="email" 
          name='email'
          value={form.email}
          onChange={handleChange}
          placeholder="what's your email?"
          className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-6  rounded-lg outline-none border-none font-medium`}
          />
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Your Name</span>
          <input 
          type="password" 
          name='password'
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password?"
          className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-6  rounded-lg outline-none border-none font-medium`}
          />
        </label>
   
    </form>
    <div className='m-6 right-3 font-medium'>
    <button className={`h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 ${dark?"hover:bg-slate-700":"hover:bg-slate-100"}`} onClick={()=>{setOpenLogin(false)}} >Cancel</button>
      <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1 bg-green-600 hover:bg-green-700 ${dark?"":" text-white"}`} onClick={submit}>Login</button>
    <span className={`${dark?"text-white hover:text-secondary":"text-red-800 hover:text-black"} cursor-pointer ml-5 text-[0.8rem]  tracking-widest`} onClick={()=>{setOpenLogin(false);setOpenSignUp(true)}}>SignUp</span>

    </div>
  </div>
  )
}

export default Login
