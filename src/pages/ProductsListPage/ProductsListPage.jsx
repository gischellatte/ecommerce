import { useState, useEffect} from "react";
import { Link, useNavigate  } from 'react-router';
import { retrieveAllProducts } from "../../services/online-products";
import QuantityCounter from '../../components/QuantityCounter';
import ShoppingCart from '../../components/ShoppingCart';
import classes from '../ProductsListPage/ProductsListPage.module.scss'

export default function ProductsListPage() {
  const [allProduct, setAllProducts] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('PENDING');
  const [quantities, setQuantities] = useState({});
  const navigate= useNavigate();

  useEffect(() => {
    setFetchStatus('LOADING');
    retrieveAllProducts()
      .then((data) => {
        setAllProducts(data);
        setFetchStatus('SUCCESS');
      })
      .catch((error) => {
        console.log(error);
        setFetchStatus('FAILURE');
      });
  }, []);

  const doPayment =()=>{
    navigate('/PaymentPage', {state:{quantities, totalPrice, allProduct}})
  }

  // Calculate the total price when quantities change
  const totalPrice = fetchStatus === 'SUCCESS'
    ? allProduct.reduce((sum, product) => {
        const qty = quantities[product.id] || 0;
        return sum + product.price * qty;
      }, 0)
    : 0;

  // Handle quantity changes for each product
  const handleQuantityChange = (productId, newCount) => {


  const selectedProduct = allProduct.find(
    (product) => product.id === productId
  );

  if (!selectedProduct) return;

  const limitedQuantity = Math.min(
    selectedProduct.stock,
    Math.max(0, newCount)
  );
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, newCount), 
    }));
    

  };

  const groupedProducts=fetchStatus === 'SUCCESS' ? allProduct.reduce((acc, oneProd)=>{
  
  if(!acc[oneProd.category]){
    acc[oneProd.category]=[];
  }
  acc[oneProd.category].push(oneProd);
  return acc;
  
}, {}) : {};

  return (
    <>

  <div>

    {fetchStatus === 'SUCCESS' && 
    Object.keys(groupedProducts).map(category=>(
      <div key={category} className={classes.productList}>
        <h2 className={classes["productList__title"]}>{category}</h2>
        <div className={classes.productList__displayCateg}>

        {/* Displays each product category */}
         {groupedProducts[category].map((singleProduct) => (
          <div key={singleProduct.id} className={classes.productList__displaySingle}>
            <div>
              
              <img src={singleProduct.imageUrl}/>
              <p>Price per product: ${singleProduct.price}</p>
              <Link to={`/ProductsPage/${singleProduct.category}/${singleProduct.id}`}>
              <p> Check more details</p>
              </Link>
          </div>
          
     
          
          <QuantityCounter
            counter={quantities[singleProduct.id] || 0} maxStock={singleProduct.stock} stockNo={singleProduct.stock}
            onChange={(newCount) => handleQuantityChange(singleProduct.id, newCount) 
            }         
          />
          </div>
          ))
        }

        </div>
      </div>
   )
  )}
      
  </div>
  <div className={classes.icon__cart}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#e4b921" d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
    {/* Pass total price to the ShoppingCart component */}
      <div  className={classes.total__cart}> <ShoppingCart allTotal={totalPrice} /></div>

      {totalPrice > 0 &&
        <button onClick={doPayment}>Ready To Pay</button>
      }
    </div>

  </>
  );
}
