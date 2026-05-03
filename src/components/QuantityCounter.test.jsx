import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, vi, it } from 'vitest';
import QuantityCounter from './QuantityCounter'

describe('Check if it calls onChange with the right quantity', ()=>{
  it('Should update quantity when we click on the + button', async ()=>{
    //Step 1 - Declaring
    const customer = userEvent.setup();  

    //we assign vi.fn() to onChange because it is passed from the property and we want to monitor this. But since it is not a built-in/an existing function, we cant use vi.spyOn()
    const onChange = vi.fn();

    //Step 2 - Render Component
    render(<QuantityCounter counter={3} onChange={onChange}/>);

    //Step 3 - Take the UI elements
    const incrButton = screen.getByText("+");
  
    //Step 4 - Simulate user actions
    //await because it could have an async DOM update or waiting on effects such as browser, so better use await for userEvent.click() 
    await customer.click(incrButton);

    //Step 5 - Assertion
    //toHaveBeenCalled() sends a true or false
    //toHaveBeenCalledWith(4) checks if it sends a value of 4?
    expect(onChange).toHaveBeenCalledWith(4);
  })

  it('Should update quantity when we click on the - button', async ()=>{
    //Step 1 - Declaring
    const customer2 = userEvent.setup();  
    const onAmend = vi.fn();

    //Step 2 - Render Component
    render(<QuantityCounter counter={3} onChange={onAmend}/>);

    //Step 3 - Take the UI elements
    const decrButton = screen.getByText("-");

    //Step 4 - Simulate user actions
    await customer2.click(decrButton);

    //Step 5 - Assertion
    expect(onAmend).toHaveBeenCalledWith(2);
  })

  it('Check if it disables the - button when the quantity is 0.', async ()=>{
 
    const onAmend2 = vi.fn();

    render(<QuantityCounter counter={0} onChange={onAmend2}/>);

    const decrButton = screen.getByText("-");

    //await customer3.click(decrButton) is not used, because there is no user action here. In this case there is no user action.
    
    expect(decrButton).toBeDisabled();

  });

  it('Check if it enables the + button when the quantity is 0.', async ()=>{
   
    const onAmend2 = vi.fn();

  
    render(<QuantityCounter counter={0} onChange={onAmend2}/>);

    const incrButton = screen.getByText("+");
    
    expect(incrButton).not.toBeDisabled();

  });

})