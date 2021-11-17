import initializeFirebase from "../components/Login/Firebase/firebase.init";
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, signOut } from "firebase/auth";
import { SERVER_BASE_URL } from '../App';


// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, role, service, cost, experience, mobileNumber, address, location, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');

                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    postUserToDb(name, email, role, service, cost, experience, mobileNumber, address, history, location)
                }).catch((error) => {
                    console.log(error)
                });
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                fetch(SERVER_BASE_URL + "/user/" + email)
                    .then(res => res.json())
                    .then(data => {
                        console.log("test", data.user.role)
                        setUser({ 
                            email: data.user.email, 
                            displayName: data.user.name, 
                            role: data.user.role, 
                            id: data.user._id, 
                            address: data.user.address,
                            mobileNumber: data.user.mobileNumber
                        });
                        setIsLoading(false);
                    })
                    .catch(err => { console.log(err) })
                const destination = location?.state?.from || '/';
                history.push(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const signInWithGoogle = (isRegister, location, history, role) => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const { email, displayName, photoURL } = result.user;
                const user = { email, displayName, photoURL }
                setAuthError('');
                if (isRegister) {
                    setUser({ ...user, role })
                    postUserToDb(displayName, email, role, history, location)
                }
                else {
                    setIsLoading(true)
                    fetch(SERVER_BASE_URL + "/user/" + user.email)
                        .then(res => res.json())
                        .then(data => {
                            setUser({ email: user.email, displayName: user.displayName, photoURL: user.photoURL, role: data.role, id: data.id, address: data.address });
                            setIsLoading(false);
                            const destination = location?.state?.from || '/';
                            history.push(destination);
                        })
                        .catch(err => { console.log(err) })
                }

            }).catch((error) => {
                setAuthError(error.message);
            }).finally(() => setIsLoading(false));
    }

    const postUserToDb = (name, email, role, service, cost, experience, mobileNumber, address, history, location) => {
        fetch(SERVER_BASE_URL + '/addUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, role, service, cost, experience, mobileNumber, address })
        })
            .then(res => res.json())
            .then(data => {
                const newUser = { id: data.id, email, displayName: name, role, address: data.address, mobileNumber: data.mobileNumber };
                setUser(newUser);
                const destination = location?.state?.from || '/';
                history.push(destination);
            })
            .catch(err => console.log(err))
    }

    // observer user state
    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            
            if (user) {
                fetch(SERVER_BASE_URL + "/user/" + user.email)
                    .then(res => res.json())
                    .then(data => {
                        console.log("test", data.user)
                        setUser({ 
                            email: data.user.email, 
                            displayName: data.user.name, 
                            role: data.user.role, 
                            id: data.user._id, 
                            address: data.user.address,
                            mobileNumber: data.user.mobileNumber
                        });
                        setIsLoading(false);
                    })
                    .catch(err => { console.log(err) })

            } else {
                setUser({})
                setIsLoading(false);
            }

        });



    }, [])

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

    return {
        user,
        isLoading,
        setIsLoading,
        authError,
        setAuthError,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
    }
}

export default useFirebase;