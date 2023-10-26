import { useEffect, useState } from "react";
import { CartItemsContext } from "./CartItemsContext";

const CartItemsProvider = (props) => {

    const [cartItems, setCartItems] = useState([])
    const [totalAmountOfItems, setTotalAmountOfItems] = useState(0)

    const addToCartHandler = (item) => {
        const { id, name, price, images, category } = item;
        removeFromCartHandler(item)
        setCartItems((prevItems) => [...prevItems, { id, name, price, images, category }])
    }

    const removeFromCartHandler = (item) => {
        setCartItems(cartItems.filter((prevItem) => prevItem.id !== item.id))
    }

    const calculateTotalAmount = (currentCartItems) => {
        let total = 0
        currentCartItems.forEach((item) => {
            total = total + item.price
        })
        setTotalAmountOfItems(total)
    }

    useEffect(() => {
        calculateTotalAmount(cartItems)
    }, [cartItems])

    const cartItemCtx = {
        items: cartItems,
        totalAmount: totalAmountOfItems,
        addItem: addToCartHandler,
        removeItem: removeFromCartHandler
    }

    return (
        <CartItemsContext.Provider value={cartItemCtx}>
            {props.children}
        </CartItemsContext.Provider>
    );
}

export default CartItemsProvider;