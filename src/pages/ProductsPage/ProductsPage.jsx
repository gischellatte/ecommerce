import { useEffect, useState } from 'react';
import { useParams,  Link, useNavigate } from 'react-router';
import { retrieveProducts } from '../../services/online-products';
import QuantityCounter from '../../components/QuantityCounter';
import ShoppingCart from '../../components/ShoppingCart';
import classes from '../ProductsPage/ProductsPage.module.scss';

export default function ProductsPage() {
  const [product, setProduct] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('PENDING');
  const [counter, setCounter] = useState(0); // Holds the selected quantity
  const [subTotal, setSubTotal] = useState(0); 
  const [allTotal, setAllTotal] = useState(0); 
  const [quantities, setQuantities] = useState({});//hold quantities for multiple products 
  const [allProduct, setallProduct]= useState([]);//Store all products (if there is more than 1 product)
  const {category, id } = useParams();
  const navigate= useNavigate();

  useEffect(() => {
    if (!category || !id) return;

    setFetchStatus('LOADING');

    retrieveProducts(category, id)
      .then((product) => {
        setProduct(product);
        setallProduct([product]);
        setFetchStatus('SUCCESS');
      })
      .catch(() => setFetchStatus('FAILURE'));
  }, [category, id]);

   useEffect(() => {
    setAllTotal(subTotal)
    console.log("all total"+ allTotal)
   }, [subTotal]);

   
  // Handler to update the quantity in the parent component (ProductsPage)
  const handleQuantityChange = (newCount) => {
   setCounter(newCount);
   setSubTotal(product.price*newCount);
   setQuantities({...quantities, [product.id]: newCount})
  };
  

  const doPayment =()=>{
    const paymentState ={
      quantities, totalPrice: allTotal, allProduct
    }
    navigate('/PaymentPage', {state:paymentState})//pass data to the payment page
  }

  return (
    <div>
      {fetchStatus === 'SUCCESS' && product && (
        <div>
          <img src={product.imageUrl} className={classes.product_image} alt={product.name} />
          <h3>{product.name.charAt(0).toUpperCase() + product.name.slice(1)} - {product.flavour}</h3>

          {/* Pass handleQuantityChange as onChange to QuantityCounter */}
          <QuantityCounter
            initialVal={0}
            stockNo={product.stock}
            onChange={handleQuantityChange}
            counter={counter}
          />
          <p>Price per Product: ${product.price}</p>
          {/* Pass product and counter to ShoppingCart */}
          <p>Total: {allTotal.toFixed(2)} </p>
          
          {allTotal>0 &&
      <button onClick={doPayment}>Ready To Pay</button>
      }   
        </div>
      )}
    </div>
  );

  //green tea yakgwa image credit: Macaron daisuki blog
}
