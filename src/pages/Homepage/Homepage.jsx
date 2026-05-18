import { useEffect, useState } from 'react';
import { Link} from 'react-router';
import { retrieveFeaturedProducts, retrieveAllProducts } from '../../services/online-products';
import Carousel from '../../components/Carousel';
import classes from '../Homepage/Homepage.module.scss';


const Home = () => {

 const[featuredProducts, setFeaturedProducts]=useState(null);
 const[everyProducts, setEveryProducts]=useState(null);
 const [fetchStatus, setFetchStatus] = useState('PENDING');


  useEffect(()=>{
   setFetchStatus('LOADING');

  retrieveFeaturedProducts()
    .then((featured) => { //the data in 'featured' comes from retrieveFeaturedProducts()
      setFeaturedProducts(featured);
      setFetchStatus('SUCCESS');
      console.log("Featuring: "+featuredProducts);
    })
    .catch((err) => {
      console.error(err, "Cannot show featured products.");
      setFetchStatus('FAILURE');
    });
}, []);

  useEffect(()=>{
   setFetchStatus('LOADING');

  retrieveAllProducts()
    .then((all) => { 
      setEveryProducts(all);
      setFetchStatus('SUCCESS');
      console.log("Hanok Delights products: ", all);
    })
    .catch((err) => {
      console.error(err, "Cannot show previewed products.");
      setFetchStatus('FAILURE');
    });
}, []);

  return (
    <>
      <div>
         {
          fetchStatus === 'SUCCESS' && <Carousel/>
        }
      </div>
      <div  className={classes.featuredProds}>
        <h2>A Sneakpeek to our products</h2>
         {
          fetchStatus === 'SUCCESS' && everyProducts && 
          
          <div className={classes.featuredProds__range}>{everyProducts.slice(0, 5).map((singleProduct) => (
           <div key={singleProduct.id} className={classes.featuredProds__single}>          
            <img src={singleProduct.imageUrl} alt={singleProduct.name}/>        
            <p className={classes.featuredProds__caption}>{singleProduct.name}-{singleProduct.flavour}</p>       
           </div>
            ))
          }</div>
        }
      </div>
      <Link to="/ProductsPage" className={classes.allProds__link}>View All Products</Link>
    </>
  );
};

export default Home;
