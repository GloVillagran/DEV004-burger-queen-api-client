import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import MenuVerticalWaiter from './MenuVerticalWaiter';
import '../style.css/waiter.css';
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
        const response = await axios.get('https://json-server-beta-mauve.vercel.app/products', {
          headers: {
            Authorization: `Bearer ${token}` // Reemplaza con tu token de autenticación
          }
        });
        
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

  function clickButtons(e, menu) {
    //Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento.
    e.preventDefault();
    setSelectedMenu(menu);
  }

  //funcion que agrega productos al carrito
  function handleAddToCart(product) {
    // se busca en el carrito (cart) si ya existe un producto con el mismo id que el producto que queremos agregar. 
    const existingProduct = cart.find((p) => p.id === product.id);

    // verifica existingProduct tiene un valor o es undefined. 
    if (existingProduct) {
      
      /* se utiliza el método map en el array cart para crear un nuevo array updatedCart que será una copia del carrito original, 
      pero con la cantidad actualizada del producto que ya estaba en el carrito.  */
      const updatedCart = cart.map((p) =>
      /* Si son iguales, creamos un nuevo objeto con los mismos atributos (...p) pero incrementamos la cantidad en 1 */
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setCart(updatedCart); // actualizamos el estado del carrito utilizando la función setCart y le pasamos el nuevo array updatedCart
    
    } else { /*setCart para actualizar el estado del carrito. Creamos un nuevo array utilizando [...cart] 
      para copiar los productos existentes en el carrito y luego agregamos el nuevo producto */
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(product) {
    const updatedCart = cart.filter((p) => p.id !== product.id);
    setCart(updatedCart);
  }

  // aumentar la cantidad de un producto
  function increaseQuantity(product) {
    const updatedCart = cart.map((p) =>
      p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
    );
    setCart(updatedCart);
  }

  // disminuir la cantidad de un producto 
  function decreaseQuantity(product) {
    const updatedCart = cart.map((p) =>
      p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
    );
   /*  Luego, utilizamos para filtrar el array updatedCart y eliminar cualquier producto que tenga 
    una cantidad menor o igual a cero.  */
    setCart(updatedCart.filter((p) => p.quantity > 0));
  }

  // el método reduce en el array cart para sumar el precio de cada producto multiplicado por su cantidad. 0 valor inicial
  function calculateTotal() {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  async function handleSendOrder() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const newOrder = {
      userId: userId,
      client: name,
      products: cart.map((product) => ({
        qty: product.quantity,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          type: product.type,
          dateEntry: `${formattedDate} ${formattedTime}` 
        }
      })),
      total: calculateTotal(), // Agregar el total utilizando la función calculateTotal
      status: 'pending',
      dateEntry: `${formattedDate} ${formattedTime}`
    };
    setOrder(newOrder);

    try {
      const response = await axios.post('https://json-server-beta-mauve.vercel.app/orders', newOrder, {
        headers: {
          Authorization: `Bearer ${token}` // Reemplaza con tu token de autenticación
        }
      });
      //console.log(response.data); // Verifica la respuesta del servidor en la consola

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
      <MenuVerticalWaiter /> 
      <div className="content">
        
      <input
          type="text"
          id="name"
          placeholder="Client name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> 
      <div className='options'>
        <button
          onClick={(e) => clickButtons(e, 'Desayuno')}
          className={`breakfast ${selectedMenu === 'Desayuno' ? 'active' : ''}`}
        >
          Breakfast
        </button>
        <button
          onClick={(e) => clickButtons(e, 'Almuerzo')}
          className={`lunch ${selectedMenu === 'Almuerzo' ? 'active' : ''}`}
        >
          Lunch
        </button> 
        </div>
        
        {/* <h3 className="options">Options</h3> */}

        {selectedMenu === 'Desayuno' && (
          <div className='waiter-products'>
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
          </div>
        )}

        {selectedMenu === 'Almuerzo' && (
            <div className='waiter-products'>
          <>
            {products &&
              products
                .filter((product) => product.type === 'Almuerzo')
                .map((product, productIndex) => (
                  <div key={productIndex} className="product">
                    <h2>
                      <i >{product.name}</i>
                    </h2>
                    <img src={product.image} alt={product.name} />
                    <p>Price: ${product.price}</p>
                    <button className='addToCart' onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                ))}
          </>
          </div>
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









