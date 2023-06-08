
import { render, waitFor, screen } from '@testing-library/react';

import axios from 'axios';
import { AuthContext } from '../../src/AuthContext'
import OrdersChef from '../../src/components/chef/OrdersChef';


jest.mock('react-router-dom');
// Mock de useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('axios');
jest.mock('../../src/components/style.css/chef.css', () => ({

}));
jest.mock('../../src/components/style.css/MenuVerticalWaiter.css', () => ({

}));

describe('chef component', () => {
    test('renders chef component', async () => {
        const chef = jest.fn();

        const expectedData = {
            data: {
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…jQifQ._Ocqugiwhcud7HgWvtZWKjd6WRiMjRKIJ5_NlL1zMCY',
                user: { email: 'hugo@gmail.com', role: 'chef', id: 4 }
            }
        }
        axios.post.mockResolvedValue(expectedData);

        render(
            <AuthContext.Provider value={{ chef }} >
                <OrdersChef />
            </AuthContext.Provider>
        );
        // Asegurarse de que se realiza la petición GET correctamente
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
    });
});

describe('OrdersChef', () => {
    it('should fetch pending orders and update state', async () => {
        const chef = jest.fn();
        const token = '';

        const pendingOrdersData = [
            { id: 1, client: 'John Doe', dateEntry: '2023-06-01', products: [] },
            { id: 2, client: 'Jane Smith', dateEntry: '2023-06-02', products: [] }
        ];

        axios.get.mockResolvedValueOnce({ data: pendingOrdersData });

        render(
            <AuthContext.Provider value={{ chef, token }} >
                <OrdersChef />
            </AuthContext.Provider>
        );

        // Verificar que se haya realizado la solicitud GET correctamente
        expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:8080/orders?status=pending',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const pendingOrderElements = await screen.findByTestId('pending-order');
        expect(pendingOrderElements).toBeDefined();
    });
})

describe('Delivered', () => {
    it('should fetch delivered orders and update state', async () => {
        const chef = jest.fn();
        const token = '';
        const deliveredOrdersData = [
            { id: 1, client: 'John Doe', dateEntry: '2023-06-01', products: [] },
            { id: 2, client: 'Jane Smith', dateEntry: '2023-06-02', products: [] }
        ];

        axios.get.mockResolvedValueOnce({ data: deliveredOrdersData });

        render(
            <AuthContext.Provider value={{ chef, token }} >
                <OrdersChef />
            </AuthContext.Provider>
        );

        // Verificar que se haya realizado la solicitud GET correctamente
        expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:8080/orders?status=delivered',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const pendingOrderElements = await screen.findByTestId('delivering');
        expect(pendingOrderElements).toBeDefined();
    });
});


describe('Send', () => {
    test('sendOrder should update the orders', async () => {
        const token = '';
        // Crea un mock de axios
        const axiosMock = jest.spyOn(axios, 'patch');

        // Configura el comportamiento del mock para simular una respuesta exitosa
        axiosMock.mockResolvedValueOnce({ data: { success: true } });

        // Renderiza el componente OrdersChef
        render(
            <AuthContext.Provider value={{ token }}>
                <OrdersChef />
            </AuthContext.Provider>
        );

        // Espera a que aparezca el botón "Pending Order"
        await screen.findByText('Pending Order');

        // Busca y haz clic en el botón "Send"
        const sendOrders = await screen.queryByText('Send');
        expect(sendOrders).toBeDefined();

        // Espera a que se resuelva la promesa de la función sendOrder
        await screen.findByText('Order Delivering');

        // Verifica que los pedidos pendientes y entregados se hayan actualizado correctamente
        const pendingOrderButton = screen.queryByTestId('pending-order');
expect(pendingOrderButton).not.toBeNull();
const deliveringButton = screen.queryByTestId('delivering');
expect(deliveringButton).not.toBeNull();


        // Restaura la implementación original de axios.patch
        axiosMock.mockRestore();
    });

});


