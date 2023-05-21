import React,{useState,useContext} from 'react'
import {appState} from '../App'

const Login = () => {
  const {openLogin,setOpenLogin}=useContext(appState);

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
        let res=await fetch("http://localhost:8000/api/user/sign-in",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
          })
          const data=await res.json();
          if(res.status===200){
              window.alert("sucessfully logged in")
              setOpenLogin(false)
              console.log("data=",data,res.status);
          }
          else{
              window.alert("invalid login")
              console.log(data,res.status);
    
          }
     }
  return (
    <div className={`${openLogin?"":"hidden"} absolute z-40 top-10 left-[10%] sm:left-[30%] h-[350px] p-8 w-[500px] bg-black-gradient rounded-2xl border-2 border-slate-600`}>
    <form action=""  className=' flex flex-col gap-6'>
    <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>Your Name</span>
          <input 
          type="email" 
          name='email'
          value={form.email}
          onChange={handleChange}
          placeholder="what's your email?"
          className='bg-blue-900 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
          />
        </label>
    <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>Your Name</span>
          <input 
          type="password" 
          name='password'
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password?"
          className='bg-blue-900 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
          />
        </label>
   
    </form>
    <div className='m-6 right-3 font-medium'>
    <button className='h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 bg-transparent plane' onClick={()=>{setOpenLogin(false)}} >Cancel</button>
      <button className='h-[42px] rounded-xl w-[80px] m-2 p-1 bg-green-600 hover:bg-green-700' onClick={submit}>Login</button>
    </div>
  </div>
  )
}

export default Login
