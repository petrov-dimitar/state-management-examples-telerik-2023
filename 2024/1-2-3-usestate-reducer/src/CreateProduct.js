import './App.css';

import { Button, Input } from 'antd';
function CreateProduct() {
  return (
    <div>
      <h1>Create Product Component</h1>
      <Input placeholder="Product title" />
      <Input placeholder="Product price" />
      <Button>Add Product to inventory</Button>

    </div>
  );
}

export default CreateProduct;
