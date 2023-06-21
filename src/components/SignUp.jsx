import React,{useState,useContext} from 'react'
import { appState } from '../App'
import avatar_1 from '../assets/avatar_1.png'
import avatar_2 from '../assets/avatar_2.png'
import avatar_3 from '../assets/avatar_3.png'

const SignUp = () => {
  const {openSignUp,setOpenSignUp,dark,setOpenLogin,toast}=useContext(appState)
  const [latest,setlatest]=useState('');
    const [form,setForm]=useState({
        name:'',
        email:'',
        password:'',
        confirm_password:'',
        photo:''
      })
      const handleChange=(e)=>{
        const {name,value} =e.target;
        setForm({...form,[name]:value})
      }
      const submit=async ()=>{
        const formData = new FormData();
        formData.append('avatar', form.photo);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('confirm_password', form.confirm_password);
        formData.append('name', form.name);
        formData.append('latest', latest);
        if(form.password!==form.confirm_password) {
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
            return ;
        }
        if(latest==='') {
          toast.warn('Photo is compulsary', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            return ;
        }
       let res= await fetch(`http://localhost:8000/api/user/create`,{
            method:"POST",
            body:formData
        })
        const data=await res.json();
        document.getElementById("update_profile").value = "";
        if(res.status===200){            
              toast.success('sucessfully registered', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            
            setOpenSignUp(false)
            setOpenLogin(true)
        }
        else if(res.status===401){
        
            toast.warn('password does not match', {
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
        else if(res.status===400){
          
            toast.warn('user already exists .. please log-in', {
              position: "bottom-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          setOpenSignUp(false)
          setOpenLogin(true)
        }
        else{           
              toast.error('unable to register', {
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
        setForm({
          name:'',
          email:'',
          password:'',
          confirm_password:''
        })
      }
      const handleKeyEnter=(e)=>{
        if(e.key=='Enter'){
          submit();
        }
       }
       const handlePhotoUpload=(e)=>{
        setForm({...form,photo:e.target.files[0]})
      }
  return (
    <div className={`${openSignUp?"block":"hidden"} transition duration-150 ease-in-out absolute z-40 top-4 left-[10%] sm:left-[30%] h-auto p-8 pb-3 w-[85%] ss:w-[500px] ${dark?"bg-black-gradient border-slate-600":"bg-slate-300 border-slate-200"} rounded-2xl border-2 `}>
      <form action=""  className=' flex flex-col gap-6' onKeyUp={handleKeyEnter} enctype="multipart/form-data" >
      <label className='flex flex-col'>
            <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Your Name</span>
            <input 
            type="text" 
            name='name'
            value={form.name}
            onChange={handleChange}
            placeholder="what's your name?"
            className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
          </label>
      <label className='flex flex-col'>
            <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Your Email</span>
            <input 
            type="email" 
            name='email'
            value={form.email}
            onChange={handleChange}
            placeholder="what's your email?"
            className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
          </label>
      <label className='flex flex-col'>
            <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Password</span>
            <input 
            type="password" 
            name='password'
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password?"
            className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
          </label>
      <label className='flex flex-col'>
            <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Confirm_Password</span>
            <input 
            type="password" 
            name='confirm_password'
            value={form.confirm_password}
            onChange={handleChange}
            placeholder="Enter Confirm_password?"
            className={`${dark?"bg-blue-900  text-white placeholder:text-secondary":"bg-white placeholder:text-black text-black" } py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
          </label>
          
      <label className='flex flex-col'>
            <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Choose Avatar</span>
            <div className='flex flex-row justify-around items-center'>
              <img src={avatar_1} alt="avatar_1" className={`rounded-full h-[100px] w-[100px] hover:bg-slate-400 ${latest==='avatar_1'?'bg-slate-400':''} p-1 delay-75 cursor-pointer`} onClick={()=>{setlatest('avatar_1');setForm({...form,photo:''})}}/>
              <img src={avatar_2} alt="avatar_2" className={`rounded-full h-[100px] w-[100px] hover:bg-slate-400 ${latest==='avatar_2'?'bg-slate-400':''} p-1 delay-75 cursor-pointer`} onClick={()=>{setlatest('avatar_2');setForm({...form,photo:''})}}/>
              <img src={avatar_3} alt="avatar_3" className={`rounded-full h-[100px] w-[100px] hover:bg-slate-400 ${latest==='avatar_3'?'bg-slate-400':''} p-1 delay-75 cursor-pointer`} onClick={()=>{setlatest('avatar_3');setForm({...form,photo:''})}}/>
            </div>
          </label>

          <p className='flex justify-center items-center text-[1.125rem] font-medium left-[20%] text-red-600 -mb-3'>....... OR ........</p>
          <label className='flex flex-col'>
          <span className={`${dark?"text-white":"text-black"} font-medium mb-4`}>Upload Profile Photo</span>
          <input id='update_profile' className='rounded-full cursor-pointer h-[1.9rem] bg-slate-600 text-[#3ddcf9]' type="file" name='photo'  placeholder="profile picture" onChange={handlePhotoUpload} onClick={()=>{setlatest('upload')}} />
        </label>
      </form>
      <div className='m-6 mb-3 right-3 font-medium'>
      <button className={`h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 ${dark?"hover:bg-slate-700":"hover:bg-slate-100"}`} onClick={()=>setOpenSignUp(false)} >Cancel</button>
        <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1 ${dark?"":" text-white"} bg-red-600 hover:bg-red-700`} onClick={submit}>SignUp</button>
        <span className={`${dark?"text-white hover:text-secondary":"text-green-800 hover:text-black"} cursor-pointer ml-5 text-[0.8rem]  tracking-widest`} onClick={()=>{setOpenSignUp(false);setOpenLogin(true)}}>Login</span>
      </div>
    </div>
  )
}

export default SignUp
