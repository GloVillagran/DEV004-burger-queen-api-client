import { useState } from 'react';
import axios from 'axios';
import MenuVerticalAdmin from './MenuVerticalAdmin';
import Alert from '../Alert';
import '../style.css/admin.css';


const WorkersAdd = () => {
  const [newWorker, setNewWorker] = useState({ id: '', email: '', password: '', role: '' });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewWorker({ ...newWorker, [name]: value });
   // setShowAlert(false); // Ocultar la alerta al escribir en un input
  };

  const addWorker = async () => {
    try {
      await axios.post(`http://localhost:8080/users/`, newWorker);
      setShowAlert(true); // Mostrar la alerta "Ready, added worker" al agregar un trabajador
    } catch (error) {
      console.error('Error adding worker:', error);
    }
  };

  // Función para ocultar el mensaje de alerta
  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="form-container">
      <MenuVerticalAdmin />
      <div className='contentAdd'>
      <div className='caja' >
      <h2 className='titleAdd'>Add Workers</h2>
      <form className='formAdd'>
        {/* <input
          className='id'
          type="text"
          name="id"
          placeholder="ID"
          value={newWorker.id}
          onChange={handleInputChange}
        /> <br /> */}
        <input
        className='email'
          type="text"
          name="email"
          placeholder="Email"
          value={newWorker.email}
          onChange={handleInputChange}
        /> <br />
        <input
        className='password'
          type="password"
          name="password"
          placeholder="Password"
          value={newWorker.password}
          onChange={handleInputChange}
        /> <br />
        <select
        className='role'
          name="role"
          value={newWorker.role}
          onChange={handleInputChange}
        >
          <option value="">Select Rol</option>
          <option value="admin">Admin</option>
          <option value="waiter">Waiter</option>
          <option value="chef">Chef</option>
        </select> <br />
        <button className='add' type="button" onClick={addWorker}>Add</button>
      </form>
      {showAlert && (
          <Alert type="success" message="Ready, added worker" onClose={hideAlert} />
        )}
      </div>
      </div>
    
    </div>
  );
};

export default WorkersAdd;
