
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import WorkersList from '../../src/components/admin/WorkersList';
//import ReactModal from 'react-modal';
import { AuthContext } from '../../src/AuthContext';




jest.mock('react-router-dom', () => ({
    Link: 'Link',
    Route: ({ children, path }) => children({ match: path === '/somewhere' }),
    useNavigate: jest.fn(),
  }))
  
  jest.mock('../../src/components/style.css/MenuVerticalWaiter.css', () => ({
  
  }));


jest.mock('axios');

jest.mock('react-modal', () => ({
    setAppElement: jest.fn(),
    // Agrega aquí cualquier otra función o propiedad que necesites utilizar
  }));
  

describe('WorkersList', () => {
  beforeEach(() => {
    axios.get.mockClear();
    axios.patch.mockClear();
    axios.delete.mockClear();
  });

//   test('renders the list of workers', () => {
//     const mockWorkers = [
//       { id: 1, email: 'worker1@example.com', role: 'admin' },
//       { id: 2, email: 'worker2@example.com', role: 'user' },
//     ];
//     axios.get.mockResolvedValueOnce({ data: mockWorkers });
    
//     const mockToken = 'mock-token'; // Valor simulado para el token
//     const mockAuthContextValue = { token: mockToken };

//     ReactModal.setAppElement.mockImplementation(() => {});

//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <WorkersList />
//       </AuthContext.Provider>
//     );
//     expect(screen.queryByText('No workers available.')).not.toBeNull();

//     // Wait for the API request to resolve
 
//         const worker1Element = screen.getByText('ID: 1 | Email: worker1@example.com | Rol: admin');
//         expect(worker1Element).toBeInTheDocument();
      
     
//         const worker2Element = screen.getByText()( { id: 2, email: 'worker2@example.com', role: 'user' });
//         expect(worker2Element).toBeInTheDocument();
   
  


//     expect(screen.queryByText('No workers available.')).toBeNull();
//   });

  test('editWorker opens modal and fetches worker data', async () => {
    const mockWorker = { id: 1, email: 'worker1@example.com', role: 'admin' };
    axios.get.mockResolvedValueOnce({ data: mockWorker });

    render(
               <AuthContext.Provider value={mockWorker}>
                 <WorkersList />
            </AuthContext.Provider>
             );

     const addToCartButton = screen.getByText('Edit');
             // Realiza las aserciones aquí
    fireEvent.click(screen.queryAllByText(addToCartButton));

    expect(screen.getByText('Edit Worker')).toBeInTheDocument();
    expect(screen.getByDisplayValue('worker1@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('admin')).toBeInTheDocument();
  });

  /* test('updateWorker updates the worker and closes the modal', async () => {
    const mockWorker = { id: 1, email: 'worker1@example.com', role: 'admin' };
    axios.get.mockResolvedValueOnce({ data: mockWorker });
    axios.patch.mockResolvedValueOnce({ data: mockWorker });

    render(<WorkersList />);

    fireEvent.click(screen.getByText('Edit'));

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'updated@example.com' } });
    fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'user' } });

    fireEvent.click(screen.getByText('Save'));

    expect(axios.patch).toHaveBeenCalledWith(
      'http://localhost:8080/users/1',
      { email: 'updated@example.com', role: 'user' },
      expect.any(Object)
    );

    await screen.findByText('No workers available.');
  });

  test('deleteWorker deletes the worker', async () => {
    const mockWorker = { id: 1, email: 'worker1@example.com', role: 'admin' };
    axios.get.mockResolvedValueOnce({ data: [mockWorker] });
    axios.delete.mockResolvedValueOnce();

    render(<WorkersList />);

    fireEvent.click(screen.getByText('Delete'));

    expect(axios.delete).toHaveBeenCalledWith(
      'http://localhost:8080/users/1',
      expect.any(Object)
    );

    await screen.findByText('No workers available.');
  }); */
}); 