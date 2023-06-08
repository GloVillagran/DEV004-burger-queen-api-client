import React, { useState } from 'react';

const AdminComponent = () => {
  const [workers, setWorkers] = useState([
    { id: 1, name: 'John Doe', role: 'waiter' },
    { id: 2, name: 'Jane Smith', role: 'chef' }
  ]);

  const [newWorker, setNewWorker] = useState({ id: '', name: '', role: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewWorker({ ...newWorker, [name]: value });
  };

  const handleAddWorker = () => {
    setWorkers([...workers, newWorker]);
    setNewWorker({ id: '', name: '', role: '' });
  };

  const handleDeleteWorker = (id) => {
    const updatedWorkers = workers.filter(worker => worker.id !== id);
    setWorkers(updatedWorkers);
  };

  return (
    <div>
      <h2>Administrador de Trabajadores</h2>
      
      <h3>Listado de Trabajadores</h3>
      <ul>
        {workers.map(worker => (
          <li key={worker.id}>
            {worker.name} - {worker.role}
            <button onClick={() => handleDeleteWorker(worker.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      
      <h3>Agregar Trabajador</h3>
      <form>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={newWorker.id}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newWorker.name}
          onChange={handleInputChange}
        />
        <select
          name="role"
          value={newWorker.role}
          onChange={handleInputChange}
        >
          <option value="">Seleccionar Rol</option>
          <option value="waiter">Waiter</option>
          <option value="chef">Chef</option>
        </select>
        <button type="button" onClick={handleAddWorker}>Agregar</button>
      </form>
    </div>
  );
};

export default AdminComponent;
