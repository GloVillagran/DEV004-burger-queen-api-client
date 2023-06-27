import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MenuVerticalAdmin from './MenuVerticalAdmin';
import { AuthContext } from '../../AuthContext';
import EditProducts from './EditProducts';
import '../style.css/tables.css'

const ProductsList = () => {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://json-server-beta-mauve.vercel.app/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error getting products:', error);
    }
  };

  const editProduct = async (productId) => {
    setIsModalOpen(true);
    try {
      const response = await axios.get(`https://json-server-beta-mauve.vercel.app/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditedProduct(response.data);
    } catch (error) {
      console.error('Error getting product:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedProduct(null);
  };

  const updateProduct = async (productId, updatedData) => {
    try {
      await axios.patch(`https://json-server-beta-mauve.vercel.app/products/${productId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      closeModal();
      fetchProducts();
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://json-server-beta-mauve.vercel.app/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const renderProducts = () => {
    if (products.length === 0) {
      return <p>No products available.</p>;
    }

    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody >
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <img className='imgProducts' src={product.image} alt={product.name} />
              </td>
              <td>{product.type}</td>
              <td>
                <button className='edit' onClick={() => editProduct(product.id)}>Edit</button>
              </td>
              <td>
                <button className='deleteProduct' onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className='ProductList'>
      <MenuVerticalAdmin />
      <div className='contentListProduct'>
      <h3 className='listProducts'>LIST PRODUCTS</h3>
      {renderProducts()}
      <EditProducts
        isOpen={isModalOpen}
        product={editedProduct}
        closeModal={closeModal}
        updateProduct={updateProduct}
      />
      </div>
    </div>
  );
};

export default ProductsList;
