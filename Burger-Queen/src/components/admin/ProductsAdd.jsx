import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import MenuVerticalAdmin from './MenuVerticalAdmin';



const ProductsAdd = () => {
  const { token } = useContext(AuthContext);
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [image, setImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/products', {
        name: productName,
        type: productType,
        price: productPrice,
        image: image
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });

      console.log(response.data); // Hacer algo con la respuesta de la API

      // Limpiar los campos del formulario
      setProductName('');
      setProductType('');
      setProductPrice('');
      setImageUrl('');
      setPreviewImage('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageLoad = () => {
    setPreviewImage(image);
  };


  return (
    <div>
         <MenuVerticalAdmin />
      <h2>Add Products</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            required
          />
        </label>
        <label>
          Price: $
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </label>
        <label>
        Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImageUrl(e.target.value)}
            onBlur={handleImageLoad}
            required
          />
        </label>
        <label>
        Previous image:
          {previewImage && <img src={previewImage} alt="Imagen previa" style={{ maxWidth: '200px' }} />}
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ProductsAdd;
