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
          WORKERS
          {workersOpen && (
            <ul>
              <li>
                <Link className='workersList' to="/workersList">WorkersList</Link>
              </li>
              <li>
                <Link className='workersList' to="/workersAdd">WorkersAdd</Link>
              </li>
            </ul>
          )}
        </li>
        <li onClick={toggleProducts}>
          PRODUCTS
          {productsOpen && (
            <ul>
              <li>
                <Link className='productList' to="/productsList">ProductsList</Link>
              </li>
              <li>
                <Link className='productAdd' to="/productsAdd">ProductsAdd</Link>
              </li>
            </ul>
          )}
        </li>
        <li onClick={handleLogout}>LOGOUT</li>
      </ul>
    </div>
  );
};

export default MenuVerticalAdmin;
