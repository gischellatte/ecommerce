import { collection, doc, getDoc,  getDocs, onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firestore-config';

export const retrieveProducts = async (category, id) => {
    
     // Firestore path: ecommerce-products / onlineCatalogue / <category> / <id>
     //Path: ecommerce (collection)/onlineCatalogues(document)/category/productID

     //Rule: odd = collection, even = document
     //even number of params after db -> doc(db, 'a', 'b', 'c', 'd'), d is a document ( we refer to a document in a doc). so 'd' is a document if that points to a specific document inside collection c
    
    const docRef = doc(db, 'ecommerce-products', //If a function uses doc() -> it must receive IDs, if a page lists many items -> it must use getDocs() and arrays
        'onlineCatalogue', 
        category, 
        id);//refers to a specific document
    const snapshot  = await getDoc(docRef); //async function that fetches data


    if(!snapshot.exists()){
        throw new Error('Sorry, cannot find the product');
    }
    return {id: snapshot.id, ...snapshot.data()};
}

export const retrieveAllProducts = async () => {
 
    //category for dynamic selection
    let prodCategories = [ "almond", "jam", "riceCake", "yakgwa"];
    let fullProducts=[];
    
    //can't put categories as a plaintext here, because there are multiple categories
    //Rule: retrieving all products mean we need to specify the categories, because the system cannot tell how many categories we have and we must tell them
    for (const pc of prodCategories){ //for of loop works with async await, for each loop does not
    const allProdsRef = collection(db, 'ecommerce-products', 'onlineCatalogue', pc);
    const productsDocs = await getDocs(allProdsRef);
    const prods =  productsDocs.docs.map((doc) => ({ id: doc.id, ...doc.data(), category:pc })); //we need to add the id because it does not contain ID
    //we need data() in ...doc.data() because doc is a DocumentSnapshot object. it is not directly mutable, which means we cannot spread it. 
    //doc.data() returns a plain JS object containing document data, which is mutable and can be spread to a new object
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