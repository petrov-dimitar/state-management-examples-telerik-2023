import "./App.css";
import { Button, Input } from "antd";
import ProjectDescription from './ProjectDescription'
import { useState } from "react";

  // Steps for creating a component with state
  // 1. Idenyify components different visual state 
  // 2. Determine what triggers those state Changes
  // 3. Represent the state in memory using useState
  // 4. Remove any non-eseential state variables
  // 5. Connect the event handlers to set the state

  // # Best Practices
  // Group related state
  // Avoid contradictions is state
  // Avoid redundednt state
  // Avoid duplication in state
  // Avoid deeply nested state

function App() {
  const [products, setProducts] = useState([{
    id: 0,
    title: 'Default Products',
    price: 2.50
  }]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0
  });
  const [status, setStatus] = useState('empty');
  const submitButtonDisabled = newProduct.title === '';
  const total = products.length;

  const addProduct = () => {
    // show error if title exists
    if(products.find(product => product.title === newProduct.title)){
      setStatus('error')
      return;
    }
      setProducts(prev => 
        ([...prev, 
          {
            id: prev.length,
            title: newProduct.title,
            price: newProduct.price
          }
        ]))
        setStatus('success')
  }

  const deleteProduct = (item) => {
    setProducts(currentProducts => currentProducts.filter(product => item.id !== product.id))
  }

  const changeInputValue = (name, value) => {
    setStatus('empty');
    setNewProduct(current => ({
      ...current,
      [name]: value
    }))
  }

  return (
    <div className="App">
      <ProjectDescription/>

      <div>
        <h2>Create Product</h2>
        <Input
          placeholder="Product title"
          onChange={(e)=> {
            changeInputValue('title',e.target.value)}}
        />
        <Input
          placeholder="Product price"
          onChange={(e)=> {changeInputValue('price',e.target.value)}}
        />
        {/* Disable button if title is empty */}
        <Button 
        onClick={addProduct}
        disabled={submitButtonDisabled}
        >
          Add Product to inventory
        </Button>
      </div>
      <div className="margin_top">
        {/* Show success if item was added correctly */}
        <div className="success">{status ==='success'  && "Successfully added item"}</div>

        {/* Show error if there is an error */}
        <div className="error">{status ==='error' && "Could Not Add Product"}</div>

        <div>Total Amount of Products: </div>
        <h1>List OF Products ({total})</h1>
        <hr/>

        {/* Map to list of products */}
        {products.map((product) => {
          return (
            <>
              <div>
                Title: {product.title} Price: {product.price} BGN
                {/* Delete Product */}
                <Button
                onClick={()=>deleteProduct(product)}
                >
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
