import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import MenuVerticalChef from './MenuVerticalChef';
import { AuthContext } from '../../AuthContext';
import Alert from '../Alert';
import '../style.css/chef.css';

function OrdersChef() {
  const { token } = useContext(AuthContext);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertCancel, setShowAlertCancel] = useState(false);
  
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
       


      } else {
        setPendingOrders([]);
      }
    } catch (error) {
      console.error('Error getting pending orders:', error);
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
      console.error('Error getting orders delivered:', error);
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
      setShowAlert(true);
    } catch (error) {
      console.error('Error sending the order:', error);
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
      setShowAlertCancel(true);
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
    setShowAlert(false); // Agrega esta línea para ocultar el mensaje de alerta
    setShowAlertCancel(false);
  };
  

  // Función para ocultar el mensaje de alerta
  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="Chef">
      <MenuVerticalChef />
      <div className='contentChef'>
        <section className='buttonsChef'>
          <button className="pending" data-testid="pending-order" onClick={() => setDisplayedSection('pending')}>
            Pending Order
          </button>
          <button className="delivered" data-testid="delivering" onClick={handleOrderDelivered}>
            Order Delivering
          </button>
        </section>

        {displayedSection === 'pending' && (
          <ul className='pedidosdelivered'>
            {pendingOrders.map((order) => (
              <li className="pedidosPending" key={order.id}>
                <div className='datosClient'>
                  <h4 >Order ID: {order.id} Client: {order.client}</h4>
                </div>
                <div>
                  <span className="order-label">Date of admission:</span> {order.dateEntry}
                </div>
                <div className='productsChef'>
                  <ul>
                    {order.products?.map((item, index) => (
                      <li key={index}>
                        {item.product.name} ({item.qty})
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='chefButtons' >
                  <button className="buttonSend" data-testid="send" onClick={() => handleSendOrder(order.id)}>
                    Send
                  </button>
                  <button className="buttonCancel" onClick={() => handleCancelOrder(order.id)}>
                    Cancel
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {displayedSection === 'delivered' && (
          <ul className='pedidosdelivered'>
            {deliveredOrders.map((order) => {
              // Formatear la fecha y hora
              const formattedDateEntry = new Date(order.dateEntry).toLocaleString();
              const formattedDateTime = new Date(order.dateProcessed).toLocaleString();

              return (
                <li className="pedidosPending" key={order.id}>
                  <div className='datosClient'>
                    <h4 >Order ID: {order.id} Client: {order.client}</h4>
                  </div>
                  <div>
                    <span className="order-label">Date of admission:</span> {order.dateEntry}
                  </div>
                  <div className='date'>
                    <p >Date of admission:</p> {formattedDateEntry}
                    <p >Departure date:</p> {formattedDateTime}
                  </div>
                  <div className='productsChef'>
                    <ul className='productsChef'>
                      {order.products.map((item, index) => (
                        <li key={index}>
                          {item.product.name} ({item.qty})
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>


              );
            })}
          </ul>
        )}
        {showAlert && (
          <Alert type="success" message="Order Completed" onClose={hideAlert} />
        )}
         {showAlertCancel && (
          <Alert type="success" message="Order Cancelled" onClose={hideAlert} />
        )}
      </div>
    </div>
  );
}

export default OrdersChef;
