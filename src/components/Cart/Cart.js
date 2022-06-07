import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
const Cart = props =>{
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}` 
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = id=>{
      cartCtx.removeItem(id)
    }
    const addItemTOCardHandler = item =>{
        cartCtx.addItem({
            id :item.id,
            name : item.name,
            price : item.price,
            amount : 1
        })
    }
    const CartItems = <ul className={classes['cart-items']}> 
    {cartCtx.items.map(item => (
    <CartItem
     key = {item.id}
     name = {item.name}
     price = {item.price}
     amount = {item.amount}
     onRemove = {cartItemRemoveHandler.bind(null, item.id)}
     onAdd = {addItemTOCardHandler.bind(null,item)}
      />
    
    ) )}
     </ul>

   return <Modal click = {props.click}>
       {hasItems && CartItems}
       {!hasItems && <p>Not added items yet</p>}
       <div className={classes.total}>
           <apan>Total amount</apan>
           <span>{totalAmount}</span>
       </div>
       <div className={classes.actions}>
        <button onClick={props.click} className={classes['button--alt']}>Close</button>
       {hasItems && <button className={classes.buttons}>Order</button> }
       </div>
   </Modal>
}

export default Cart;