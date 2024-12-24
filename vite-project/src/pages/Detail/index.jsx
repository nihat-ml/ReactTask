import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams(); 
  const [item, setItem] = useState(null);
  const API_URL = 'http://localhost:3000/items/';

  useEffect(() => {
    axios.get(`${API_URL}/${id}`).then((res) => setItem(res.data));
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">Product Detail</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">{item.name}</h2>
        <p><strong>ID:</strong> {item.id}</p>
        <p><strong>Price:</strong> ${item.price}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Stock:</strong> {item.stock}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
