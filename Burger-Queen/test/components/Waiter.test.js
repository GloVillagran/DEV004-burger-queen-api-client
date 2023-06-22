import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Waiter from '../../src/components/waiter/Waiter';
import { AuthContext } from '../../src/AuthContext'; //El contexto de autenticación 
import axios from 'axios';
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";


jest.mock('../../src/components/style.css/Waiter.css', () => ({

}));
jest.mock('../../src/components/style.css/MenuVerticalWaiter.css', () => ({

}));
jest.mock('../../src/components/style.css/alert.css', () => ({

}));
jest.mock('axios'); // Mockear el módulo axios para simular las peticiones

beforeEach(() => {
  jest.clearAllMocks(); // or jest.resetAllMocks();
});


describe('Waiter component', () => {

  test('render breakfast products', async () => {
    const expectedProducts = [
      { id: 1, name: 'Product 1', price: 10, type: 'Desayuno' },
      { id: 2, name: 'Product 2', price: 20, type: 'Desayuno' },
      { id: 3, name: 'Product 3', price: 30, type: 'Desayuno' }
    ];

    const expectedUser = {
      email: 'lucas@gmail.com',
      role: 'waiter',
      id: 6
    };

    axios.get.mockResolvedValue({ data: expectedProducts });

    render(
      <AuthContext.Provider value={{ token: 'dummy-token', user: expectedUser }}>
        <BrowserRouter>
        <Waiter />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('Client name'), { target: { value: 'pedro' } });
    fireEvent.click(screen.getByText('Breakfast'));

    // Asegurarse de que se realiza la petición GET correctamente
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      const firstProduct = screen.getByText('Product 1');
      const secondProduct = screen.getByText('Product 2');
      const thirdProduct = screen.getByText('Product 3');

      expect(firstProduct).toBeInTheDocument();
      expect(secondProduct).toBeInTheDocument();
      expect(thirdProduct).toBeInTheDocument();
    });


  });

  test('render lunch products', async () => {
    const expectedProducts = [
      { id: 1, name: 'Product 1', price: 10, type: 'Almuerzo' },
      { id: 2, name: 'Product 2', price: 20, type: 'Almuerzo' },
      { id: 3, name: 'Product 3', price: 30, type: 'Almuerzo' }
    ];

    const expectedUser = {
      email: 'lucas@gmail.com',
      role: 'waiter',
      id: 6
    };

    axios.get.mockResolvedValue({ data: expectedProducts });

    render(
      <AuthContext.Provider value={{ token: 'dummy-token', user: expectedUser }}>
        <BrowserRouter>
        <Waiter />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText('Lunch'));

    // Asegurarse de que se realiza la petición GET correctamente
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      const firstProduct = screen.getByText('Product 1');
      const secondProduct = screen.getByText('Product 2');
      const thirdProduct = screen.getByText('Product 3');

      expect(firstProduct).toBeInTheDocument();
      expect(secondProduct).toBeInTheDocument();
      expect(thirdProduct).toBeInTheDocument();
    });
  });

  test('should add product to cart', async () => {
    const expectedProducts = [
      { id: 1, name: 'Product 1', price: 10, type: 'Almuerzo' }
    ];

    const expectedUser = {
      email: 'lucas@gmail.com',
      role: 'waiter',
      id: 6
    };

    axios.get.mockResolvedValue({ data: expectedProducts });

    render(
      <AuthContext.Provider value={{ token: 'dummy-token', user: expectedUser }}>
        <BrowserRouter>
        <Waiter />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText('Lunch'));

    await waitFor(() => {
      //add two times
      fireEvent.click(screen.getByText('Add to Cart'));
      fireEvent.click(screen.getByText('Add to Cart'));
    });

    const sendOrder = screen.getByText("Send Order: $20")

    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('+'));

    await waitFor(() => {
      expect(screen.getByText("Send Order: $40")).toBeInTheDocument();
    })

    fireEvent.click(screen.getByText('-'));

    await waitFor(() => {
      expect(screen.getByText("Send Order: $30")).toBeInTheDocument();
    })

    axios.post.mockResolvedValue({});
    fireEvent.click(sendOrder);

    //volvemos al menu todo vacio
    fireEvent.click(screen.getByText('Back to Menu'))

    await waitFor(() => {
      expect(screen.getByText("No items in the cart.")).toBeInTheDocument();
    })
  })


  test('should remove product to cart', async () => {
    const expectedProducts = [
      { id: 1, name: 'Product 1', price: 10, type: 'Almuerzo' }
    ];

    const expectedUser = {
      email: 'lucas@gmail.com',
      role: 'waiter',
      id: 6
    };

    axios.get.mockResolvedValue({ data: expectedProducts });

    render(
      <AuthContext.Provider value={{ token: 'dummy-token', user: expectedUser }}>
        <BrowserRouter>
        <Waiter />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText('Lunch'));

    await waitFor(() => {
      //add two times
      fireEvent.click(screen.getByText('Add to Cart'));
    });

    expect(screen.getByText("Send Order: $10")).toBeInTheDocument();
    fireEvent.click(screen.getByText('Remove'));

    await waitFor(() => {
      expect(screen.getByText("No items in the cart.")).toBeInTheDocument();
    })

  })

  test('render logout', async () => {
   
    const logout = jest.fn()

    const expectedUser = {
      email: 'lucas@gmail.com',
      role: 'waiter',
      id: 6
    };


    render(
      <AuthContext.Provider value={{ token: 'dummy-token', user: expectedUser, logout }}>
        <BrowserRouter>
        <Waiter />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    fireEvent.click(screen.getByText('LOGOUT'));

    // Asegurarse de que se realiza la petición GET correctamente
    await waitFor(() => {
      expect(logout).toHaveBeenCalledTimes(1)
    });


  });

});




