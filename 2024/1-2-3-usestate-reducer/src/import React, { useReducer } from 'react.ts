import React, { useReducer } from 'react';

const initialState = {
  quantity: 1,
  price: 10,
  total: 10,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_QUANTITY':
      const newQuantity = Math.max(1, action.payload);
      return {
        ...state,
        quantity: newQuantity,
        total: newQuantity * state.price,
      };
    case 'SET_PRICE':
      const newPrice = Math.max(0, action.payload);
      return {
        ...state,
        price: newPrice,
        total: state.quantity * newPrice,
      };
    default:
      return state;
  }
}

const CartItemWithReducer = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const handleQuantityChange = (e) => {
    dispatch({ type: 'SET_QUANTITY', payload: Number(e.target.value) });
  };

  const handlePriceChange = (e) => {
    dispatch({ type: 'SET_PRICE', payload: Number(e.target.value) });
  };

  return (
    <div>
      <h2>Cart Item with useReducer</h2>
      <div>
        <label>
          Quantity:
          <input
            type="number"
            value={state.quantity}
            onChange={handleQuantityChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={state.price}
            onChange={handlePriceChange}
          />
        </label>
        <br />
        <p>Total: ${state.total}</p>
      </div>
    </div>
  );
};

export default CartItemWithReducer;
