import {
  getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
  } from "firebase/auth";
import { firebaseAuth,usersRef,firebaseDB } from "../utils/firebaseconfig";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { useAppDispatch } from "../hooks/index";
import { setUser } from "../hooks/slices/AuthSlice"
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

const dispatch = useAppDispatch();
    const navigate = useNavigate();
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/");
      });
    export const Login = async () => {
        const provider = new GoogleAuthProvider();
        const {
          user: { displayName, email, uid, photoURL },
        } = await signInWithPopup(firebaseAuth, provider);
        if (email) {
            const firestoreQuery = query(usersRef, where("uid", "==", uid));
            const fetchedUser = await getDocs(firestoreQuery);
            if (fetchedUser.docs.length === 0) {
              await addDoc(collection(firebaseDB, "users"), {
                uid,
                name: displayName,
                email,
                photoURL,
              });
            }
            dispatch(setUser({ uid, email: email!, name: displayName! }));
            navigate("/");
          }
      };

