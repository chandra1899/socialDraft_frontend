import React,{useContext,useEffect,useState} from 'react'
import { appState } from '../App'

const EditProfileForm = () => {
    const {editProfile,setEditProfile,user,setUser}=useContext(appState);
    const [form,setForm]=useState({
        email:'',
        name:'',
        description:''
      })
      const handleChange=(e)=>{
        const {name,value} =e.target;
        setForm({...form,[name]:value})
      }
    const submit=async ()=>{
        const {name,description}=form
        let res=await fetch("http://localhost:8000/api/user/update",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
    credentials:'include', 
            body:JSON.stringify({
                name,description
            })
          })
          const data=await res.json();
          if(res.status===200){
            // window.alert("updated")
            setUser(data.user)
            setEditProfile(false)
          }
          else{
            window.alert("something wrong in update")
          }
    }
    useEffect( () => {
     if(user){
      form.email=user.email,
      form.name=user.name,
      form.description=user.description
     }
   }, []);
  return (
    <div className={`${editProfile?"":"hidden"} absolute z-40 top-10 left-[10%] sm:left-[30%] h-[550px] p-8 w-[500px] bg-black-gradient rounded-2xl border-2 border-slate-600`}>
    <form action=""  className=' flex flex-col gap-6'>
    <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>Your Email</span>
          <input 
          type="email" 
          name='email'
          value={form.email}
          onChange={handleChange}
          placeholder="what's your email?"
          className='bg-blue-900 py-4 px-6 placeholder:text-secondary text-red-400 rounded-lg outline-none border-none font-medium'
          disabled
          />
        </label>
    <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>Your Name</span>
          <input 
          type="text" 
          name='name'
          value={form.name}
          onChange={handleChange}
          placeholder="Enter Name?"
          className='bg-blue-900 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
          />
        </label>
    <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>Description About You</span>
          <textarea 
          name="description"
           value={form.description} 
           cols="30" 
           rows="5"
           onChange={handleChange}
           className='bg-blue-900 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium resize-none'
           ></textarea>
        </label>
   
    </form>
    <div className='m-6 right-3 font-medium'>
    <button className='h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 bg-transparent plane' onClick={()=>{setEditProfile(false)}} >Cancel</button>
      <button className='h-[42px] rounded-xl w-[80px] m-2 p-1 bg-green-600 hover:bg-green-700' onClick={submit}>Update</button>
    </div>
  </div>
  )
}

export default EditProfileForm
