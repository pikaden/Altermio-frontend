import { createContext } from "react";

export const CartItemsContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: () => {},
    removeItem: () => {},
    clearAll: () => {}
})
 
