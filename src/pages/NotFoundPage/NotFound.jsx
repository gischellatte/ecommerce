import { BrowserRouter, Route, Routes } from 'react-router';
import { Link } from 'react-router'

const NotFound =()=>{
    return (
     <div>
        <header>
            <h1>The Page you are looking for cannot be found.</h1>
        </header>
        
        <h3>
            <Link to="/">Back to the Homepage</Link><br/>

        </h3>
        <footer>Copyright 2026</footer>
     </div> 
        
    )
}


export default NotFound;