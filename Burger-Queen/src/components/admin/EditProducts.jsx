import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

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
      <form onSubmit={(e) => handleSubmit(e, editedData.id)}>
        <label>Id:</label>
        <input
          type="text"
          name="id"
          value={editedData.id}
          onChange={handleChange}
        />
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={editedData.name}
          onChange={handleChange}
        />
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={editedData.price}
          onChange={handleChange}
        />
        <label>Image:</label>
        <input
         type="text"
         name="image"
         value={editedData.image}
         onChange={handleChange}
        />
       <label>Type:</label>
       <select name="type" value={editedData.type} onChange={handleChange}>
          <option value="vacio"></option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
        </select>
        
        {/* Agrega aquí otros campos del formulario */}
        <button type="submit">Update</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </ReactModal>
  );
};

export default EditProducts;
