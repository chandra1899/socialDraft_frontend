import React,{useState,useContext} from 'react'
import { appState } from '../App'

const SignUp = () => {
  const {openSignUp,setOpenSignUp}=useContext(appState)
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
            console.log(data,resstatus);
        }
        else{
            window.alert("invalid registration")
            console.log(data,res.tatus);

        }
      }
  return (
    <div className={`${openSignUp?"block":"hidden"} absolute z-40 top-4 left-[10%] sm:left-[30%] h-[580px] p-8 w-[500px] bg-black-gradient rounded-2xl border-2 border-slate-600`}>
      <form action=""  className=' flex flex-col gap-6'>
      <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input 
            type="text" 
            name='name'
            value={form.name}
            onChange={handleChange}
            placeholder="what's your name?"
            className='bg-blue-900 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
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
      <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input 
            type="password" 
            name='confirm_password'
            value={form.confirm_password}
            onChange={handleChange}
            placeholder="Confirm_password?"
            className='bg-blue-900 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
      </form>
      <div className='m-6 right-3 font-medium'>
      <button className='h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 bg-transparent plane' onClick={()=>setOpenSignUp(false)} >Cancel</button>
        <button className='h-[42px] rounded-xl w-[80px] m-2 p-1 bg-red-600 hover:bg-red-700' onClick={submit}>SignUp</button>
      </div>
    </div>
  )
}

export default SignUp
