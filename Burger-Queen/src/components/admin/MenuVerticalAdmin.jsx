import { useState, useContext } from 'react';
import '../style.css/MenuVerticalWaiter.css';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MenuVerticalAdmin = () => {
  const navigate = useNavigate();

  const [workersOpen, setWorkersOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { logout } = useContext(AuthContext); // Obtener la función logout del contexto


  const handleLogout = () => {
    // Realiza aquí cualquier acción necesaria al cerrar sesión
    logout(); // Llama a la función logout del contexto
    // Redirigir a la página de inicio (Home)
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
        <li className='workers' onClick={toggleWorkers}>
          WORKERS
          {workersOpen && (
            <ul className='subMenu'>
              <li className='workersList'>
                <Link className='workersList' to="/workersList">WorkersList</Link>
              </li>
              <li className='workersAdd'>
                <Link className='workersList' to="/workersAdd">WorkersAdd</Link>
              </li>
            </ul>
          )}
        </li>
        <li className='products' onClick={toggleProducts}>
          PRODUCTS
          {productsOpen && (
            <ul className='subMenu'>
              <li className='productList'>
                <Link className='productList' to="/productsList">ProductsList</Link>
              </li>
              <li className= 'productAdd'>
                <Link className='productAdd' to="/productsAdd">ProductsAdd</Link>
              </li>
            </ul>
          )}
        </li>
        <li className='logout' onClick={handleLogout}>LOGOUT</li>
      </ul>
    </div>
  );
};

export default MenuVerticalAdmin;
