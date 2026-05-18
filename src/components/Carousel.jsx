
import { useState, useEffect } from 'react';
import { retrieveFeaturedProducts } from '../services/online-products';
import classes from './Carousel.module.scss';


const Carousel = () => {  

 const[featuredProducts, setFeaturedProducts] = useState(null);
 const [fetchStatus, setFetchStatus] = useState('PENDING');
 const [currentSlideIndex, setCurrentSlideIndex]=useState(0);
 const [currentSlide2ndIndex, setCurrentSlide2ndIndex]=useState(3);

  useEffect(() => {
    setFetchStatus('LOADING');

    retrieveFeaturedProducts()
    .then((featured)=>{
      setFeaturedProducts(featured);
      setFetchStatus('SUCCESS');
    })
    .catch((err) => {
      console.error(err);
      setFetchStatus('FAILURE');
    });
  }, []);

  const backToPrevSlide = () =>{
    setCurrentSlideIndex((prevSlideIndex)=>(prevSlideIndex-1+ featuredProducts.length)%featuredProducts.length)
    console.log(featuredProducts);
    setCurrentSlide2ndIndex((prevSlideIndex)=>(prevSlideIndex-1+ featuredProducts.length)%featuredProducts.length)
    
  }
  const proceedToNextSlide = () =>{
    setCurrentSlideIndex((prevSlideIndex)=>(prevSlideIndex+1+ featuredProducts.length)%featuredProducts.length)
    setCurrentSlide2ndIndex((prevSlideIndex)=>(prevSlideIndex-1+ featuredProducts.length)%featuredProducts.length)
  }


  return (
    <>
    {fetchStatus === 'SUCCESS' &&  featuredProducts.length > 0 && (
    <div className={classes.carousel__container}>
      <button onClick={backToPrevSlide}>
        <p className={classes.carousel__prevButton}>
          
        </p>
        
      </button>

      <div className="carousel-content">
       <a href='/ProductsPage/yakgwa/yakgwa-original'>
        <img
          src={featuredProducts[currentSlideIndex].imageUrl}  style={{width: 200}}
        />
        </a>  
        <img
          src={featuredProducts[currentSlide2ndIndex].imageUrl}  style={{width: 200}}
        />
        
       
      </div>

      <button onClick={proceedToNextSlide}>

        <p className={classes.carousel__nextButton}>

        </p>
        
      </button>
    </div>)}
    </>
  );

}
export default Carousel;
