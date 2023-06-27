import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MenuVerticalDelivered from './MenuVerticalDelivered';
import Alert from '../Alert'
import { AuthContext } from '../../AuthContext';

import '../style.css/ordersWaiter.css';

// para almacenar la lista de pedidos en estado "delivered"
function OrdersList() {
  const { token, user, updateDeliveredOrdersFromWaiter } = useContext(AuthContext);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
const [showAlert, setShowAlert] = useState(false);


  /* realizamos la solicitud GET a la API mock y
   la URL adecuada para obtener los pedidos con el estado "delivered". */
  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
       
          const response = await axios.get('https://json-server-beta-mauve.vercel.app/orders', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const orders = response.data.filter(order => order.status === 'delivered');
          setDeliveredOrders(orders);
        
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeliveredOrders();
  }, [token]);

  const handleMarkAsDelivered = async (orderId) => {
    try {
      await axios.patch(`https://json-server-beta-mauve.vercel.app/orders/${orderId}`, { status: 'done' }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedOrders = deliveredOrders.filter(order => order.id !== orderId);
      setDeliveredOrders(updatedOrders);
      //updateDeliveredOrdersFromWaiter(updatedOrders);

      setShowAlert(true); // Mostrar el mensaje de alerta cuando se marca un pedido como entregado
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className='DeliveredOrders'>
      <MenuVerticalDelivered />
      <div className='content-orderList'>
      <h2 className='textDelivering' >Delivering Orders</h2>
      {deliveredOrders.length === 0 ? (
        <p className='noDelivered'>No delivered orders available</p>
      ) : (
        <ul className='order-list-delivered' >
          {deliveredOrders && deliveredOrders.map(order => (
            <li className='pedidos' key={order.id}>
              <div className='client'>
                <h3>Order ID: {order.id}</h3>
                <h4>Client: {order.client}</h4>
              </div>
              <p>Total: ${order.total}</p>
              <p>Status: {order.status}</p>
              <h4>Products:</h4>
              <ul>
                {order.products && order.products.map(product => (
                  <li className='productsWaiter' key={product.product.id}>
                    {product.product.name} - Qty: {product.qty}
                  </li>
                ))}
              </ul> <br />
              <button className='Delivered' onClick={() => handleMarkAsDelivered(order.id)}>Delivered</button>
            </li>
          ))}
        </ul>
      )}
      {showAlert && (
        <Alert type="success" message="Done, order delivered!!!" onClose={() => setShowAlert(false)} />
      )}
       </div>
        </div>
  );
}

export default OrdersList;
