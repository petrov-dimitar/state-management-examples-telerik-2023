import { useContext } from 'react';
import './App.css';
import { UserContext } from './App';

function Description(props) {
  return (
    <div>
      <h1>Description</h1>
      total products {props.steli} {props.mitko}
      <p>
      This app helps small business owners manage their inventory by allowing them to input product details,
      track stock levels, and adjust related variables that change together (like price, quantity, and reorder level).
        </p>
        <p>
        # Requirements:
        <ul>
          <li>
          show list of all products
          </li>
        </ul>
        <ul>
          <li>
          We can add products
          </li>
          <ul>
          <li>
          show error if title already exist
          </li>
          <li>
          show success if new item was added
          </li>
        </ul>
        </ul>
        <ul>
          <li>
          disable button when no data is available for title
          </li>
        </ul>        
        <ul>
          <li>
          delete a product
          </li>
        </ul>
        <ul>
          <li>
          Show Total Products
          </li>
        </ul>
        </p>
    </div>
  );
}

export default Description;
