import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../src/components/Login';
import { AuthContext } from '../../src/AuthContext'
import axios from 'axios';


jest.mock('react-router-dom'); 

jest.mock('axios');
jest.mock('../../src/assets/img/2.png', () => 'logo.png');


test('successfull login', async () => {
  const login = jest.fn();

  const expectedData = {
    data: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdsb3JpYUBnbWFpbC5jb20iLCJpYXQiOjE2ODU5MzQ5OTIsImV4cCI6MTY4NTkzODU5Miwic3ViIjoiMyJ9.7OhSuaSO2Av37OpTtoFsvM8aot4HqDwjd3jQQR5ffL8',
      user: { email: 'gloria@gmail.com', role: 'waiter', id: 3 }
    }
  }

  axios.post.mockResolvedValue(expectedData);

  render(
    <AuthContext.Provider value={{ login }} >
      <Login />
    </AuthContext.Provider>
  );
  
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password')

  expect(emailInput).toBeDefined();
  expect(passwordInput).toBeDefined();

  // fireEvent: Disparar eventos DOM.
  // https://testing-library.com/docs/dom-testing-library/api-events/
  fireEvent.change(emailInput, { target: { value: 'gloria@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });
  // getByText accederá a elementos basados en el texto visible para el usuario.
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    // Código para interactuar y verificar los datos asincrónicos
    // asegurarse de que se llamó a una función simulada con argumentos específicos
    expect(login).toHaveBeenCalledWith(expectedData.data)
  });
});

test('error login', async () => {
  const login = jest.fn();

  const expectedData = {
    response: {
      data: 'Invalid credentials',
    }
  }

  axios.post.mockRejectedValue(expectedData);

  render(
    <AuthContext.Provider value={{ login }} >
      <Login />
    </AuthContext.Provider>
  );

  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password')

  expect(emailInput).toBeDefined();
  expect(passwordInput).toBeDefined();

  fireEvent.change(emailInput, { target: { value: 'gloria@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
     expect(login).not.toHaveBeenCalled()
     expect(screen.getByText('Invalid credentials')).toBeDefined()
  });
});