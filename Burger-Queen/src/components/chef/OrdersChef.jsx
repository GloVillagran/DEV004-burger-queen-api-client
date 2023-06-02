import { useState, useContext } from 'react';
import axios from 'axios';
import MenuVertical from '../MenuVertical';
import { AuthContext } from '../../AuthContext';
import '../style.css/chef.css'

function OrdersChef() {
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
        if (response && response.data) {
          setPendingOrders(response.data);
          // Imprimir el id de la orden y el id del cliente en la consola
          response.data.forEach((orders) => {
            console.log('ID de la orden:', orders.id);
            console.log('name del cliente:', orders.client);
            console.log(orders.products)
          });
        } else {
          setPendingOrders([]);
        }
        }  else if (section === 'delivered') {
          // Aquí puedes realizar la lógica para obtener los pedidos entregados
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
      <button className='pending' onClick={() => handleButtonClick('pending')}>Pending Order</button>
      <button className='delivered' onClick={() => handleButtonClick('delivered')}>Order delivered</button>
    </section>

    {displayedSection === 'pending' && (
      <>
        <ul>
          {pendingOrders.map((order) => (
           <li className='pedidos' key={order.id}>
           Order ID: {order.id}, Cliente: {order.client}
           {/* <ul>
             {order.product.map((product) => (
               <li key={product.id}>
                 Producto: {product.name}, Cantidad: {product.quantity}
               </li>
             ))}
           </ul> */}
           <button className='buttonSend'>Send</button>
          <button className='buttonCancel'>Cancel</button>
         </li>
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

export default OrdersChef;


