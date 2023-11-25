/* eslint-disable react/prop-types */
import { createContext } from "react";
import {  useEffect, useState } from "react";
import {  GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const [user, setUser]=useState(null)
    const[loading, setLoading]=useState(true)
    const provider = new GoogleAuthProvider()
    // const axiosPublic = useAxiosPublic()


    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const logIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleLogIn = ()=>{

        setLoading(true)
        return signInWithPopup(auth,provider)

    }

  

    const logOut = ()=>{
        setLoading(true);
        return signOut(auth)
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
             setUser(currentUser)
             console.log('current user', currentUser)
            //  if(currentUser){
            //      const userInfo={email:currentUser.email}
            //      axiosPublic.post('/jwt',userInfo)
            //      .then(res=>{
            //          if(res.data.token){
            //              localStorage.setItem('access-token', res.data.token)
            //          }
            //          setLoading(false)
            //      })
            //  }
            //  else{
            //      localStorage.removeItem('access-token')
            //      setLoading(false)
            //  }
            setLoading(false)
             
         })
         return ()=>{
             return unsubscribe;
         }
     },[])




    const authInfo = {
        user,
        loading,
        createUser,
        logIn,
        logOut,
        googleLogIn
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;