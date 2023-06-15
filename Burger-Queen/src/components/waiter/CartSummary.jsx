import { useState } from 'react';
import Alert from '../Alert'

function CartSummary({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clientName, sendOrder, backToMenu}) {
  const [showAlert, setShowAlert] = useState(false);
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleSendOrder = () => {
    sendOrder();
    setShowAlert(true);
  };

  const handleBackToMenu = () => {
    setShowAlert(false);
    backToMenu();
  };


  return (
    <div className="Cart">
      <div>
        <h3 className='CartSummary'>Cart Summary</h3>
        {clientName && <p className="clientName">Client Name: {clientName}</p>}
      </div>
      <div className="cart-products">

     {/*  Se utiliza una expresión condicional para verificar si el carrito está vacío. Si la longitud del carrito es igual a cero,
       se muestra el mensaje "No items in the cart.". De lo contrario, se renderiza el contenido del carrito. */}
        {cart.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          <>
          {/* el método map en el array cart para iterar sobre cada producto */}
            {cart.map((product, index) => (
              /* Se utiliza el (index) como clave (key) para identificar de manera única cada elemento en la lista. */
              <div key={index} className="cart-item">
                <section className="item-info">
                  <h4 className='name'>{product.name}</h4>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                    <div className="button-group">
                      <button className="increaseQuantity" onClick={() => increaseQuantity(product)}>+</button> 
                      {/* llama a la función increaseQuantity. Se pasa el producto como argumento a la función. */}

                      <button className="decreaseQuantit" onClick={() => decreaseQuantity(product)}>-</button>
                    </div>
                    <button className="removeFromCart" onClick={() => removeFromCart(product)}>Remove</button>
                  </section>
              </div>
            ))}
            <button className='Send' onClick={handleSendOrder}>Send Order: ${calculateTotal()}</button>
           
            <h4 onClick={handleBackToMenu}>Back to Menu</h4>
          </>
        )}
          {showAlert && <Alert type="success" message="Order sent to kitchen" />}
      </div>
    </div>
  );
}

export default CartSummary;

