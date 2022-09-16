import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [userFirebase, setUserFirebase] = useState({ login: false });

  useEffect(() => {
    /* const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserFirebase(currentUser);
      setLoading(false);
    });
    return () => {
      unsuscribe();
    }; */
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signupWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserFirebase({ login: true });
      })
      .catch((error) => {
        // Handle Errors here.
        return error;
      });
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        signupWithGoogle,
        userFirebase,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

/*  
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const loginWithGoogle = (email, password) => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => signOut(auth); */
