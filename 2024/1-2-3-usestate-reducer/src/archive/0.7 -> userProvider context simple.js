import "./App.css";
import ProjectDescription from './ProjectDescription'
import Products from './ProductComponent'

import { createContext, useReducer, useState } from "react";

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

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('anonymous');

  return (
      <UserContext.Provider value={{ user, setUser }}>
          {children}
      </UserContext.Provider>
  );
};


function App() {
  const [state, dispatch] = useReducer(productsReducer, initialState)  

  return (
    <div className="App">
     <UserProvider>
        <ProjectDescription/>
        <Products state={state} dispatch={dispatch}/>
      </UserProvider>
    </div>
  );
}

export default App;
