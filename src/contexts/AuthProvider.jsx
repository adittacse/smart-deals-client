import {useEffect, useState} from "react";
import AuthContext from "./AuthContext.jsx";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.init.js";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (data) => {
        return updateProfile(auth.currentUser, data);
    }

    const userSignInUser = (email, password) => {
        setLoading(true);;
        return signInWithEmailAndPassword(auth, email, password);
    }

    const userSignOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const authData = {
        user,
        setUser,
        loading,
        updateUser,
        createUser,
        userSignInUser,
        userSignOut
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;