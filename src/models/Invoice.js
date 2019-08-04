import { types } from 'mobx-state-tree';
import Item from './Item';

const Invoice = types.model('Invoice', {
    currency: types.string,
    is_paid: false,
    items: types.array(Item)
})
    .actions(self => ({
        pay() {
            self.is_paid = true
        },
        addItem(item) {
            self.items.push(item);
        },
        removeItem(item) {
            self.items.splice(self.items.indexOf(item), 1);
        }
    }))
    .views(self => ({
        status() {
            return self.is_paid ? 'Paid' : 'Not Paid';
        },
        total() {
            return self.items.reduce((sum, item) => sum + item.total(), 0)
        }
    }));

export const invoiceStore = Invoice.create({
    currency: 'BTC'
});