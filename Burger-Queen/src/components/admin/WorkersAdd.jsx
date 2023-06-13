import { useState } from 'react';
import axios from 'axios';
import MenuVerticalAdmin from './MenuVerticalAdmin';
import '../style.css/admin.css';


const WorkersAdd = () => {
  const [newWorker, setNewWorker] = useState({ id: '', email: '', password: '', role: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewWorker({ ...newWorker, [name]: value });
  };

  const addWorker = async () => {
    try {
      await axios.post(`http://localhost:8080/users/`, newWorker);
    } catch (error) {
      console.error('Error adding worker:', error);
    }
  };

  return (
    <div className="form-container">
      <MenuVerticalAdmin />
      <h2>Add Workers</h2>
      <form>
        <input
          className='id'
          type="text"
          name="id"
          placeholder="ID"
          value={newWorker.id}
          onChange={handleInputChange}
        /> <br />
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
        </select>
        <button className='add' type="button" onClick={addWorker}>Add</button>
      </form>
    </div>
  );
};

export default WorkersAdd;
