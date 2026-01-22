import { useState } from 'react';
import classes from '../pages/ProductsListPage/ProductsListPage.module.scss'


export default function QuantityCounter( {counter, onChange} ){
  //const [count, setCount] = useState(initialVal);
  


  const increaseQuant = () => {
   // if (count >= stockNo) return;
 //   setCount(count + 1);
    onChange(counter + 1);
    
  }
   const decreaseQuant = () => {
   // if (count <= 0 ) return;
   // setCount(count - 1);
    onChange(counter - 1);
  }


return (
    <>
    <button onClick={increaseQuant} className={classes.button__increaseQuant}>
        +
    </button>
    {counter}
    <button onClick={decreaseQuant} disabled={counter===0}  className={classes.button__decreaseQuant}>
        -
    </button>
   
    </>
    )

}