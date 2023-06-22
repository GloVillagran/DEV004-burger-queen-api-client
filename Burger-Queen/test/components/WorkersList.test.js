
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import WorkersList from '../../src/components/admin/WorkersList';
import EditWorker from '../../src/components/admin/EditWorker';
import { AuthContext } from '../../src/AuthContext';
import { BrowserRouter } from "react-router-dom";
import Modal from 'react-modal';


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
 
  test('render Delete Worker', async () => {
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
    axios.get.mockResolvedValue({})
    fireEvent.click(screen.getAllByText('Delete')[0]);

    
    await waitFor(() => {
      expect(screen.getByText('Deleted worker')).toBeInTheDocument()
   });
    
  })
 

test('close modal', () => {
  // Arrange
  const closeModal = jest.fn();
  const updateWorker = jest.fn();
  const worker = { id: '1', email: 'worker@example.com', role: 'admin', password: 'password' };

  Modal.setAppElement(document.createElement('div'));

  render(
    <EditWorker isOpen={true} worker={worker} closeModal={closeModal} updateWorker={updateWorker} />
  );

  // Act
  const cancelButton = screen.getByText('Cancel');
  fireEvent.click(cancelButton);

  // Assert
  expect(closeModal).toHaveBeenCalledTimes(1);
});

});
 