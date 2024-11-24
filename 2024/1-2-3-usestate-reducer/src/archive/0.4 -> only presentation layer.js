import "./App.css";
import { Button, Input } from "antd";
import ProjectDescription from './ProjectDescription'

  // # Best Practices
  // 1. Idenyify components different visual state 
  // 2. Determine what triggers those state Changes
  // 3. Represent the satte in memory using useState
  // 4. Remove any non-eseential state variables
  // 5. Connect the event handlers to set the state

  // Group related state
  // Avoid contradictions is state
  // Avoid redundednt state
  // Avoid duplication in state
  // Avoid deeply nested state

function App() {
  return (
    <div className="App">
      <ProjectDescription/>

      <div>
        <h2>Create Product</h2>
        <Input
          placeholder="Product title"
        />
        <Input
          placeholder="Product price"
        />
        {/* Disable button if title is empty */}
        <Button >
          Add Product to inventory
        </Button>
      </div>
      <div className="margin_top">
        {/* Show success if item was added correctly */}
        <div>{"Successfully added item"}</div>

        {/* Show error if there is an error */}
        <div className="error">Error if there is error</div>

        <div>Total Amount of Products: </div>
        <h1>List OF Products</h1>
        <hr/>

        {/* Map to list of products */}
        {[].map((product) => {
          return (
            <>
              <div>
                Title: {product.title} Price: {product.price} Quantity:
                {product.quantity}{" "}
                {/* Delete Product */}
                <Button>
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
