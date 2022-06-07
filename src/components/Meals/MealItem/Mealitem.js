import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import { useContext } from 'react'
import CartContext from '../../../store/cart-context'
const MealItem = props=>{
    const cartCtx = useContext(CartContext)
    const price = `$${props.price.toFixed(2)}`
    const AddtoCartHandler = amount =>{
      cartCtx.addItem({
          id : props.id,
          name : props.name,
          amount : amount,
          price : props.price
      })
    }
    return <li  className={classes.meal}>
        <div>
            <h3>Name : {props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
        <MealItemForm AddtoCartHandler = {AddtoCartHandler} ID = {props.id} />
        </div>
    </li>
}

export default MealItem;