import { useContext } from 'react';
import '../style.css/MenuVerticalWaiter.css';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MenuVertical = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Obtener la función logout del contexto

  // Función para cerrar sesión y realizar cualquier otra acción necesaria
  const handleLogout = () => {
    // Realiza aquí cualquier acción necesaria al cerrar sesión

    logout(); // Llama a la función logout del contexto


    // Redirigir a la página de inicio (Home)
    navigate('/');
  };

  return (
    <div className="menu-vertical">
      <ul className='cajaMenu'>
      <li><Link className='home' to="/waiter">HOME</Link></li> {/* Utiliza Link para redirigir a la página de inicio */}
        <li><Link className='menu' to="/waiter">MENU</Link></li> {/* Utiliza Link para redirigir a la página de Orders */}
        <li onClick={handleLogout}>LOGOUT</li> {/* Agregar el onClick para llamar a la función handleLogout */}
      </ul>
    </div>
  );
};

export default MenuVertical;