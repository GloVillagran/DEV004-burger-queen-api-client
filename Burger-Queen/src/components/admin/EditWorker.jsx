import { useState } from 'react';
import ReactModal from 'react-modal';

const EditWorker = ({ isOpen, worker, closeModal, updateWorker }) => {
    const [editedData, setEditedData] = useState({
      // Inicializa el estado con los valores actuales del trabajador
      id: worker?.id || '',
      email:  worker?.email || '',
      role: worker?.role || '',
      password: worker?.password || '',
      // Agrega aquí otros campos que desees editar
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Envía los datos actualizados a la API mock
      updateWorker(editedData);
      closeModal();
    };
  
    return (
      <ReactModal isOpen={isOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
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
          />
          <label>Rol:</label>
          <input
            type="text"
            name="role"
            value={editedData.role}
            onChange={handleChange}
          />
          {/* Agrega aquí otros campos del formulario */}
          <button type="submit">Actualizar</button>
        </form>
      </ReactModal>
    );
  };
  export default EditWorker;
