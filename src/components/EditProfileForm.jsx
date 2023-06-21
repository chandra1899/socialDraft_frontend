import React,{useContext,useEffect,useState} from 'react'
import { appState } from '../App'
import { useNavigate } from 'react-router-dom';


const EditProfileForm = () => {
  const Navigate=useNavigate()
    const {editProfile,setEditProfile,user,setUser,dark,toast}=useContext(appState);
    const [form,setForm]=useState({
        email:'',
        name:'',
        description:'',
        photo:''
      })
      const handleChange=(e)=>{
        const {name,value} =e.target;
        setForm({...form,[name]:value})
      }
      const handlePhotoUpload=(e)=>{
        setForm({...form,photo:e.target.files[0]})
      }
    const submit=async ()=>{
    const formData = new FormData();
    formData.append('avatar', form.photo);
    formData.append('description', form.description);
    formData.append('name', form.name);
        let res=await fetch("http://localhost:8000/api/user/update",{
            method:"POST",
            credentials:'include', 
            body:formData
          })
  document.getElementById("update_profile").value = "";
          const data=await res.json();
          if(res.status===200){
            setForm({...form,photo:''})
              toast.success('sucessfully Updated your profile', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
           
            setUser(data.user)
            setEditProfile(false)
          }
          else{         
              toast.error('error in updating profile', {
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
    useEffect( () => {
     if(user){
      form.email=user.email;
      form.name=user.name;
      if(user.description===undefined){
        form.description='';
      }
      else form.description=user.description
     }
   }, [user]);
  return (
    <div className={`${editProfile?"":"hidden"} transition duration-150 ease-in-out absolute z-40 top-10 left-[10%] sm:left-[30%] h-auto p-8 pb-0 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"}  rounded-2xl border-2 `}>
    <form action=""  className=' flex flex-col gap-6' enctype="multipart/form-data"  >
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`} >Your Email</span>
          <input 
          type="email" 
          name='email'
          value={form.email}
          onChange={handleChange}
          placeholder="what's your email?"
          className={`${dark?"bg-blue-900 placeholder:text-secondary":"bg-white"} py-4 px-4  text-red-400 rounded-lg outline-none border-none font-medium`}
          disabled
          />
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Your Name</span>
          <input 
          type="text" 
          name='name'
          value={form.name}
          onChange={handleChange}
          placeholder="Enter Name?"
          className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
          />
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Description About You</span>
          <textarea 
          name="description"
           value={form.description} 
           cols="30" 
           rows="5"
           onChange={handleChange}
           className={`${dark?"bg-blue-900 text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black"} py-4 px-3 rounded-lg outline-none border-none font-medium resize-none`}
           ></textarea>
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Update Profile Photo with</span>
          <input id='update_profile' className='rounded-full cursor-pointer h-[1.9rem] bg-slate-600 text-[#3ddcf9]' type="file" name='photo'  placeholder="profile picture" onChange={handlePhotoUpload} />
        </label>
    <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Change password !</span>
         <p className='text-[0.9rem] -mt-2 ml-2 underline  decoration-red-600'>To change password log-out and in log-in form go to forgot password</p>
        </label>
        
   
    </form>
    <div className='m-6 mb-3 right-3 font-medium'>
    <button className={`h-[42px] ${dark?"hover:bg-slate-700":"hover:bg-slate-100"} rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 `} onClick={()=>{setEditProfile(false)}} >Cancel</button>
      <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1 ${dark?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700 text-white"}`} onClick={submit}>Update</button>
    </div>
  </div>
  )
}

export default EditProfileForm
