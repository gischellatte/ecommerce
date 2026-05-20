import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, vi, it } from 'vitest';
import {retrieveFeaturedProducts} from '../services/online-products' 
import Carousel from './Carousel'


 vi.mock('../services/online-products', ()=>({
           retrieveFeaturedProducts: vi.fn()
        }));

describe('Test the e-commerce carousel', ()=>{

    it('Should update the product display when user clicks on the carousel', async ()=> {
        
        const mockProducts = [{imageUrl: 'img1.jpg'},{imageUrl: 'img2.jpg'},{imageUrl: 'img3.jpg'},{imageUrl: 'img4.jpg'}, {imageUrl: 'img5.jpg'}]; 

        retrieveFeaturedProducts.mockResolvedValue(mockProducts);

        render(<Carousel/>)

        await waitFor(()=> expect 
        (screen.getAllByRole('img').length).toBeGreaterThan(0));

        let cust = userEvent.setup();

        const firstProdImage = screen.getAllByRole('img')[0].src; 

        const caroNextButton = screen.getAllByRole('button')[1];
        
        await cust.click(caroNextButton);

        const updatedProdImage = screen.getAllByRole('img')[0].src; 

        expect(firstProdImage).not.toBe(updatedProdImage);
    })
});
