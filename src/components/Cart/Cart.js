import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import CheckoutForm from './CheckoutForm'
const Cart = props =>{
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}` 
    const [showCheck, setShowCheck] = useState(false)
    const [isSubmiting, setIsSubmiing] = useState(false)
    const [didSubmit,setDidSubmit] = useState(false)
    const hasItems = cartCtx.items.length > 0
 
    const confirmHandler = async (datas)=>{
        
      setIsSubmiing(true)
      setDidSubmit(false)
      await fetch('https://react-4f330-default-rtdb.firebaseio.com/orders.json',{
                method: 'POST',
                body : JSON.stringify({
                    user : datas,
                    orderedItems : cartCtx.items
                })
            })
      setIsSubmiing(false)
      setDidSubmit(true)      
        

    }

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
       { !isSubmiting && showCheck && <CheckoutForm  onConfirm = {confirmHandler} change = {setShowCheck} />}
       {isSubmiting && <p>submiting... </p>}
       {didSubmit && <p>submited</p>}
       <div className={classes.actions}>
        <button onClick={props.click} className={classes['button--alt']}>Close</button>
       {hasItems && <button onClick={()=>setShowCheck(true)} className={classes.buttons}>Order</button> }
       </div>
   </Modal>
}

export default Cart;