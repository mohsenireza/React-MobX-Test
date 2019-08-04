import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './App.css';
import { CounterStoreContext } from './stores/CounterStore';
import { invoiceStore } from './models/Invoice';
import InvoiceItem from './components/elements/InvoiceItem';

const App = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const counterStore = useContext(CounterStoreContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price)
    }
    invoiceStore.addItem(item);
  }

  return (
    <div className="App">
      <h1>{invoiceStore.currency}</h1>
      <h4>{invoiceStore.status()}</h4>
      {!invoiceStore.is_paid && <button onClick={() => invoiceStore.pay()}>Pay</button>}
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" onChange={e => { setName(e.target.value) }} />
        </label>

        <label>
          Price
          <input type="text" name="price" onChange={e => { setPrice(e.target.value) }} />
        </label>

        <label>
          Quantity
          <input type="text" name="quantity" onChange={e => { setQuantity(e.target.value) }} />
        </label>

        <button type="submit">Add</button>
      </form>

      <h3>Total price is ${invoiceStore.total().toFixed(2)}</h3>
      <ul>
        {invoiceStore.items.map((item, index) => (
          <InvoiceItem item={item} key={index} />
        ))}
      </ul>

    </div>
  );
}


export default observer(App);
