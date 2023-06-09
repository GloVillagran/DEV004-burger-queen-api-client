import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import MenuVerticalAdmin from './MenuVerticalAdmin';
import EditWorker from './EditWorker';


const WorkersList = () => {
  const { token } = useContext(AuthContext);
  const [workers, setWorkers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [editedWorker, setEditedWorker] = useState(null);

  

  useEffect(() => {
    fetchWorkers();
  }, [token]);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users', {
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
      const response = await axios.get(`http://localhost:8080/users/${worker.id}`, {
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
        const response = await axios.patch(`http://localhost:8080/users/${uid}`, 
        updatedData,
        {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
        closeModal();
        // Actualiza los datos de los trabajadores
       fetchWorkers(response.data);
      } catch (error) {
        console.error('Failed to update worker:', error);
      }
    };
    
  const deleteWorker = async (uid) => {
    try {
      const response = await axios.delete(`http://localhost:8080/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchWorkers(response.data);
    } catch (error) {
      console.error('Error deleting worker:', error);
    }
  };

  const renderWorkers = () => {
    if (workers.length === 0) {
      return <p>No workers available.</p>;
    }

    return (
      <div>
        <MenuVerticalAdmin />
      <ul>
        {workers.map(worker => (
          <li key={worker.id}>
            ID: {worker.id} | Email: {worker.email} |  Rol: {worker.role}
            <button onClick={() => editWorker(worker)}>Edit</button>
            <button onClick={() => deleteWorker(worker.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <EditWorker
      isOpen={isModalOpen}
      worker={editedWorker}
      closeModal={closeModal}
      updateWorker={updateWorker}
    />
      </div>
    );
  };

  return (
    <div>
      <h3>List Workers</h3>
      {renderWorkers()}
    </div>
  );
};

export default WorkersList;
