import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AuthDetails(props) {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        };
    }, []);
    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                toast.success('Sign out success!');
                window.location.reload();
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            {authUser ? (
                <>
                    <p>{`Hello: ${authUser.email}`} </p>
                    <button type="submit" onClick={userSignOut}>
                        Exit
                    </button>
                </>
            ) : (
                <p>Exit</p>
            )}
            <ToastContainer />
        </div>
    );
}

export default AuthDetails;
