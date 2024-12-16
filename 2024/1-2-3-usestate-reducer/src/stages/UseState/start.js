import "./App.css";
import { useState } from "react";
import { Button, Input } from "antd";

// Here we have a working starting solution with sub-optimal state practices.
// 1. Try to add Total count of products 
// 2. Then lets discuss more optimal solution

function App() {
  const [products, setProducts] = useState([]);
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [isError, setIsError] = useState(null);
  const [isButtonDisabled, setIsButtonDissabled] = useState(true);
  const [isSuccess, setIsSuccess] = useState(null);

  const addNewItemToInventory = () => {
    setIsButtonDissabled();
    const existingProduct = products.find(
      (product) => product.title === productTitle
    );
    if (existingProduct) {
      setIsError(true);
      setIsSuccess(false);
      setIsButtonDissabled(false);
      return;
    }

    setProducts((prev) => [
      ...prev,
      {
        title: productTitle,
        price: productPrice,
      },
    ]);
    setIsButtonDissabled(false);
    setIsSuccess(true);
    setIsError(false);
  };

  const DeleteProduct = (title) => {
    setProducts(products.filter((product) => product.title !== title));
    setIsSuccess(false);
    setIsError(false);
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
            if(e.target.value.length > 0){
              setIsButtonDissabled(false)
            }
            else{
              setIsButtonDissabled(true)
            }
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
        <div className="success">{isSuccess && "Successfully added item"}</div>
        <div className="error">{isError && "Error - Could not add"}</div>
        <h2>List Products</h2>
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
