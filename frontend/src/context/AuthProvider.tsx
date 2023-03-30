import React, { Children, useEffect, useState } from "react";
import { firebaseAuth } from "../utils/firebaseconfig";
import firebase from 'firebase/app';
import 'firebase/auth';
// export const AuthContex = React.createContext(1);

// export default function AuthProvider({ children } ){
//     const [user, setUser] = useState([]);
  
//     React.useEffect(() => {
//         const unsubcribed = firebaseAuth.onAuthStateChanged((user) => {
//             if (user) {
//               const {displayName, email, photoURL} = user;
//               setUser({
//                 displayName, email, photoURL
//               });
//             }
//         });
//         //clean function
//         return () => {
//             unsubcribed();
//         }
//     })
//     return (
//         <AuthContex.Provider value={{user}}>
//             {children}
//         </AuthContex.Provider>
//     )
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
  

