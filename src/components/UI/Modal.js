import { Fragment } from 'react'
import classes from './Modal.module.css'
import  ReactDOM  from 'react-dom'


const Backdrop  = props =>{
    return <div onClick={props.click} className={classes.backdrop}>
      
    </div>
}

const ModalOverLay = props =>{
    return <div className={classes.modal}>
        <div className={classes.content}>
            {props.children}
        </div>
    </div>
}


const overLayId= document.getElementById('overLays')
const Modal = props =>{
    return (
       <Fragment>
          {ReactDOM.createPortal(<Backdrop click = {props.click} />,overLayId)}
          {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>,overLayId)}
       </Fragment>
    )
}

export default Modal;