import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../src/components/Login';
import { AuthContext, AuthProvider } from '../../src/AuthContext'
import axios from 'axios';
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";



jest.mock('axios');
jest.mock('../../src/assets/img/2.png', () => 'logo.png');

beforeEach(() => {
  jest.clearAllMocks(); // or jest.resetAllMocks();
});

test('successfull login waiter', async () => {
  const expectedData = {
    data: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1Z29AZ21haWwuY29tIiwiaWF0IjoxNjg3MTgzMjgzLCJleHAiOjE2ODcxODY4ODMsInN1YiI6IjEifQ.amshTufBIlLAZWk4r_PfCEth7rjf4yOaaTCQsG7e4-4',
      user: { email: 'lucas@gmail.com', role: 'waiter', id: 6 }
    }
  }

  axios.post.mockResolvedValue(expectedData);

  render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  );

  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');

  // fireEvent: Disparar eventos DOM.
  // https://testing-library.com/docs/dom-testing-library/api-events/
  fireEvent.change(emailInput, { target: { value: 'lucas@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });
  // getByText accederá a elementos basados en el texto visible para el usuario.
  fireEvent.click(screen.getByText('LOGIN'));

  await waitFor(() => {
    // Código para interactuar y verificar los datos asincrónicos
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      email: 'lucas@gmail.com',
      password: '123456',
    });
    expect(window.location.href).toBe('http://localhost/waiter');
  });
  
});


test('successfull login admin', async () => {
  const expectedData = {
    data: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1Z29AZ21haWwuY29tIiwiaWF0IjoxNjg3MTgzMjgzLCJleHAiOjE2ODcxODY4ODMsInN1YiI6IjEifQ.amshTufBIlLAZWk4r_PfCEth7rjf4yOaaTCQsG7e4-4',
      user: { email: 'lucas@gmail.com', role: 'admin', id: 6 }
    }
  }

  axios.post.mockResolvedValue(expectedData);

  render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  );

  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');

  // fireEvent: Disparar eventos DOM.
  // https://testing-library.com/docs/dom-testing-library/api-events/
  fireEvent.change(emailInput, { target: { value: 'lucas@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });
  // getByText accederá a elementos basados en el texto visible para el usuario.
  fireEvent.click(screen.getByText('LOGIN'));

  await waitFor(() => {
    // Código para interactuar y verificar los datos asincrónicos
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      email: 'lucas@gmail.com',
      password: '123456',
    });
    console.log(window.location.href)
    expect(window.location.href).toBe('http://localhost/admin');
    console.log("waitFor")
  });
});

test('successfull login chef', async () => {
  const expectedData = {
    data: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1Z29AZ21haWwuY29tIiwiaWF0IjoxNjg3MTgzMjgzLCJleHAiOjE2ODcxODY4ODMsInN1YiI6IjEifQ.amshTufBIlLAZWk4r_PfCEth7rjf4yOaaTCQsG7e4-4',
      user: { email: 'lucas@gmail.com', role: 'chef', id: 6 }
    }
  }

  axios.post.mockResolvedValue(expectedData);

  render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  );

  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');

  // fireEvent: Disparar eventos DOM.
  // https://testing-library.com/docs/dom-testing-library/api-events/
  fireEvent.change(emailInput, { target: { value: 'lucas@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });
  // getByText accederá a elementos basados en el texto visible para el usuario.
  fireEvent.click(screen.getByText('LOGIN'));

  await waitFor(() => {
    // Código para interactuar y verificar los datos asincrónicos
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      email: 'lucas@gmail.com',
      password: '123456',
    });
    console.log(window.location.href)
    expect(window.location.href).toBe('http://localhost/chef');
    console.log("waitFor")
  });
});

test('error login role', async () => {
  const expectedData = {
    data: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1Z29AZ21haWwuY29tIiwiaWF0IjoxNjg3MTgzMjgzLCJleHAiOjE2ODcxODY4ODMsInN1YiI6IjEifQ.amshTufBIlLAZWk4r_PfCEth7rjf4yOaaTCQsG7e4-4',
      user: { email: 'lucas@gmail.com', role: 'fake', id: 6 }
    }
  }

  axios.post.mockResolvedValue(expectedData);

  render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  );

  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');

  // fireEvent: Disparar eventos DOM.
  // https://testing-library.com/docs/dom-testing-library/api-events/
  fireEvent.change(emailInput, { target: { value: 'lucas@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });
  // getByText accederá a elementos basados en el texto visible para el usuario.
  fireEvent.click(screen.getByText('LOGIN'));

  await waitFor(() => {
    // Código para interactuar y verificar los datos asincrónicos
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      email: 'lucas@gmail.com',
      password: '123456',
    });

    expect(screen.getByText('Error login')).toBeDefined()
  });
});

test('error login', async () => {
  const expectedData = {
    response: {
      data: 'Invalid credentials',
    }
  }

  axios.post.mockRejectedValue(expectedData);

  render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  );

  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password')

  expect(emailInput).toBeDefined();
  expect(passwordInput).toBeDefined();

  fireEvent.change(emailInput, { target: { value: 'lucaas@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });
  fireEvent.click(screen.getByText('LOGIN'));

  await waitFor(() => {
    expect(screen.getByText('Invalid credentials')).toBeDefined()
    console.log('invalid test')
  });
});

test('error login unexpected', async () => {
  const expectedData = {
    error: "unexpected error"
  }

  axios.post.mockRejectedValue(expectedData);

  render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  );

  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password')

  expect(emailInput).toBeDefined();
  expect(passwordInput).toBeDefined();

  fireEvent.change(emailInput, { target: { value: 'lucaas@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });
  fireEvent.click(screen.getByText('LOGIN'));

  await waitFor(() => {
    expect(screen.getByText('Error login')).toBeDefined()
  });
});