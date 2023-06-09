import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

/* Establecer el elemento de la aplicación, es importante para garantizar que los lectores de pantalla 
no accedan al contenido principal cuando el modal está abierto. */
ReactModal.setAppElement('#root');

const EditWorker = ({ isOpen, worker, closeModal, updateWorker }) => {
  const [editedData, setEditedData] = useState({
    id: '',
    email: '',
    role: '',
    password: '',
    // Agrega aquí otros campos que desees editar
  });

  useEffect(() => {
    if (worker) {
      setEditedData(worker);
    }
  }, [worker]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWorker(worker.id, editedData); // Llama a updateWorker con el ID del trabajador y los datos actualizados
    closeModal();
  };
  

  return (
    <ReactModal isOpen={isOpen} onRequestClose={closeModal}>
      <form onSubmit={(e) => handleSubmit(e, editedData.id)}>
        <label>Id:</label>
        <input
          type="text"
          name="id"
          value={editedData.id}
          onChange={handleChange}
        />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={editedData.email}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={editedData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
       <label>Rol:</label>
        <select name="role" value={editedData.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="chef">Chef</option>
          <option value="waiter">Waiter</option>
        </select>
        {/* Agrega aquí otros campos del formulario */}
        <button type="submit">Update</button>
      </form>
    </ReactModal>
  );
};

export default EditWorker;
