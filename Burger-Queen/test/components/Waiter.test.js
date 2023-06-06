import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Waiter from '../../src/components/waiter/Waiter';
import { AuthContext } from '../../src/AuthContext'; //El contexto de autenticación 
import axios from 'axios';
import CartSummary from '../../src/components/waiter/CartSummary';


jest.mock('../../src/components/style.css/Waiter.css', () => ({

}));
jest.mock('../../src/components/style.css/MenuVertical.css', () => ({

}));

jest.mock('axios'); // Mockear el módulo axios para simular las peticiones

jest.mock('axios');

describe('Waiter component', () => {
  test('renders Waiter component', async () => {
    const waiter = jest.fn();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdsb3JpYUBnbWFpbC5jb20iLCJpYXQiOjE2ODYwMTc5MDgsImV4cCI6MTY4NjAyMTUwOCwic3ViIjoiMyJ9.36LuwIClqChPtpjxH7wI-ogV86IBANT4JKHhghb23Gk';
    const user = {
      email: 'gloria@gmail.com',
      id: 3,
      role: 'waiter'
    };

    axios.get.mockResolvedValue({ data: [] }); // Mockear la respuesta de la petición GET

    render(
      <AuthContext.Provider value={{ token, user, waiter }}>
        <Waiter />
      </AuthContext.Provider>
    );

    // Asegurarse de que se realiza la petición GET correctamente
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  });
});


test('selects menu on button click', async () => {
  // Mockear el valor del contexto AuthContext
  const mockAuthContextValue = {
    token: 'mock-token',
    user: { id: 1 }
  };

  axios.get.mockResolvedValue({ data: [] }); // Mockear la respuesta de la petición GET

  render(
    <AuthContext.Provider value={mockAuthContextValue}>
      <Waiter />
    </AuthContext.Provider>
  );

  // Asegurarse de que se realiza la petición GET correctamente
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));

  fireEvent.click(screen.getByText('Breakfast'));
  // Realizar las afirmaciones necesarias
  /* expect(screen.getByText('Options')).toBeInTheDocument();
  expect(screen.queryByText('Lunch')).not.toBeInTheDocument(); */
});


test('should add a product to the cart', () => {
  const mockAuthContextValue = {
    token: 'mock-token',
    user: { id: 1 }
  };

  axios.get.mockResolvedValue({ data: [] });


  render(
    <AuthContext.Provider value={mockAuthContextValue}>
      <Waiter />
    </AuthContext.Provider>
  );

  waitFor(() => {
    const addToCartButton = screen.getByText('Add to Cart');
    // Realiza las aserciones aquí

    // Simula un clic en el botón "Add to Cart"
    fireEvent.click(addToCartButton);
    // Verifica que el producto se haya agregado al carrito
    const cartItems = screen.getAllByTestId('cart-item');
    expect(cartItems).toHaveLength(1); // Verifica que haya un solo elemento en el carrito

    const productName = screen.getByText('Product Name');
    const productPrice = screen.getByText('$10.99');

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();

  });

});

test('should calculate the total price correctly', () => {
  const mockAuthContextValue = {
    token: 'mock-token',
    user: { id: 1 }
  };

  axios.get.mockResolvedValue({ data: [] });


  render(
    <AuthContext.Provider value={mockAuthContextValue}>
      <Waiter />
    </AuthContext.Provider>
  );

    // Encuentra el botón "Add to Cart" y simula varios clics para agregar productos al carrito
    waitFor(() => {
      const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);
    fireEvent.click(addToCartButton);
    fireEvent.click(addToCartButton);

    // Encuentra los botones para aumentar y disminuir la cantidad del producto
    const increaseButton = screen.getByText('+');
    const decreaseButton = screen.getByText('-');

    // Simula clics en los botones para aumentar y disminuir la cantidad del producto
    fireEvent.click(increaseButton);
    fireEvent.click(decreaseButton);

    // Verifica que el total del precio se haya calculado correctamente
    const totalElement = screen.getByTestId('total-price');
    expect(totalElement).toHaveTextContent('$33.00'); // Reemplaza con el total esperado después de los cálculos

    
  // verificar que los precios individuales y las cantidades sean correctos
    const priceElement = screen.getByTestId('product-price');
    const quantityElement = screen.getByTestId('product-quantity');

    expect(priceElement).toHaveTextContent('$11.00'); // Reemplaza con el precio individual esperado
    expect(quantityElement).toHaveTextContent('2'); // Reemplaza con la cantidad esperada
  });

});

// test componente CartSummar
describe('CartSummary', () => {
  test('should call sendOrder when "Send Order" button is clicked', async () => {
    // Arrange
    const cart = [
      { id: 1, name: 'Product 1', price: 10, quantity: 2 },
      { id: 2, name: 'Product 2', price: 15, quantity: 1 },
    ];
    const removeFromCart = jest.fn();
    const increaseQuantity = jest.fn();
    const decreaseQuantity = jest.fn();
    const clientName = 'John Doe';
    const sendOrder = jest.fn();
    const backToMenu = jest.fn();

    render(
      <CartSummary
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clientName={clientName}
        sendOrder={sendOrder}
        backToMenu={backToMenu}
      />
    );

    // Act
    fireEvent.click(await waitFor(() => screen.getByRole('button', { name: /Send Order/i })));
  

    // Assert
    expect(sendOrder).toHaveBeenCalledTimes(1);
  });
});
