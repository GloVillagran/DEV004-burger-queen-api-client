
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import WorkersList from '../../src/components/admin/WorkersList';
import EditWorker from '../../src/components/admin/EditWorker';
import { AuthContext } from '../../src/AuthContext';
import { BrowserRouter } from "react-router-dom";


jest.mock('../../src/components/style.css/MenuVerticalWaiter.css', () => ({

}));

jest.mock('../../src/components/style.css/alert.css', () => ({

}));
jest.mock('../../src/components/style.css/modalWorkers.css', () => ({

}));
jest.mock('../../src/components/style.css/tables.css', () => ({

}));

jest.mock('axios');



describe('WorkersList', () => {
  beforeEach(() => {
    axios.get.mockClear();
    axios.patch.mockClear();
    axios.delete.mockClear();
  });

  test('renders the list of workers', async () => {
    const mockWorkers = [
      { id: 1, email: 'worker1@example.com', role: 'admin' },
      { id: 2, email: 'worker2@example.com', role: 'user' },
    ];

    const expectedUser = {
      email: 'hugo@gmail.com',
      role: 'admin',
      id: 6
    };


    axios.get.mockResolvedValue({ data: mockWorkers });

    render(
      <AuthContext.Provider value={{ token: 'dummy-token', user: expectedUser }}>
        <BrowserRouter>
          <WorkersList />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('worker1@example.com')).toBeInTheDocument()
      expect(screen.getByText('worker2@example.com')).toBeInTheDocument()
    })

  })
 
  test.only('render Delete Worker', async () => {
    const mockWorkers = [
      { id: 1, email: 'worker1@example.com', role: 'admin' },
      { id: 2, email: 'worker2@example.com', role: 'user' },
    ];

    const expectedUser = {
      email: 'hugo@gmail.com',
      role: 'admin',
      id: 6
    };


    axios.get.mockResolvedValue({ data: mockWorkers });

    render(
      <AuthContext.Provider value={{ token: 'dummy-token', user: expectedUser }}>
        <BrowserRouter>
          <WorkersList />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('worker1@example.com')).toBeInTheDocument()
      expect(screen.getByText('worker2@example.com')).toBeInTheDocument()
    })

    axios.delete.mockResolvedValue({})
    fireEvent.click(screen.getByText('Delete'));
    
    await waitFor(() => {
       expect(screen.getByText('Deleted worker')).toBeInTheDocument()
    });
  })
 

test('close modal', () => {
  // Arrange
  const closeModal = jest.fn();
  const updateWorker = jest.fn();
  const worker = { id: '1', email: 'worker@example.com', role: 'admin', password: 'password' };

  render(
    <EditWorker isOpen={true} worker={worker} closeModal={closeModal} updateWorker={updateWorker} />
  );

  // Act
  const cancelButton = screen.getByText('Cancel');
  fireEvent.click(cancelButton);

  // Assert
  expect(closeModal).toHaveBeenCalledTimes(1);
});


/* 
  test.only('opens the modal when clicking on the edit button', async () => {
    const mockWorkers = [{ workerid: 1, email: 'worker1@example.com', role: 'Role1' }];

    const expectedUser = {
      email: 'hugo@gmail.com',
      role: 'admin',
      id: 6
    };

    axios.get.mockResolvedValueOnce({ data: mockWorkers });


    render(
      <AuthContext.Provider value={{ token: 'dummy-token', user: expectedUser }}>
        <BrowserRouter>
          <WorkersList />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    // Obtener el botón de edición
    fireEvent.click(screen.getByText('Edit')); 
    await waitFor(() => {
      expect(screen.getByText('modal')).toBeInTheDocument()
    });

  
  });

  test('closes the modal when calling the closeModal function', async () => {
    const mockWorkers = [{ id: 1, email: 'worker1@example.com', role: 'Role1' }];
    axios.get.mockResolvedValueOnce({ data: mockWorkers });

    render(<WorkersList />);

    // Obtener el botón de edición
    const editButton = await screen.findByText('Edit');
    fireEvent.click(editButton);

    // Obtener el botón de cierre del modal
    const closeButton = await screen.findByTestId('close-button');
    fireEvent.click(closeButton);

    // Verificar que el modal esté cerrado
    const modal = screen.queryByTestId('modal');
    expect(modal).not.toBeInTheDocument();
  }); */

  
});
 