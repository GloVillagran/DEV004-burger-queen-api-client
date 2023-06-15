import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import '../style.css/modalProducts.css'

/* Establecer el elemento de la aplicación, es importante para garantizar que los lectores de pantalla 
no accedan al contenido principal cuando el modal está abierto. */
ReactModal.setAppElement('#root');

const EditProducts = ({ isOpen, product, closeModal, updateProduct }) => {
  const [editedData, setEditedData] = useState({
    id: '',
    name: '',
    price: '',
    image: '',
    type: '',
    // Agrega aquí otros campos que desees editar
  });

  useEffect(() => {
    if (product) {
      setEditedData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(product.id, editedData); // Llama a updateProduct con el ID del trabajador y los datos actualizados
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };
  

  return (
    <ReactModal isOpen={isOpen} onRequestClose={closeModal}>
      <form className='formModal' onSubmit={(e) => handleSubmit(e, editedData.id)}>
        {/* <label className='ID'>Id:</label>
        <input
          className='idModal'
          type="text"
          name="id"
          value={editedData.id}
          onChange={handleChange}
        /> */}
        <label className='NAME' >Name:</label>
        <input
        className='nameModal'
          type="text"
          name="name"
          value={editedData.name}
          onChange={handleChange}
        />
        <label className='PRICE' >Price:</label>
        <input
        className='priceModal'
          type="text"
          name="price"
          value={editedData.price}
          onChange={handleChange}
        />
        <label className='IMAGE'>Image:</label>
        <input
        className='imageModal' 
         type="text"
         name="image"
         value={editedData.image}
         onChange={handleChange}
        />
       <label className='TYPE'>Type:</label>
       <select className='typeModal' name="type" value={editedData.type} onChange={handleChange}>
          <option value="vacio"></option>
          <option value="Desayuno">Desayuno</option>
          <option value="Almuerzo">Almuerzo</option>
        </select>
        
        {/* Agrega aquí otros campos del formulario */}
        <button className='update' type="submit">Update</button>
        <button className='cancel' type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </ReactModal>
  );
};

export default EditProducts;
