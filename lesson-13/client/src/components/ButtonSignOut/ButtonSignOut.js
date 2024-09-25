import { useNavigate } from "react-router-dom";

export const ButtonSignOut = () => {
    const navigate = useNavigate()
    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    return <button onClick={handleSignOut}>Выйти из системы</button>
}