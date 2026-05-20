import { collection, doc, getDoc,  getDocs, onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firestore-config';

export const retrieveProducts = async (category, id) => {
       const docRef = doc(db, 'ecommerce-products', 
        'onlineCatalogue', 
        category, 
        id);
    const snapshot  = await getDoc(docRef);


    if(!snapshot.exists()){
        throw new Error('Sorry, cannot find the product');
    }
    return {id: snapshot.id, ...snapshot.data()};
}

export const retrieveAllProducts = async () => {

    
    let prodCategories = [ "almond", "jam", "riceCake", "yakgwa"];
    let fullProducts=[];
    
    
    for (const pc of prodCategories){ 
    const allProdsRef = collection(db, 'ecommerce-products', 'onlineCatalogue', pc);
    const productsDocs = await getDocs(allProdsRef);
    const prods =  productsDocs.docs.map((doc) => ({ id: doc.id, ...doc.data(), category:pc })); //we need to add the id because it does not contain ID
   
    fullProducts =[...fullProducts, ...prods];
   
  }    
   if (fullProducts.length === 0) {
        throw new Error('No prods found');
    }
  return fullProducts;
}

export const retrieveFeaturedProducts = async () => {
let featureProdCategories = ["almonds", "jams"];
let fullFeaturedProducts=[];
for (const fp of featureProdCategories){
const featCateg = collection(db, 'ecommerce-products', 'featuredProductsCatalog', fp);
const featuredSnapshot = await getDocs(featCateg);
const mappedFeaturedProds = featuredSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), category:fp }));

  fullFeaturedProducts=[... fullFeaturedProducts, ...mappedFeaturedProds]
  }
  if (fullFeaturedProducts.length === 0) {
        throw new Error('No new products yet.');
    }
  return fullFeaturedProducts;
}


//black sesame yakgwa image source: https://www.threebarfifty.com/product-page/yakgwa-black-sesame
