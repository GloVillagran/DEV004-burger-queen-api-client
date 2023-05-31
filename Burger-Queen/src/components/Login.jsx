import { useState, useContext, useEffect } from 'react'
import logo from '../assets/img/2.png'
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  //redirecciono cuando cambia el estado del usuario
  useEffect(() => {
    if(user && user.role) {
      const role = user.role
      console.log(role)
  
      switch (role) {
        case 'admin': navigate('/admin')
          break;
        case 'waiter': navigate('/waiter')
          break;
        case 'chef': navigate('/chef')
          break;
        default: null  
      }
    } 
   })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(' http://localhost:8080/login', {
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
    <div>
      <img src={logo} className='logoLogin' /> <br />
      <h1>Log In</h1>
       <p>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email" id='email' placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password" id='password' placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> <br />
        </div>
        <button type="submit" className='login'>Log In</button>
        <Link to="/">Back to home</Link>
      </form>
    </div>
  );
}

export default Login
       


