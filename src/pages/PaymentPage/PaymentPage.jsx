import { useLocation, useNavigate } from 'react-router'; 
import classes from '../PaymentPage/PaymentPage.module.scss'
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout'; 
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51Srcj0K8aCQiHv31EzQkn1IBisSbxs8r0j6zzf8dxoOrK3wtYGCd4cdvIUowj7kTGTtPvmDx4MPbVDl0wQfQvdIC00dx04aAWP');

export default function PaymentPage() {
 const location = useLocation();
 const navigate= useNavigate();
 const { quantities, totalPrice, allProduct } = location.state || {};  

 let products=allProduct ? allProduct.map(eachProduct=>eachProduct):[];
 let product = quantities;

 fetch('/create-checkout-session', { method: 'POST' })
  .then((response) => response.json())
  .then((session) => {
    window.location.href = session.url; 
  });

  const payNow =()=>{
    navigate('/ThankYouPage')
  }

  return (
    <div>

      <h2>Payment Page</h2>
      <div>

  {products.map((eachProduct) => {
    const quantity=quantities[eachProduct.id];
    
    return(

      
    quantity> 0 && (
      <div key={eachProduct.id}>
        <img src={eachProduct.imageUrl} alt={eachProduct.name}/>
        <p>{eachProduct.name.charAt(0).toUpperCase() + eachProduct.name.slice(1)} - {eachProduct.flavour} (Qty: {quantity})</p>
      </div>
          ))
    })
        
  }
      </div>
    
      <h3>Total Payment: ${totalPrice.toFixed(2)}</h3>
      <button onClick={payNow}>Pay now</button>
    </div>
  );
}
