import "./App.css";
import { useReducer, useState } from "react";
import { Button, Input } from "antd";
import ProjectDescription from "./ProjectDescription";
// Here we have a working starting solution with sub-optimal state practices.
// 1. Try to add Total count of products
// 2. Then lets discuss more optimal solution

const initialData = {
  products: [],
  productTitle: "",
  productPrice: "",
  formStatus: "empty",
};

const productsReducer = (state, action) => {
  console.log({state});
  console.log({action});

  switch (action.actionName) {
    case "ADD_NEW_ITEM_TO_INVENTORY": {
      const existingProduct = state.products.find(
        (product) => product.title === state.productTitle
      );

      if (existingProduct) {
        return {
          ...state,
          formStatus: "error",
        };
      }

      return {
        ...state,
        formStatus: "success",
        products: [
          ...state.products,
          {
            title: state.productTitle,
            price: state.productPrice,
          },
        ],
      };
    }
    case "SET_FORM_STATUS": {
      return {
        ...state,
        formStatus: action.actionPayload,
      };
    }
    case "SET_PRODUCTS": {
      return {
        ...state,
        products: action.actionPayload,
      };
    }
    case "SET_PRODUCT_TITLE": {
      return {
        ...state,
        productTitle: action.actionPayload,
      };
    }
    case "SET_PRODUCT_PRICE": {
      return {
        ...state,
        productPrice: action.actionPayload,
      };
    }
    case "DELETE_PRODUCT": {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.title !== action.actionPayload
        ),
        formStatus: "delete_success",
      };
    }
    default: {
      return state;
    }
  }
};

function App() {
  const [state, dispatch] = useReducer(productsReducer, initialData);

  const isButtonDisabled = state.productTitle.length === 0;
  const totalProducts = state.products.length;

  const addNewItemToInventory = () => {
    dispatch({ actionName: "ADD_NEW_ITEM_TO_INVENTORY" });
  };

  const DeleteProduct = (title) => {
    dispatch({ actionName: "DELETE_PRODUCT", actionPayload: title });
  };

  const changeInput = (e) => {
    dispatch({
      actionName: "SET_PRODUCT_TITLE",
      actionPayload: e.target.value,
    });
  };

  return (
    <div className="App">
      <ProjectDescription />
      {/* Create product */}
      <div>
        <h2>Create Product</h2>
        <Input
          value={state.productTitle}
          onChange={changeInput}
          placeholder="Product title"
        />
        <Input
          value={state.productPrice}
          onChange={(e) => {
            dispatch({
              actionName: "SET_PRODUCT_PRICE",
              actionPayload: e.target.value,
            });
          }}
          placeholder="Product price"
        />
        <Button disabled={isButtonDisabled} onClick={addNewItemToInventory}>
          Add Product to inventory
        </Button>
      </div>

      {/* List all created products */}
      <div>
        <div className="success">
          {state.formStatus === "success" && "Successfully added item"}
        </div>
        <div className="error">
          {state.formStatus === "error" && "Error - Could not add"}
        </div>
        <div className="error">
          {state.formStatus === "delete_success" && "DELETE OKAY"}
        </div>

        <h2>List Products (total {totalProducts})</h2>
        {state.products.map((product) => {
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
