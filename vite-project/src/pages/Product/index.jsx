import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
 


function Product() {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const API_URL = 'http://localhost:3000/items';
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get(API_URL).then((res) => setItems(res.data));
  }, []);

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/${id}`).then(() => setItems(items.filter((item) => item.id !== id)));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  const viewItem = (id) => {
    navigate(`/Detail/${id}`);
  };

  const updateItem = (updatedItem) => {
    axios.put(`${API_URL}/${updatedItem.id}`, updatedItem)
      .then((response) => {
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item)); 
        setEditItem(null); 
        Swal.fire({
          title: "Updated!",
          text: "The item has been updated successfully.",
          icon: "success"
        });
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">CRUD Application</h1>
      
     
      {editItem && (
        <ProductEdit 
          editItem={editItem} 
          setEditItem={setEditItem} 
          updateItem={updateItem} 
        />
      )}

      <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">
            <th className="border-b-2 border-gray-400 px-6 py-3 text-left text-sm font-semibold">ID</th>
            <th className="border-b-2 border-gray-400 px-6 py-3 text-left text-sm font-semibold">Name</th>
            <th className="border-b-2 border-gray-400 px-6 py-3 text-left text-sm font-semibold">Price</th>
            <th className="border-b-2 border-gray-400 px-6 py-3 text-left text-sm font-semibold">Category</th>
            <th className="border-b-2 border-gray-400 px-6 py-3 text-left text-sm font-semibold">Stock</th>
            <th className="border-b-2 border-gray-400 px-6 py-3 text-center text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="transition-colors hover:bg-indigo-50 even:bg-gray-50">
              <td className="border-b px-6 py-3 text-center font-medium text-gray-700">{item.id}</td>
              <td className="border-b px-6 py-3 text-gray-800">{item.name}</td>
              <td className="border-b px-6 py-3 text-gray-800">${item.price}</td>
              <td className="border-b px-6 py-3 text-gray-800">{item.category}</td>
              <td className="border-b px-6 py-3 text-gray-800">{item.stock}</td>
              <td className="border-b px-6 py-3 text-center space-x-3">
                <button
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-600 transition"
                  onClick={() => viewItem(item.id)}  
                >
                  View
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-yellow-600 transition"
                  onClick={() => setEditItem(item)} 
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-600 transition"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
