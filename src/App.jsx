import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'
import Home from '../src/pages/Homepage/Homepage'
import NotFound from '../src/pages/NotFoundPage/NotFound'
import PaymentPage from '../src/pages/PaymentPage/PaymentPage'
import ThankYouPage from '../src/pages/ThankYouPage/ThankYouPage'
import ProductsPage  from '../src/pages/ProductsPage/ProductsPage'
import ProductsListPage  from '../src/pages/ProductsListPage/ProductsListPage'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

 const stripePromise = loadStripe("51Srcj0K8aCQiHv31EzQkn1IBisSbxs8r0j6zzf8dxoOrK3wtYGCd4cdvIUowj7kTGTtPvmDx4MPbVDl0wQfQvdIC00dx04aAWP");
function App() {
 
  return (
    <>
  <h1>Welcome To Hanok Delights</h1>
  
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />   
        
        <Route path="/ProductsPage" element={<ProductsListPage/>} />
        <Route path="/ProductsPage/:category/:id" element={<ProductsPage/>} />
        <Route path="/PaymentPage" element={<PaymentPage/>} />  
        <Route path="/ThankYouPage" element={<ThankYouPage/>} />  
        <Route path="/*" element={<NotFound/>} />
        
      </Routes>
  </BrowserRouter>
  <div>
    <footer>Copyright 2026</footer>
  </div>
  
    </>
  )

}
export default App
