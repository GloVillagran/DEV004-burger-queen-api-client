import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MenuVerticalDelivered from './MenuVerticalDelivered';
import { AuthContext } from '../../AuthContext';

// para almacenar la lista de pedidos en estado "delivered"
function DeliveredOrdersList() {
  const { token, user } = useContext(AuthContext);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  /* realizamos la solicitud GET a la API mock y
   la URL adecuada para obtener los pedidos con el estado "delivered". */
  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        /* para obtener los pedidos entregados almacenados en el navegador. Si existen pedidos almacenados,
         los establecemos en el estado deliveredOrders y los mostramos en la interfaz */
        const storedOrders = localStorage.getItem('deliveredOrders');
        if (storedOrders) {
          setDeliveredOrders(JSON.parse(storedOrders));
        } else {
          /* Si no hay pedidos almacenados, hacemos la solicitud GET a la API, 
          guardamos los pedidos en el estado y también los almacenamos en localStorage para futuras visitas. */
          const response = await axios.get('http://localhost:8080/orders', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const orders = response.data.filter(order => order.status === 'delivered');
          setDeliveredOrders(orders);
          localStorage.setItem('deliveredOrders', JSON.stringify(orders));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeliveredOrders();
  }, [token]);

  const handleMarkAsDelivered = async (orderId) => {
    try {
      // Realiza la solicitud para marcar el pedido como entregado en la API
      await axios.put(`http://localhost:8080/orders/${orderId}`, { status: 'delivered' }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Elimina el pedido de la lista de pedidos entregados
      const updatedOrders = deliveredOrders.filter(order => order.id !== orderId);
      setDeliveredOrders(updatedOrders);
      localStorage.setItem('deliveredOrders', JSON.stringify(updatedOrders));
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className='DeliveredOrders'>
       <MenuVerticalDelivered /> 
      <h2>Delivered Orders</h2>
      {deliveredOrders.length === 0 ? (
        <p>No delivered orders available</p>
      ) : (
        <ul>
          {deliveredOrders && deliveredOrders.map(order => (
            <li key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <p>Client: {order.client}</p>
              <p>Total: ${order.total}</p>
              <p>Status: {order.status}</p>
              <h4>Products:</h4>
              <ul>
                {order.products && order.products.map(product => (
                  <li key={product.product.id}>
                    {product.product.name} - Qty: {product.qty}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleMarkAsDelivered(order.id)}>Delivered</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeliveredOrdersList;
