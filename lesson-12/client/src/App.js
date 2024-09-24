import { useState } from "react";

function App() {
  const [state, setState] = useState(false);
  const handleRegChange = () => setState(!state);
  const handleSendRequest = (event) => {
    event.preventDefault();
    const url = state ? 'http:localhost:3000/api/auth/register' : 'http:localhost:3000/api/auth/login'
    fetch(url, {
      method: 'POST',
      body: { email: '', password: '' }
    })
  }
  return (
    <div className="text-white bg-black container mx-auto p-3 flex justify-center items-center flex-col">
      <form onSubmit={handleSendRequest} className="flex justify-center flex-col max-w-[420px] py-[150px] gap-[25px]" action="">
        <input type="email" placeholder="Введите email" />
        <input type="password" placeholder="Введите пароль" />
        <button>{state ? 'Регистрация' : 'Логин'}</button>
      </form>
      <button onClick={handleRegChange}>Поменять state</button>
    </div>
  );
}

export default App;
