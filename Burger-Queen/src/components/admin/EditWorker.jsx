import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import '../style.css/modalWorkers.css';

/* Establecer el elemento de la aplicación, es importante para garantizar que los lectores de pantalla 
no accedan al contenido principal cuando el modal está abierto. */
//ReactModal.setAppElement('#root');

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

  const handleCancel = () => {
    closeModal();
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={closeModal} data-testid="edit-worker-modal" >
      <form className='formModal' onSubmit={(e) => handleSubmit(e, editedData.id)}>
       {/*  <label className='ID'>Id:</label>
        <input
          className='idModal'
          type="text"
          name="id"
          value={editedData.id}
          onChange={handleChange}
        /> */}
        <label className='EMAIL'>Email:</label>
        <input
          className='emailModal'
          type="text"
          name="email"
          value={editedData.email}
          onChange={handleChange}
        /> 
        <label className='PASSWORD'>Password:</label>
        <input
          className='passwordModal'
          type="password"
          name="password"
          value={editedData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <label className='ROL'>Rol:</label>
        <select className='rolModal' name="role" value={editedData.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="chef">Chef</option>
          <option value="waiter">Waiter</option>
        </select>
        <div className='buttonModalWorkers'>
        <button className='update' type="submit">Update</button> <br />
        <button className='cancel' type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </ReactModal>
  );
};

export default EditWorker;
