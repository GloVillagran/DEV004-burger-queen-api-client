import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import MenuVerticalAdmin from './MenuVerticalAdmin';
import EditWorker from './EditWorker';
import Alert from '../Alert';
import '../style.css/tables.css'

const WorkersList = () => {
  const { token } = useContext(AuthContext);
  const [workers, setWorkers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedWorker, setEditedWorker] = useState(null);
  const [showAlertDelete, setShowAlertDelete] = useState(false);

  useEffect(() => {
    fetchWorkers();
  }, [token]);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('https://json-server-beta-mauve.vercel.app/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWorkers(response.data);
    } catch (error) {
      console.error('Error getting workers:', error);
    }
  };

  const editWorker = async (worker) => {
    setIsModalOpen(true);
    try {
      const response = await axios.get(`https://json-server-beta-mauve.vercel.app/users/${worker.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditedWorker(response.data);
    } catch (error) {
      console.error('Error getting workers:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedWorker(null);
  };

  const updateWorker = async (uid, updatedData) => {
    try {
      const response = await axios.patch(`https://json-server-beta-mauve.vercel.app/users/${uid}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      closeModal();
      fetchWorkers(response.data);
    } catch (error) {
      console.error('Failed to update worker:', error);
    }
  };

  const deleteWorker = async (uid) => {
    try {
      const response = await axios.delete(`https://json-server-beta-mauve.vercel.app/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchWorkers(response.data);
      setShowAlertDelete(true);
    } catch (error) {
      console.error('Error deleting worker:', error);
    }
  };

    // Función para ocultar el mensaje de alerta
    const hideAlert = () => {
      setShowAlertDelete(false);
    };

  const renderWorkers = () => {
    if (workers.length === 0) {
      return <p>No workers available.</p>;
    }

    return (
      <table className='table'>
      <thead>
        <tr className='encabezado'>
          {/* <th>ID</th> */}
          <th>Email</th>
          <th>Rol</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {workers.map(worker => (
          <tr key={worker.id}>
            {/* <td>{worker.id}</td> */}
            <td>{worker.email}</td>
            <td>{worker.role}</td>
            <td>
              <button className='edit'  onClick={() => editWorker(worker)}>Edit</button>
            </td>
            <td>
              <button className='delete' onClick={() => deleteWorker(worker.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    );
    
  };

  return (
    <div className='WorkerList'>
      <MenuVerticalAdmin />
      <div className='contentList'>
      <h3 className='list'>LIST WORKERS</h3>
      {renderWorkers()}
      
      {showAlertDelete && (
        <Alert type="success" message="Deleted worker" onClose={hideAlert} />
      )},
      <EditWorker
        isOpen={isModalOpen}
        worker={editedWorker}
        closeModal={closeModal}
        updateWorker={updateWorker}
      />
      </div>
     
    </div>
  );
};

export default WorkersList
