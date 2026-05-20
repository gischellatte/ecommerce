import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, vi, it } from 'vitest';
import ShoppingCart from './ShoppingCart';

describe('Test the summing up ability of the Shopping cart', ()=>{
    it('Should sum up the total items',()=>{
    render(<ShoppingCart allTotal={15.009}/>);

    const totalAmount = screen.getByText(/Total/);
    expect(totalAmount).toHaveTextContent(/15\.01/);
    })
    
});
