import React,{useState,createContext,useEffect} from 'react'
import {Left,Middle,Right,Signup,Login} from './components'
// import axios from 'axios'
// import qs from "qs"; 
const appState=createContext()



function App() {
  // const [dark, setDark] = useState(true)
  //      const submit=async ()=>{
  //       const  url= "http://localhost:8000/api/user/create-session";
  //       let data = {
  //         Email: "c4746665@gmail.com",
  //         Password: 6
  //       };
  //       let options = {
  //         method: "POST",
  //         headers: { "content-type": "application/x-www-form-urlencoded" },
  //         data: qs.stringify(data),
  //         url
  //       };
  //       axios(options)
  //       .then(res => {
  //         console.log("yeh we have", res);
  //       })
  //       .catch(er => {
  //         console.log("no data sorry ", er);
  //       });
  //   }
  const [user,setUser]=useState({});
  const [openLogin,setOpenLogin]=useState(false);
  const [openSignUp,setOpenSignUp]=useState(false);
    const calluser=async ()=>{
      try {
        let res= await fetch('http://localhost:8000/api/user/getuser',{
          method:'GET',
          // mode: 'no-cors',
          headers:{
            'Access-Control-Allow-Origin': '*',
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:'include', 
        });
        let data=await res.json();
        if(res.status===200){
          setUser(data.can);
          console.log(data.can);

      }
      else{
          // window.alert("no user found")
          console.log(data.status);
      }
      } catch (err) {
        console.log(err);
      }
    }
    useEffect( () => {
       calluser();
      // console.log(user);
    }, []);

  return (
    <>
    <appState.Provider value={{user,setUser,openSignUp,setOpenSignUp,openLogin,setOpenLogin}}>
    <div className={`bg-primary text-white h-full w-full flex flex-row `}>
     <Left/>
    <Signup/>
    <Login/>
    <div  className='bg-gradient-to-b rounded-3xl fixed left-[9%] sm:left-[29%] top-6 right-4 bottom-4 z-0 from-black to-blue-950 h-full max-w-[95%] sm:max-w-[69%] p-3 flex flex-row sm:border-2 border-slate-700 '>
    <Middle/>
     <Right/>
     {/* <Practice/> */}
     {/* <button onClick={calluser}>button</button> */}
    </div>
    </div>
    </appState.Provider>
    </>
  )
}

export default App
export {appState}