import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items : [],
    totalAmount : 0,
}
const cartReduser = (state,action)=>{
    if (action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount  + action.item.price * action.item.amount;

        const existingItemIndex = state.items.findIndex(
            item =>item.id === action.item.id
            )
        const existingCartItem = state.items[existingItemIndex]
        let updatedItems;
        if(existingCartItem){
           const updatedItem = {
                ...existingCartItem,
                amount : existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem
        }else{
           updatedItems = state.items.concat(action.item)
        }
        return{
            items: updatedItems,
            totalAmount : updatedTotalAmount
        }
    }
    if(action.type === 'REMOVE'){
        const existringCartItemindex = state.items.findIndex(item =>item.id === action.id)
        const existingItem = state.items[existringCartItemindex]
        const updatedTotalAmount = state.totalAmount - existingItem.price
        let updatedItems;
        if(existingItem.amount === 1){
             updatedItems = state.items.filter(item =>item.id !== action.id)
        }else{
            const updatedItem = {...existingItem, amount: existingItem.amount-1}
            updatedItems = [...state.items]
            updatedItems[existringCartItemindex] = updatedItem

        }
        return {
            items:updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
}
const CartProvider = props =>{
    const [cartState, dispatchCartState] = useReducer(cartReduser,defaultCartState);

    const addItemToCartComponent = item=>{
        dispatchCartState({type: 'ADD', item : item});
    }
    const removeItemToCartComponent = id =>{
        dispatchCartState({type:'REMOVE', id : id})
    }
    const cartContext = {
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem: addItemToCartComponent,
        removeItem: removeItemToCartComponent,
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>

}

export default CartProvider;