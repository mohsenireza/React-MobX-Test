import React from 'react';
import { observer } from 'mobx-react';

const InvoiceItem = ({ item }) => (
    <li style={{ listStyle: 'none' }}>
        {item.name} {item.quantity} * ${item.price.toFixed(2)} = ${item.total()}
        <button onClick={item.increment}>+</button>
        <button onClick={item.decrement}>-</button>
        <button onClick={item.remove}>Remove</button>
    </li>
)

export default observer(InvoiceItem);