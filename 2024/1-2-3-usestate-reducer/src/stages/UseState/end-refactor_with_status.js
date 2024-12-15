import "./App.css";
import { useState } from "react";
import { Button, Input } from "antd";

// This app helps small business owners manage their inventory by allowing them to input product details,
//  track stock levels, and adjust related variables that change together (like price, quantity, and reorder level).

// WE can add products
// disable button when no data is available for title or price
// show error if title already exist
// show success if new item was added
// show list of all products
// delete a product
function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0
  });
  const [formStatus, setFormStatus] = useState('empty');
  const isSuccess = formStatus === 'success'
  const error = formStatus === 'error'

  const totalProducts = products.length;
  const isButtonDisabled = !newProduct.price || !newProduct.title

  const addNewItemToInventory = () => {
    const existingProduct = products.find(
      (product) => product.title === newProduct.title
    );
    if (existingProduct) {
      setFormStatus('error');
      return;
    }
    setProducts((prev) => [
      ...prev,
      {
        title: newProduct.title,
        price: newProduct.price,
      },
    ]);
    setFormStatus('success');
  };

  const DeleteProduct = (title) => {
    setProducts(products.filter((product) => product.title !== title));
  };

  const onChangeFormField = (fieldName, value) => {
    setNewProduct(current => ({
      ...current,
      [fieldName]: value
    }))
    if(value.length === 0){
      setFormStatus('empty');
    }
  }
  
  return (
    <div className="App">
      {/* Create product */}
      <div>
        <h2>Create Product</h2>
        <Input
          value={newProduct.title}
          onChange={(e) => onChangeFormField('title',e.target.value)}
          placeholder="Product title"
        />
        <Input
          value={newProduct.price}
          onChange={(e) => onChangeFormField('price',e.target.value)}
          placeholder="Product price"
        />
        <Button disabled={isButtonDisabled} onClick={addNewItemToInventory}>
          Add Product to inventory
        </Button>
      </div>
      {/* List all created products */}
      <div>
        <div>{isSuccess && "Successfully added item"}</div>
        <div className="error">{error && "Error adding item"}</div>
        <h2>List Products ({totalProducts})</h2>
        {products.map((product) => {
          return (
            <>
              <div>
                Title: {product.title} Price: {product.price} Quantity:
                {product.quantity}{" "}
                <Button onClick={() => DeleteProduct(product.title)}>
                  Delete
                </Button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
