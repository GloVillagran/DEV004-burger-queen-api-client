import { useState, useContext } from 'react';
import axios from 'axios';
import MenuVertical from '../MenuVertical';
import { AuthContext } from '../../AuthContext';

function Chef() {
  const { token } = useContext(AuthContext);
  const [pendingOrders, setPendingOrders] = useState([]);
  
  //controla qué sección de pedidos se muestra en función del botón presionado
  const [displayedSection, setDisplayedSection] = useState(null); 

   /* esta función realiza la solicitud a la API para obtener los pedidos y
   actualiza el estado pendingOrders con los datos recibido  */
  const handleButtonClick = async (section) => {
    try {
      let response;
      if (section === 'pending') {
        response = await axios.get('http://localhost:8080/orders?status=pending', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else if (section === 'deliver') {
        // Aquí puedes realizar la lógica para obtener los pedidos a entregar
      } else if (section === 'delivered') {
        // Aquí puedes realizar la lógica para obtener los pedidos entregados
      }
      if (response && response.data) {
        setPendingOrders(response.data);
      } else {
        setPendingOrders([]);
      }
      setDisplayedSection(section);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  };
  
  return (
    <div className="Chef">
      <MenuVertical />
      <section>
        <button onClick={() => handleButtonClick('pending')}>Pending Order</button>
        <button onClick={() => handleButtonClick('deliver')}>Order to deliver</button>
        <button onClick={() => handleButtonClick('delivered')}>Order delivered</button>
      </section>

      {displayedSection === 'pending' && (
        <>
          <ul>
            {pendingOrders.map((order) => (
              <li key={order.id}>{order.clientName}</li>
            ))}
          </ul>
        </>
      )}

      {displayedSection === 'deliver' && (
        <>
         
          {/* Renderizar la lista de pedidos a entregar */}
        </>
      )}

      {displayedSection === 'delivered' && (
        <>
         
          {/* Renderizar la lista de pedidos entregados */}
        </>
      )}
    </div>
  );
}

export default Chef;

