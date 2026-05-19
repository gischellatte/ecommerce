import { useState } from 'react';
import classes from '../pages/ProductsListPage/ProductsListPage.module.scss'


export default function QuantityCounter( {counter, onChange, stockNo} ){

  const increaseQuant = () => {
   if (counter >= stockNo) return;
   //setCount(count + 1);
    onChange(counter + 1);
    
  }
   const decreaseQuant = () => {

    onChange(counter - 1);
  }


return (
    <>
    <button onClick={decreaseQuant} disabled={counter===0}  className={classes.button__decreaseQuant}>
        -
    </button>
    {counter}
    
    <button onClick={increaseQuant} disabled={counter>= stockNo} className={classes.button__increaseQuant}>
        +
    </button>
   
    </>
    )

}
