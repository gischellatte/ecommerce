import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, vi, it } from 'vitest';
import ShoppingCart from './ShoppingCart';

describe('Test the summing up ability of the Shopping cart', ()=>{
    it('Should sum up the total items',()=>{
    render(<ShoppingCart allTotal={15.009}/>);
    //If we use getByText("Total"), you may need to exactly match it with <p>Total: $</p>
    const totalAmount = screen.getByText(/Total/);// getByDisplayValue() is used for <input> and <textarea>
    expect(totalAmount).toHaveTextContent(/15\.01/);
    })
    
});