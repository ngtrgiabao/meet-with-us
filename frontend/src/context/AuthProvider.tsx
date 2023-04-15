import React, { Children, createContext, useEffect, useState } from "react";
import { firebaseAuth } from "../utils/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import userService from "../api/user/user.service";
import { setUser } from "../hooks/slices/AuthSlice";




// userService.getAll().then((data) => {
//      console.log(data);
   
//   });
  
  
  // const AuthContex = createContext()
  
  //   const AuthContexProvider = ({data}) =>{
  //   const [currentUser,setCurrenUser] = useState({})
  
  //   useEffect(()=>{
  //     onAuthStateChanged(firebaseAuth,(data)=>{
  //       setCurrenUser(user)
  //       console.log(data)
  //     });
  //   },[]);
  //   <AuthContex.Provider value={{currentUser}}>
  //     {data}
  //   </AuthContex.Provider>
  // }




// import { firebaseAuth } from "../utils/firebaseconfig";
// import firebase from 'firebase/app';
// import 'firebase/auth';
// export const AuthContex = React.createContext<string[]>([]);
// export default function AuthProvider({ children }: { children: ReactNode } ){
//     const [user, setUser] = useState<string[]>([]);
  
   
    // return (
    //     <AuthContex.Provider value={user}>
    //         {children}
    //     </AuthContex.Provider>
    // )
// }

// function AuthProvider() {
//     const [user, setUser] = useState(null);
  
//     useEffect(() => {
//       firebase.firebaseAuth().onAuthStateChanged(user => {
//         setUser(user);
//       });
//     }, []);
  
//     return (
//       <div>
//         {user ? (
//           <p>Welcome, {user.displayName}</p>
//         ) : (
//           <SignIn />
//         )}
//       </div>
//     );
//   }
  

