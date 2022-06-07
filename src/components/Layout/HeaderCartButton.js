import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/Cartlon"
import { useContext,useEffect,useState } from 'react'
import CartContext from '../../store/cart-context'
const HeaderCartButton = props =>{
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((curNumber,item)=>{
        return curNumber + item.amount
    },0)
    const [bump,setBump] = useState(false)
    const classsBtn = `${classes.button} ${bump ? classes.bump: ''}`

    const {items}  = cartCtx
    useEffect(()=>{
        if(items.length === 0){
            return
        }
       setBump(true)
       setTimeout(()=>{
           setBump(false)
       },[300])
       
    },[items])
    return(
        <button onClick={props.click} className={classsBtn}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your cart
            </span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>

        </button>
    )
}

export default HeaderCartButton