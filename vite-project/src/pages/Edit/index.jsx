import React, { useState } from 'react';
import axios from 'axios';


function ProductEdit() {
  const [editItem, setEditItem] = useState(null);

  
  const updateItem = (updatedItem) => {
    axios.put(`http://localhost:3000/items/${updatedItem.id}`, updatedItem)
      .then((response) => {
        console.log('Item updated:', response.data);
        setEditItem(null);
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  return (
    <div>
     
      <button onClick={() => setEditItem(item)}>Edit Product</button>

      
      {editItem && (
        <ProductEdit 
          editItem={editItem} 
          setEditItem={setEditItem} 
          updateItem={updateItem} 
        />
      )}
    </div>
  );
}

export default ProductEdit;
