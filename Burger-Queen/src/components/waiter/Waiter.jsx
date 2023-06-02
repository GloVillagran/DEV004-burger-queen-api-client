import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import MenuVertical from '../MenuVertical';
import '../style.css/waiter.css'
import CartSummary from './CartSummary';



function Waiter() {
  const { token, user } = useContext(AuthContext); // Acceder al token de autenticación desde el contexto
  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);
  
  const [selectedMenu, setSelectedMenu] = useState(''); // Estado para controlar el menú seleccionado
  const [cart, setCart] = useState([]); //Mantiene la lista de productos seleccionados en el carrito
  const [order, setOrder] = useState([]) //almacena la orden
  const [userId, setUserId] = useState(''); // Estado para almacenar el ID del waiter
  const [pendingOrders, setPendingOrders] = useState([]); //almacena la lista de pedidos pendientes


  useEffect(() => {
    /* fetchProducts, esta función realiza la solicitud GET a la API utilizando Axios 
    y el token de autenticación proporcionado en el contexto. Sin embargo, antes de llamar a fetchProducts, 
    se verifica si el token existe.  */
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products', {
          headers: {
            Authorization: `Bearer ${token}` // Reemplaza con tu token de autenticación
          }
        });
        console.log(response.data); // Verificar los datos de la respuesta en la consola
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchProducts();
    }
    if (user && user.id) {
      setUserId(user.id);
    }
  }, [token, user]);

  function handleClick(e, menu) {
    e.preventDefault();
    setSelectedMenu(menu);
  }

  //funcion que agrega productos al carrito
  function handleAddToCart(product) {
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(product) {
    const updatedCart = cart.filter((p) => p.id !== product.id);
    setCart(updatedCart);
  }

  function increaseQuantity(product) {
    const updatedCart = cart.map((p) =>
      p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
    );
    setCart(updatedCart);
  }

  function decreaseQuantity(product) {
    const updatedCart = cart.map((p) =>
      p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
    );
    setCart(updatedCart.filter((p) => p.quantity > 0));
  }

  function calculateTotal() {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  async function handleSendOrder() {
    const newOrder = {
      userId: userId,
      client: name,
      products: cart,
    
      total: calculateTotal(),
      date: new Date().toISOString(),
      status: 'pending' 
    };
    setOrder(newOrder);

    try {
      const response = await axios.post('http://localhost:8080/orders', newOrder, {
        headers: {
          Authorization: `Bearer ${token}` // Reemplaza con tu token de autenticación
        }
      });
      console.log(response.data); // Verifica la respuesta del servidor en la consola

      // Agregar el nuevo pedido a la lista de pedidos pendientes
  setPendingOrders([...pendingOrders, response.data]);

    } catch (error) {
      console.error(error);
      // Maneja el error, por ejemplo, mostrando una notificación de error al usuario.
    }
  }
  //limpia la carta
  function handleBackToMenu() {
    setCart([]);
    setName('');
  }

  return (
    <div className="Waiter">
      <MenuVertical />
      <div className="content">
        <button
          onClick={(e) => handleClick(e, 'Desayuno')}
          className={`breakfast ${selectedMenu === 'Desayuno' ? 'active' : ''}`}
        >
          Breakfast
        </button>

        <button
          onClick={(e) => handleClick(e, 'Almuerzo')}
          className={`lunch ${selectedMenu === 'Almuerzo' ? 'active' : ''}`}
        >
          Lunch
        </button>

        <input
          type="email"
          id="name"
          placeholder="Client name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h3 className="options">Options</h3>

        {selectedMenu === 'Desayuno' && (
          <>
            {products &&
              products
                .filter((product) => product.type === 'Desayuno')
                .map((product, productIndex) => (
                  <div key={productIndex} className="product">
                    <h2>
                      <i>{product.name}</i>
                    </h2>
                    <img src={product.image} alt={product.name} />
                    <p>Price: ${product.price}</p>
                    <button className='addToCart' onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                ))}
          </>
        )}

        {selectedMenu === 'Almuerzo' && (
          <>
            {products &&
              products
                .filter((product) => product.type === 'Almuerzo')
                .map((product, productIndex) => (
                  <div key={productIndex} className="product">
                    <h2>
                      <i className='nameProduct'>{product.name}</i>
                    </h2>
                    <img src={product.image} alt={product.name} />
                    <p>Price: ${product.price}</p>
                    <button className='addToCart' onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                ))}
          </>
        )}
      </div>
      {/* Se le pasa los props al componente para que pueda acceder a los productos del carrito, agregar y eliminar */}
      <CartSummary
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clientName={name}
        sendOrder={handleSendOrder}
        backToMenu={handleBackToMenu}
      />
     
    </div>
  );
}

export default Waiter;









