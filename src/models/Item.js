import { types, getParent } from 'mobx-state-tree';

const Item = types.model({
    name: types.string,
    quantity: types.number,
    price: types.number
})
    .actions(self => ({
        increment() {
            self.quantity++;
        },
        decrement() {
            self.quantity--;
        },
        remove() {
            getParent(self, 2).removeItem(self)
        }
    }))
    .views(self => ({
        total() {
            return self.quantity * self.price;
        }
    }));

export default Item;

