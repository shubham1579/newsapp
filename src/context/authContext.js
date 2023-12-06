import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firestore";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const authContext = createContext();

function useAuth(){
    const value = useContext(authContext);
    return value;
}

const AuthContextProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);
    // const [logged, setLoggedOut] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user){
                setUserId(user.uid);
                setIsAuthenticated(true);
                setUserName(user.displayName);
                setLoggedIn(true);
            }
            else{
                setIsAuthenticated(false);
            }
        })
    }, []);

    const handleLogOut = () => {
        
        signOut(auth)
        .then(() => {
            setIsAuthenticated(false);
            setLoggedIn(false);
        })
        .catch((err) => {
            console.log(err);
        })

        toast("Sign out successful");
    }


    return (
        <authContext.Provider value={{ isAuthenticated, userName, setUserName, setIsAuthenticated, handleLogOut, userId, setUserId, loggedIn, setLoggedIn }}>
            {children}
        </authContext.Provider>
    )

}

export { useAuth, AuthContextProvider }