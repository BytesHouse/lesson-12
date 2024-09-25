import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [state, setState] = useState(false);
    const handleRegChange = () => setState(!state);
    const navigate = useNavigate();
    const handleSendRequest = (event) => {
        event.preventDefault();
        const url = state ? 'http://localhost:3005/api/auth/register' : 'http://localhost:3005/api/auth/login'
        console.log(event.target.email.value);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email: event.target.email.value, password: event.target.password.value })
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('token', JSON.stringify(data.token))
                navigate('/dashboard')
            })
            .catch((error) => {
                console.log('Error ' + error.message)
            })
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token !== 'undefined') {
            navigate('/dashboard');
        }
    }, [])
    return (
        <div className="text-white bg-black container mx-auto p-3 flex justify-center items-center flex-col">
            <form onSubmit={handleSendRequest} className="text-black flex justify-center flex-col max-w-[420px] py-[150px] gap-[25px]" action="">
                <input name='email' type="email" placeholder="Введите email" />
                <input name='password' type="password" placeholder="Введите пароль" />
                <button className='text-white'>{state ? 'Регистрация' : 'Логин'}</button>
            </form>
            <button onClick={handleRegChange}>Поменять state</button>
        </div>
    );
}