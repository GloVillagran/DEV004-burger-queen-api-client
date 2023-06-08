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
      console.error('Error al obtener los trabajadores:', error);
    }
  };

  
    const editWorker = (worker) => {
      setIsModalOpen(true);
      setEditedWorker(worker);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };
    
    const updateWorker = async (uid) => {
      try {
        const response = await axios.patch(
          `http://localhost:8080/users/${uid}`,
          
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        // Actualiza los datos de los trabajadores
        fetchWorkers(response.data);
      } catch (error) {
        console.error('Error al actualizar el trabajador:', error);
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
      console.error('Error al eliminar el trabajador:', error);
    }
  };

  const renderWorkers = () => {
    if (workers.length === 0) {
      return <p>No hay trabajadores disponibles.</p>;
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
