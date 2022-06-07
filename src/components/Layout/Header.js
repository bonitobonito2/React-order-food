
import {Fragment} from "react";
import mealImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
const Header = (props)=>{
    return(
        <Fragment>
            <header className={classes.header} >
                <h1>ReactMeals</h1>
                <HeaderCartButton click = {props.click} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealImage} alt = 'food' />
            </div>
        </Fragment>
    )
}


export default Header;