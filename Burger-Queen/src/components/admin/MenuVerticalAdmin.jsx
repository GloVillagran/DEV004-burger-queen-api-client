import { useState } from 'react';
import '../style.css/MenuVerticalWaiter.css';
//import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MenuVerticalAdmin = () => {
  const navigate = useNavigate();

  const [workersOpen, setWorkersOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const handleLogout = () => {
    // Realiza aquí cualquier acción necesaria al cerrar sesión
    navigate('/');
  };

  const toggleWorkers = () => {
    setWorkersOpen(!workersOpen);
  };

  const toggleProducts = () => {
    setProductsOpen(!productsOpen);
  };

  return (
    <div className="menu-vertical">
      <ul className="cajaMenu">
        <li onClick={toggleWorkers}>
          Workers
          {workersOpen && (
            <ul>
              <li>
                <Link to="/workersList">WorkersList</Link>
              </li>
              <li>
                <Link to="/workersAdd">WorkersAdd</Link>
              </li>
            </ul>
          )}
        </li>
        <li onClick={toggleProducts}>
          Products
          {productsOpen && (
            <ul>
              <li>
                <Link to="/productsList">ProductsList</Link>
              </li>
              <li>
                <Link to="/productsAdd">ProductsAdd</Link>
              </li>
            </ul>
          )}
        </li>
        <li onClick={handleLogout}>LogOut</li>
      </ul>
    </div>
  );
};

export default MenuVerticalAdmin;
