import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/Mealitem';
import { useEffect, useState } from 'react';


const AvailableMeals = () =>{
  const [meals,setMeals] = useState([])
  const [loading,setLoading]= useState(false)
  const [error,setError] = useState(false)
    useEffect(()=>{
    
      const fetchMeals = async ()=>{
        setLoading(true)
       const response = await fetch('https://react-4f330-default-rtdb.firebaseio.com/meals.json')
       if(!response.ok){
        setLoading(false)
        console.log('shemovedi')
        setError(true)
        throw new Error('something went wrong')
        
       }
       const data = await response.json()
       const loadedMeals = []
       for(const key in data){
        loadedMeals.push({
          id: key,
          name : data[key].name,
          description : data[key].description,
          price : data[key].price,
        })
       }
       setMeals(loadedMeals)
       setLoading(false)
      }
      try{
        fetchMeals()
      }catch(error){
        setError(error.message)
      }
  
    },[])
    const mealsList = meals.map(meal =>
    <MealItem 
         key = {meal.id}
         id = {meal.id}
         name = {meal.name}
         description = {meal.description}
         price = {meal.price} />)
         
    if(loading){
      return<section  className={classes.meals}>
        <Card>
        <p>loading...</p>
        </Card>
     
      </section>
    }

    if(error){
      <section  className={classes.meals}>
        <Card>
        <p>mhm</p>
        </Card>
     
      </section>
    }

    return <section className={classes.meals}>
        <Card>
        <ul>
            {mealsList}
        </ul>
       
        </Card>
       
    </section>
}

export default AvailableMeals;