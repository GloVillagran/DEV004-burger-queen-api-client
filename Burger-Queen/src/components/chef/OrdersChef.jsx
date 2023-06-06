import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import MenuVertical from '../MenuVertical';
import { AuthContext } from '../../AuthContext';
import '../style.css/chef.css';

function OrdersChef() {
  const { token } = useContext(AuthContext);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  // Controla qué sección de pedidos se muestra en función del botón presionado
  const [displayedSection, setDisplayedSection] = useState(null);

  // Función para obtener los pedidos pendientes
  const fetchPendingOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/orders?status=pending', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response && response.data) {
        setPendingOrders(response.data);
        console.log(response.data)


      } else {
        setPendingOrders([]);
      }
    } catch (error) {
      console.error('Error al obtener los pedidos pendientes:', error);
    }
  };

  // realiza la solicitud a la API y actualiza el estado con los pedidos entregados. 
  const fetchDeliveredOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/orders?status=delivered', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response && response.data) {
        setDeliveredOrders(response.data);
      } else {
        setDeliveredOrders([]);
      }
    } catch (error) {
      console.error('Error al obtener los pedidos entregados:', error);
    }
  };

  // Efecto para obtener los pedidos pendientes al cargar la página
  useEffect(() => {
    fetchPendingOrders();
    fetchDeliveredOrders();
  }, [token]);

  // realiza la solicitud PATCH para actualizar el campo dateProcessed al enviar un pedido.
  const sendOrder = async (orderId) => {
    try {
      await axios.patch(
        `http://localhost:8080/orders/${orderId}`,
        { dateProcessed: new Date().toISOString(), status: 'delivered' },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Volver a obtener los pedidos pendientes y listos después de enviar un pedido
      fetchPendingOrders();
      fetchDeliveredOrders();
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
    }
  };

  // Función para cancelar un pedido(debo ocupar delete revisar y cambiar)
  const cancelOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:8080/orders/${orderId}`, { status: 'cancelled' }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Volver a obtener los pedidos pendientes después de cancelar un pedido
      fetchPendingOrders();
    } catch (error) {
      console.error('Error al cancelar el pedido:', error);
    }
  };

  // Función para manejar el clic en el botón "Send"
  const handleSendOrder = (orderId) => {
    sendOrder(orderId);
  };

  // Función para manejar el clic en el botón "Cancel"
  const handleCancelOrder = (orderId) => {
    cancelOrder(orderId);
  };

  // Función para manejar el clic en el botón "Order delivered"
  const handleOrderDelivered = () => {
    fetchDeliveredOrders();
    setDisplayedSection('delivered');
  };

  return (
    <div className="Chef">
      <MenuVertical />
      <section>
        <button className="pending" onClick={() => setDisplayedSection('pending')}>
          Pending Order
        </button>
        <button className="delivered" onClick={handleOrderDelivered}>
          Order delivered
        </button>
      </section>

      {displayedSection === 'pending' && (
        <ul>
          {pendingOrders.map((order) => (
            <li className="pedidos" key={order.id}>
              <div>
                <span className="order-label">Order ID:</span> {order.id}
              </div>
              <div>
                <span className="order-label">Client:</span> {order.client}
              </div>
              <div>
                <span className="order-label">Date Entry:</span> {order.dateEntry}
              </div>
              <div>
                <span className="order-label">Products:</span>
                <ul>
                  {order.products.map((item, index) => (
                    <li key={index}>
                      {item.product.name} ({item.qty})
                    </li>
                  ))}
                </ul>
              </div>

              <button className="buttonSend" onClick={() => handleSendOrder(order.id)}>
                Send
              </button>
              <button className="buttonCancel" onClick={() => handleCancelOrder(order.id)}>
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    
    {displayedSection === 'delivered' && (
  <ul>
    {deliveredOrders.map((order) => {
      // Formatear la fecha y hora
      const formattedDateTime = new Date(order.dateProcessed).toLocaleString();

      return (
        <li className="pedidos" key={order.id}>
          <div>
            <span className="order-label">Order ID:</span> {order.id}
          </div>
          <div>
            <span className="order-label">Client:</span> {order.client}
          </div>
          <div>
            <span className="order-label">Date/Time Ready:</span> {formattedDateTime}
          </div>
          <div>
            <span className="order-label">Products:</span>
            {order.products && order.products.length > 0 ? (
              <ul>
                {order.products.map((item, index) => (
                  <li key={index}>
                    {item.product.name} ({item.qty})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </li>
      );
    })}
  </ul>
)}
    </div>
  );
}

export default OrdersChef;
