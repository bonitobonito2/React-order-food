
import Header from "./components/Layout/Header";
import React, {useState} from 'react'
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/cartProvider";

function App() {
  const [cartVisability, setCartVisability] = useState(false)
  const clickCart = () =>{
    setCartVisability(!cartVisability)
  }
  return (
    <CartProvider>
      {cartVisability && <Cart click = {clickCart}/>}
        <Header click = {clickCart} />
        <main>
        <Meals />
        </main>
    </CartProvider>
 
  );
}

export default App;
