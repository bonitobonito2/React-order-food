import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import { useRef,useState } from 'react'

const MealItemForm = props =>{
    const [validForm, setValidForms] = useState(true)
    const amount = useRef()
    const submitHandler = event =>{
        event.preventDefault()
        const enteredAmount = amount.current.value;
        const enteredAmountNumber = +enteredAmount
        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setValidForms(false)
            return
        }
        props.AddtoCartHandler(enteredAmountNumber)
    }
return <form onSubmit={submitHandler} className={classes.form}>
    <Input ref = {amount} label = 'Amount' input = {{
        id : `amount ${props.ID}`,
        type : 'number',
        min:'1',
        max:'5',
        step:'1',
        defaultValue : '1',
    }}/>
    <button id={props.ID} >+ Add</button>
    {!validForm && <p>please enter valid amount (1-5)</p>}
</form>
}
export default MealItemForm