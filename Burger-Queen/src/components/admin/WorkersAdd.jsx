import { useState } from 'react';
import axios from 'axios';
//import { AuthContext } from '../../AuthContext';
import MenuVerticalAdmin from './MenuVerticalAdmin';


const WorkersAdd = () => {
  //const { token } = useContext(AuthContext);
  const [newWorker, setNewWorker] = useState({ id: '', email: '', password: '', role: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewWorker({ ...newWorker, [name]: value });
  };

  const addWorker = async () => {
    try {
       await axios.post(`http://localhost:8080/users/`, newWorker)
     
    } catch (error) {
      console.error('Error al agregar el trabajador:', error);
    }
  };

  return (
    <div>
       <MenuVerticalAdmin />
      <h3>Add Workers</h3>
      <form>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={newWorker.id}
          onChange={handleInputChange}
        /> <br />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={newWorker.email}
          onChange={handleInputChange}
        /> <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newWorker.password}
          onChange={handleInputChange}
        /> <br />
        <select
          name="role"
          value={newWorker.role}
          onChange={handleInputChange}
        >
          <option value="">Select Rol</option>
          <option value="admin">Admin</option>
          <option value="waiter">Waiter</option>
          <option value="chef">Chef</option>
        </select>
        <button type="button" onClick={addWorker}>Add</button>
      </form>
    </div>
  );
};

export default WorkersAdd;
