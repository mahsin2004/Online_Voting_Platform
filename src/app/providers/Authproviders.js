"use client";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/config";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInWithPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, image) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user", currentUser);
      const userEmail = currentUser?.email || user?.email;
      const loggedEmail = { email: userEmail };

      const axiosConfig = { withCredentials: true };
      setLoading(false);

      //if user existe the issue a token
      if (currentUser) {
        axios
          .post("https://evs-delta.vercel.app/jwt", loggedEmail, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("token response", res?.data);
          });
      } else {
        axios
          .post("https://evs-delta.vercel.app/logout", loggedEmail, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res?.data);
          });
      }
    });

    return () => unSubscribe();
  }, [user]);

  const authInfo = {
    user,
    loading,
    createUser,
    logInWithPass,
    logOut,
    googleSignIn,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
