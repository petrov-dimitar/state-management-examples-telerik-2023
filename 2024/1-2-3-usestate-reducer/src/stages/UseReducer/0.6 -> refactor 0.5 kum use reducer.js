import "./App.css";
import { Button, Input } from "antd";
import ProjectDescription from './ProjectDescription'
import { useReducer, useState } from "react";

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

function productsReducer(state, action){
    switch(action.actionType){
      case 'CHANGE_INPUT_VALUE': {
        return {
          ...state,
          status: 'empty',
          newProduct: {
            ...state.newProduct,
            [action.name]: action.value,
          }
        }
      }
      case 'ADD_PRODUCT': {
      if(state.products.find(product => product.title === state.newProduct.title)){
        return {
          ...state,
          status: 'error'
        }
      }
      return {
        ...state,
        status: 'success',
        products: [...state.products,
          {
            id: state.products.length,
            title: state.newProduct.title,
            price: state.newProduct.price
          }
        ]
      }
        }
      case 'DELETE_PRODUCT': {
        return {
          ...state,
          products: state.products.filter(product => action.item.id !== product.id)
        }
      }

      default: {
        return state
      }
    }

}

const initialState = {
  products: [{
    id: 0,
    title: 'Default Products',
    price: 2.50
  }],
  newProduct: {
    title: '',
    price: 0
  }
}

function App() {
  const [state, dispatch] = useReducer(productsReducer, initialState)
  const submitButtonDisabled = state.newProduct.title === '';
  const total = state.products.length;

  const addProduct = () => {
    dispatch({
      actionType: 'ADD_PRODUCT' 
    })
  }

  const deleteProduct = (item) => {
    dispatch({
      actionType: 'DELETE_PRODUCT',
      item
    })
  }

  const changeInputValue = (name, value) => {
    dispatch({
      actionType: 'CHANGE_INPUT_VALUE',
      name, 
      value
    })
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
        <Button 
        onClick={addProduct}
        disabled={submitButtonDisabled}
        >
          Add Product to inventory
        </Button>
      </div>
      <div className="margin_top">
        <div className="success">{state.status ==='success'  && "Successfully added item"}</div>
        <div className="error">{state.status ==='error' && "Could Not Add Product"}</div>
        <div>Total Amount of Products: </div>
        <h1>List OF Products ({total})</h1>
        <hr/>
        {state.products.map((product) => {
          return (
            <>
              <div>
                Title: {product.title} Price: {product.price} BGN
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
