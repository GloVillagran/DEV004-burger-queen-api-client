import React from 'react';

function CartSummary({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clientName, sendOrder, backToMenu}) {
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <div className="Cart">
      <div>
        <h3 className='CartSummary'>Cart Summary</h3>
        {clientName && <p>Client Name: {clientName}</p>}
      </div>
      <div className="cart-products">
        {cart.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          <>
            {cart.map((product, index) => (
              <div key={index} className="cart-item">
                <section className="item-info">
                  <h4 className='name'>{product.name}</h4>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                    <div className="button-group">
                      <button onClick={() => increaseQuantity(product)}>+</button>
                      <button onClick={() => decreaseQuantity(product)}>-</button>
                    </div>
                    <button onClick={() => removeFromCart(product)}>Remove</button>
                  </section>
              </div>
            ))}
            <button className='Send' onClick={sendOrder}>Send Order: ${calculateTotal()}</button>
            <h4 onClick={backToMenu}>Back to Menu</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default CartSummary;
