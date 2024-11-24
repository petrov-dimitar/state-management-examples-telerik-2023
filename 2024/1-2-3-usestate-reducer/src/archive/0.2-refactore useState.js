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
  const [productTitle, setProductTitle] = useState(null);
  const [productPrice, setProductPrice] = useState(null);

  const [error, setError] = useState(null);
  
  const isSuccess = products.length > 0 && !error
  const totalProducts = products.length;
  const isButtonDisabled = !productTitle || !productPrice

  const addNewItemToInventory = () => {
    const existingProduct = products.find(
      (product) => product.title === productTitle
    );
    if (existingProduct) {
      setError("Already exists");
      return;
    }
    setProducts((prev) => [
      ...prev,
      {
        title: productTitle,
        price: productPrice,
      },
    ]);
    setError(false);
  };

  const DeleteProduct = (title) => {
    setProducts(products.filter((product) => product.title !== title));
  };
  
  return (
    <div className="App">
      {/* Create product */}
      <div>
        <h2>Create Product</h2>
        <Input
          value={productTitle}
          onChange={(e) => {
            setProductTitle(e.target.value)
        }}
          placeholder="Product title"
        />
        <Input
          value={productPrice}
          onChange={(e) => {
            setProductPrice(e.target.value)
          }
        }
          placeholder="Product price"
        />
        <Button disabled={isButtonDisabled} onClick={addNewItemToInventory}>
          Add Product to inventory
        </Button>
      </div>

      {/* List all created products */}
      <div>
        <div>{isSuccess && "Successfully added item"}</div>
        <div className="error">{error && error}</div>
        <h2>List Products</h2>
        <div>Total Amount of Produts: {totalProducts}</div>

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
