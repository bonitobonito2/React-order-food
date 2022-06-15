import classes from './CheckoutForm.module.css';
import { useRef, useState } from 'react';
const CheckoutForm = (props) => {
  const nameValue  = useRef()
  const streetValue  = useRef()
  const postalValue  = useRef()
  const cityValue  = useRef()
  const [sendForm, setSendForm] = useState({
    name : true,
    street : true,
    postalCode  : true,
    city : true
  })

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameValue.current.value
    const enteredStreet = streetValue.current.value
    const enteredPostal = postalValue.current.value
    const enteredCity = cityValue.current.value
    if(enteredCity.trim().length == 0 || enteredName.trim().length == 0 || enteredStreet.trim().length == 0 || enteredPostal.trim().length ===0 ){
        alert('ups')
        return
    }else{
        setSendForm({
            name : enteredName,
            street : enteredStreet,
            postalCode : enteredPostal,
            city: enteredCity
        })
            props.onConfirm({
                name : enteredName,
                street : enteredStreet,
                postalCode : enteredPostal,
                city: enteredCity
            })
    

    
    }

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameValue} type='text' id='name' />
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input ref={streetValue} type='text' id='street' />
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalValue} type='text' id='postal' />
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input ref={cityValue} type='text' id='city' />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={()=>props.change(false)}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;