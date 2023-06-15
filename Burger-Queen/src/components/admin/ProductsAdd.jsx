import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import MenuVerticalAdmin from './MenuVerticalAdmin';
import Alert from '../Alert';

import '../style.css/admin.css'; // Ruta al archivo CSS con los estilos

const ProductsAdd = () => {
  const { token } = useContext(AuthContext);
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [image, setImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

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
      setShowAlert(true); // Mostrar la alerta "Ready, added worker" al agregar un trabajador

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

 // Función para ocultar el mensaje de alerta
 const hideAlert = () => {
  setShowAlert(false);
};


  return (
    <div className="form-containerProducts">
      <MenuVerticalAdmin />
      <div className='contentAddProduct'>
      <h2>Add Products</h2>
      <div className='formAddProduct'>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
          className='nameProducts'
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <label>
          Type: 
        <select
          className='type'
          name="type"
            type="text"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            required
        >
          <option value="select">Select type</option>
          <option value="desayuno">Desayuno</option>
          <option value="almuerzo">Almuerzo</option>
        </select>
        </label>
        <label>
          Price: $
          <input
          className='price'
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL:
          <input
          className='image'
            type="text"
            value={image}
            onChange={(e) => setImageUrl(e.target.value)}
            onBlur={handleImageLoad}
            required
          />
        </label>
        <label>
          {previewImage && <img src={previewImage} alt="Imagen previa" style={{ maxWidth: '200px' }} />}
        </label>
        <button className='addproduct' type="submit">Add</button>
      </form>
      {showAlert && (
          <Alert type="success" message="Ready, product added" onClose={hideAlert} />
        )}
      </div>
      </div>
    </div>
  );
};

export default ProductsAdd;
