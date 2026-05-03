import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, vi, it } from 'vitest';
import {retrieveFeaturedProducts} from '../services/online-products' 
import Carousel from './Carousel'

//use vi.mock because we need data, but we dont want to really call API

//Step 1 - Mocks the module
 vi.mock('../services/online-products', ()=>({
        //Step 1. Understand the dependency
           retrieveFeaturedProducts: vi.fn()
        }));

describe('Test the e-commerce carousel', ()=>{

    it('Should update the product display when user clicks on the carousel', async ()=> {
       
        //Step 2 - Mocks the product 
        const mockProducts = [{imageUrl: 'img1.jpg'},{imageUrl: 'img2.jpg'},{imageUrl: 'img3.jpg'},{imageUrl: 'img4.jpg'}, {imageUrl: 'img5.jpg'}]; 

        //Step 3 - Sets Response API
        retrieveFeaturedProducts.mockResolvedValue(mockProducts);

        //Step 4 - Renders Component
        render(<Carousel/>)

        //Step 5 - Wait until data appears in the UI & UI is ready
        //use waitFor because we use useEffect in the Carousel
        await waitFor(()=> expect 
        (screen.getAllByRole('img').length).toBeGreaterThan(0));

        //Step 6 - Prepares user interaction
        let cust = userEvent.setup();

        //Step 7 - take UI state before user clicks on the button
        const firstProdImage = screen.getAllByRole('img')[0].src; 

        //Step 8 - take the next button
        const caroNextButton = screen.getAllByRole('button')[1];
        
        //Step 9 - User clicks (changes carousel state)
        await cust.click(caroNextButton);

        //Step 10 -Take UI after we click
        const updatedProdImage = screen.getAllByRole('img')[0].src; 

        //Step 11 - Assertion
        expect(firstProdImage).not.toBe(updatedProdImage);
    })
});