import { useContext } from 'react';
import './App.css';
import { Button, Input } from "antd";
import { ProductsContext } from './App';

function Products() {
  const { state, dispatch } = useContext(ProductsContext);
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


 return (<>
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
            </>)
}

export default Products;
