import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MenuVerticalAdmin from './MenuVerticalAdmin';
import { AuthContext } from '../../AuthContext';
import EditProducts from './EditProducts';

const ProductsList = () => {
    const { token } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);


    useEffect(() => {
        fetchProducts();
      }, [token]);
    
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
    };

    const editProducts = async (productId) => {
        setIsModalOpen(true);
        try {
            const response = await axios.get(`http://localhost:8080/products/${productId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setEditedProduct(response.data);
        } catch (error) {
                console.error('Error getting workers:', error);
              }
       /*  // Lógica para editar el producto con el ID dado
        console.log(`Editar producto con ID: ${productId}`); */
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setEditedProduct(null);
      };

      const updateProduct = async (productId, updatedData) => {
        try {
          const response = await axios.patch(`http://localhost:8080/products/${productId}`, 
          updatedData,
          {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
          closeModal();
          // Actualiza los datos de los trabajadores
          fetchProducts(response.data);
        } catch (error) {
          console.error('Failed to update worker:', error);
        }
      };
      
    const deleteProduct = async (productId) => {
        try {
          const response = await axios.delete(`http://localhost:8080/products/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          fetchProducts(response.data);
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };
    const renderProducts = () => {
        if (products.length === 0) {
          return <p>No products available.</p>;
        }
    return (
        <div>
            <MenuVerticalAdmin />
           
            {products && products.map(product => (
                <div key={product.id}>
                    <p>{product.name}</p>
                    <p>$:{product.price}</p>
                    <img src={product.image} alt={product.name} />
                    <p>{product.type}</p>
                    <button onClick={() => editProducts(product.id)}>Edit</button>
                    <button onClick={() => deleteProduct(product.id)}>Delete</button>
                </div>
            ))}
            
      <EditProducts
      isOpen={isModalOpen}
      product={editedProduct}
      closeModal={closeModal}
      updateProduct={updateProduct}
    />
        </div>
    );
};

return (
    <div>
      <h3>List Products</h3>
      {renderProducts()}
    </div>
  );
};

export default ProductsList;
