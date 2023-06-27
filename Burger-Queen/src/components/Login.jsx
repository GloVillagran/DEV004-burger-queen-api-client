import logo from '../assets/img/2.png'
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  //redirecciono cuando cambia el estado del usuario
  // permite sincronizar un componente con un sistema externo.
  useEffect(() => {
    if (user && user.role) {
      const role = user.role
      console.log(role)

      switch (role) {
        case 'admin': navigate('/admin')
          break;
        case 'waiter': navigate('/waiter')
          break;
        case 'chef': navigate('/chef')
          break;
        default: setErrorMessage('Error login');
      }
    }
  }, [user, navigate])

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario a un servidor
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const response = await axios.post('https://json-server-beta-mauve.vercel.app/login', {
        email,
        password,
      });
    
      login(response.data);
    } catch (error) {
      //console.error(error.response.data.message);
      console.log(error)
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data); //trae los errores que ya vienen en la data
      }
      else {
        setErrorMessage('Error login');
      }
    }

  };

  return (
    <div className='containerLogin'>
      <div>
      <img src={logo} className='logoLogin' />
      </div>
      <h1 className='Welcome'>Welcome</h1>
      <p className='errorMessage'>{errorMessage}</p>
      <form className='formLogin' onSubmit={handleSubmit}>
          <input id="email" type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
          <input id="password" type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
        <button className= 'login' type="submit">LOGIN</button>
        <Link to="/">Back to home</Link>
      </form>
    </div>
  );
};

export default Login;
