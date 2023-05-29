import React,{useState,useContext} from 'react'
import { appState } from '../App'

const SignUp = () => {
  const {openSignUp,setOpenSignUp,dark,setOpenLogin}=useContext(appState)
    const [form,setForm]=useState({
        name:'',
        email:'',
        password:'',
        confirm_password:''
      })
      const handleChange=(e)=>{
        const {name,value} =e.target;
        setForm({...form,[name]:value})
      }
      const submit=async ()=>{
        const { name,email,password,confirm_password}=form;
       let res= await fetch('http://localhost:8000/api/user/create',{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
           name,email,password,confirm_password
            })
        })
        const data=await res.json();
        if(res.status===200){
            window.alert("sucessfully registered")
            setOpenSignUp(false)
            setOpenLogin(true)
            console.log(data,resstatus);
        }
        else if(res.status===401){
          window.alert('password does not match')
        }
        else if(res.status===400){
          window.alert('user already exists')
          setOpenSignUp(false)
          setOpenLogin(true)
        }
        else{
            window.alert("unable to register")
            console.log(data,res.tatus);
        }
        setForm({
          name:'',
          email:'',
          password:'',
          confirm_password:''
        })
      }
  return (
    <div className={`${openSignUp?"block":"hidden"} absolute z-40 top-4 left-[10%] sm:left-[30%] h-[580px] p-8 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"} rounded-2xl border-2 `}>
      <form action=""  className=' flex flex-col gap-6'>
      <label className='flex flex-col'>
            <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Your Name</span>
            <input 
            type="text" 
            name='name'
            value={form.name}
            onChange={handleChange}
            placeholder="what's your name?"
            className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-6  rounded-lg outline-none border-none font-medium`}
            />
          </label>
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
      <label className='flex flex-col'>
            <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Your Name</span>
            <input 
            type="password" 
            name='confirm_password'
            value={form.confirm_password}
            onChange={handleChange}
            placeholder="Confirm_password?"
            className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-6  rounded-lg outline-none border-none font-medium`}
            />
          </label>
      </form>
      <div className='m-6 right-3 font-medium'>
      <button className={`h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 ${dark?"hover:bg-slate-700":"hover:bg-slate-100"}`} onClick={()=>setOpenSignUp(false)} >Cancel</button>
        <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1 ${dark?"":" text-white"} bg-red-600 hover:bg-red-700`} onClick={submit}>SignUp</button>
        <span className={`${dark?"text-white hover:text-secondary":"text-green-800 hover:text-black"} cursor-pointer ml-5 text-[0.8rem]  tracking-widest`} onClick={()=>{setOpenSignUp(false);setOpenLogin(true)}}>Login</span>
      </div>
    </div>
  )
}

export default SignUp
