import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import MenuVertical from '../MenuVertical';
import '../style.css/waiter.css'


function Waiter() {
  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(''); // Estado para controlar el menú seleccionado
  const { token } = useContext(AuthContext); // Acceder al token de autenticación desde el contexto

  useEffect(() => {
    /* fetchProducts, esta función realiza la solicitud GET a la API utilizando Axios 
    y el token de autenticación proporcionado en el contexto. Sin embargo, antes de llamar a fetchProducts, 
    se verifica si el token existe.  */
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products', {
          headers: {
            Authorization: `Bearer ${token}` // Reemplaza con tu token de autenticación
          }
        });
        console.log(response.data); // Verificar los datos de la respuesta en la consola
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchProducts();
    }
  }, [token]);

  function handleClick(e, menu) {
    e.preventDefault();
    setSelectedMenu(menu);
  }
  return (
    <div className='Waiter'>
      <MenuVertical />
      <div className='content'>
      <button
          onClick={(e) => handleClick(e, 'Desayuno')}
          className={`breakfast ${selectedMenu === 'Desayuno' ? 'active' : ''}`}
        >
          Breakfast
        </button>

        <button
          onClick={(e) => handleClick(e, 'Almuerzo')}
          className={`lunch ${selectedMenu === 'Almuerzo' ? 'active' : ''}`}
        >
          Lunch
        </button>
        
        <input
          type="email" id='name' placeholder='Client name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h3 className='options'>Options</h3>

        {selectedMenu === 'Desayuno' && (
          <>
            {products &&
              products
                .filter((product) => product.type === 'Desayuno')
                .map((product, productIndex) => (
                  <div key={productIndex} className='product'>
                    <h2>
                      <i>{product.name}</i>
                    </h2>
                    <img src={product.image} alt={product.name} />
                    <p>Price: ${product.price}</p>
                  </div>
                ))}
          </>
        )}
       
        {selectedMenu === 'Almuerzo' && (
          <>
            {products &&
              products
                .filter((product) => product.type === 'Almuerzo')
                .map((product, productIndex) => (
                  <div key={productIndex} className='product'>
                    <h2>
                      <i>{product.name}</i>
                    </h2>
                    <img src={product.image} alt={product.name} />
                    <p>Price: ${product.price}</p>
                  </div>
                ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Waiter;

