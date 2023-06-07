import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MenuVerticalDelivered from './MenuVerticalDelivered';
import { AuthContext } from '../../AuthContext';
import '../style.css/ordersWaiter.css';

// para almacenar la lista de pedidos en estado "delivered"
function OrdersList() {
  const { token, user, updateDeliveredOrdersFromWaiter } = useContext(AuthContext);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  /* realizamos la solicitud GET a la API mock y
   la URL adecuada para obtener los pedidos con el estado "delivered". */
  useEffect(() => {
    console.log("listando")
    const fetchDeliveredOrders = async () => {
      try {
       
          const response = await axios.get('http://localhost:8080/orders', {
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
      await axios.patch(`http://localhost:8080/orders/${orderId}`, { status: 'done' }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedOrders = deliveredOrders.filter(order => order.id !== orderId);
      setDeliveredOrders(updatedOrders);
    
      updateDeliveredOrdersFromWaiter(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className='DeliveredOrders'>
      <MenuVerticalDelivered />
      <h2>Delivering Orders</h2>
      {deliveredOrders.length === 0 ? (
        <p>No delivered orders available</p>
      ) : (
        <ul>
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
                  <li className='products' key={product.product.id}>
                    {product.product.name} - Qty: {product.qty}
                  </li>
                ))}
              </ul> <br />
              <button className='Delivered' onClick={() => handleMarkAsDelivered(order.id)}>Delivered</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrdersList;
