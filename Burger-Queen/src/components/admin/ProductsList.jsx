import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MenuVerticalAdmin from './MenuVerticalAdmin';
import { AuthContext } from '../../AuthContext';

const ProductsList = () => {
    const { token } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Hacer la solicitud a la API simulada
        const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/products', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(response.data);

        } catch (error) {
            console.error('Error getting workers:', error);
        }
    }; fetchProducts();
    }, [token]);

    const handleEdit = (productId) => {
        // Lógica para editar el producto con el ID dado
        console.log(`Editar producto con ID: ${productId}`);
    };

    const handleDelete = (productId) => {
        // Lógica para eliminar el producto con el ID dado
        console.log(`Eliminar producto con ID: ${productId}`);
    };

    return (
        <div>
            <MenuVerticalAdmin />
            <h1>Lista de productos</h1>
            {products && products.map(product => (
                <div key={product.id}>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                    <img src={product.image} alt={product.name} />
                    <p>{product.type}</p>
                    <button onClick={() => handleEdit(product.id)}>Editar</button>
                    <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
};

export default ProductsList;
