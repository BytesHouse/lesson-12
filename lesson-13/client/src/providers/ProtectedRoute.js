import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const checkUserToken = () => {
        const token = localStorage.getItem('token') // localStorage ключ 'token'
        if (!token || token === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/')
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken()
    }, [isLoggedIn])


    return (
        <>
            {isLoggedIn ? children : null}
        </>
    )
}