// Login.js

import {React, useState} from 'react';
import { Link } from 'react-router-dom';


function Login({onSubmit}) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e){
        e.preventDefault();
        onSubmit(password,email);
  }

  return(
      <section className="register">
        <p className="register__welcome">
          Вход
        </p>
        <form onSubmit={handleSubmit} className="register__form">
          <input className="register__input" id="email" name="email" type="email" value={email} onChange={({target})=>setEmail(target.value)} placeholder="Email"/>
          <input className="register__input" id="username" name="password" type="text" value={password} onChange={({target})=>setPassword(target.value)} placeholder="Пароль"/>
              <button type="submit" className="register__link" onClick={handleSubmit}>Войти</button>
        </form>
      </section>
    )
  }


export default Login;