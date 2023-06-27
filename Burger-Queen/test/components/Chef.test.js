import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import OrdersChef from '../../src/components/chef/OrdersChef';
import { AuthContext } from '../../src/AuthContext';
import axios from 'axios';
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

jest.mock('react-router-dom');
jest.mock('axios');
jest.mock('../../src/components/style.css/chef.css', () => ({}));
jest.mock('../../src/components/style.css/MenuVerticalWaiter.css', () => ({}));
jest.mock('../../src/components/style.css/alert.css', () => ({}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Chef component', () => {
    test('render Pending Order', async () => {
        const expectedOrders = [
            {
                order: 1,
                client: 'Pedro',
                dateEntry: '2022-3-10',
                status: 'pending',
                products: [
                    { product: { name: 'Product 1' }, qty: '1' }
                ]
            }
        ];

        const expectedUser = {
            email: 'lucas@gmail.com',
            role: 'chef',
            id: 6
        };

        axios.get.mockResolvedValue({ data: expectedOrders });

        render(
            <AuthContext.Provider value={{ token: 'dummy-token', user: expectedUser }}>
                <OrdersChef displayedSection="pending" />
            </AuthContext.Provider>
        );

        fireEvent.click(screen.getByText('Pending Order'));

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(2);
            const firstProduct = screen.getByText('Product 1 (1)');
            expect(firstProduct).toBeInTheDocument();
        });

        axios.patch.mockResolvedValue({})
        axios.get.mockResolvedValue({})


        fireEvent.click(screen.getByText('Send'));
        await waitFor(() => {
           expect(screen.getByText('Order Completed')).toBeInTheDocument()
        });

    });

    test('render Delivered Order', async () => {
        const expectedOrders = [
            {
                order: 1,
                client: 'Pedro',
                dateEntry: '2022-3-10',
                status: 'delivered',
                dateProccesed: '2022-3-10',
                products: [
                    { product: { name: 'Product 1' }, qty: '1' }
                ]
            }
        ];

        const expectedUser = {
            email: 'lucas@gmail.com',
            role: 'chef',
            id: 6
        };

        axios.get.mockResolvedValue({ data: expectedOrders });

        render(
            <AuthContext.Provider value={{ token: 'dummy-token', user: expectedUser }}>
                <OrdersChef displayedSection="delivered" />
            </AuthContext.Provider>
        );

        fireEvent.click(screen.getByText('Order Delivering'));

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(3);
            const firstProduct = screen.getByText('Product 1 (1)');
            expect(firstProduct).toBeInTheDocument();
        });
    });

    test('render Cancel Order', async () => {
        const expectedOrders = [
            {
                order: 1,
                client: 'Pedro',
                dateEntry: '2022-3-10',
                status: 'pending',
                products: [
                    { product: { name: 'Product 1' }, qty: '1' }
                ]
            }
        ];

        const expectedUser = {
            email: 'lucas@gmail.com',
            role: 'chef',
            id: 6
        };

        axios.get.mockResolvedValue({ data: expectedOrders });

        render(
            <AuthContext.Provider value={{ token: 'dummy-token', user: expectedUser }}>
                <OrdersChef displayedSection="pending" />
            </AuthContext.Provider>
        );

        fireEvent.click(screen.getByText('Pending Order'));

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(2);
            const firstProduct = screen.getByText('Product 1 (1)');
            expect(firstProduct).toBeInTheDocument();
        });

        axios.put.mockResolvedValue({})
        axios.get.mockResolvedValue({})


        fireEvent.click(screen.getByText('Cancel'));
        await waitFor(() => {
           expect(screen.getByText('Order Cancelled')).toBeInTheDocument()
        });

    });
});






/* describe('OrdersChef', () => {
    fit('should fetch pending orders and update state', async () => {
        const chef = jest.fn();
        const token = '';

        const pendingOrdersData = [
            { id: 1, client: 'John Doe', dateEntry: '2023-06-01', products: [] },
            { id: 2, client: 'Jane Smith', dateEntry: '2023-06-02', products: [] }
        ];

        axios.get.mockResolvedValueOnce({ data: pendingOrdersData });

        render(
            <AuthContext.Provider value={{ chef, token }} >
                <BrowserRouter>
                <OrdersChef />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        // Verificar que se haya realizado la solicitud GET correctamente
        expect(axios.get).toHaveBeenCalledWith(
            'https://json-server-beta-mauve.vercel.app/orders?status=pending',
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
            'https://json-server-beta-mauve.vercel.app/orders?status=delivered',
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

 */
