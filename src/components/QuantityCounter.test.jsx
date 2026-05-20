import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, vi, it } from 'vitest';
import QuantityCounter from './QuantityCounter'

describe('Check if it calls onChange with the right quantity', ()=>{
  it('Should update quantity when we click on the + button', async ()=>{
    
    const customer = userEvent.setup();  
  
    const onChange = vi.fn();

    render(<QuantityCounter counter={3} onChange={onChange}/>);

    const incrButton = screen.getByText("+");
  
    await customer.click(incrButton);

    expect(onChange).toHaveBeenCalledWith(4);
  })

  it('Should update quantity when we click on the - button', async ()=>{
    const customer2 = userEvent.setup();  
    const onAmend = vi.fn();

    render(<QuantityCounter counter={3} onChange={onAmend}/>);

    const decrButton = screen.getByText("-");

    await customer2.click(decrButton);

    expect(onAmend).toHaveBeenCalledWith(2);
  })

  it('Check if it disables the - button when the quantity is 0.', async ()=>{
 
    const onAmend2 = vi.fn();

    render(<QuantityCounter counter={0} onChange={onAmend2}/>);

    const decrButton = screen.getByText("-");

    
    expect(decrButton).toBeDisabled();

  });

  it('Check if it enables the + button when the quantity is 0.', async ()=>{
   
    const onAmend2 = vi.fn();

  
    render(<QuantityCounter counter={0} onChange={onAmend2}/>);

    const incrButton = screen.getByText("+");
    
    expect(incrButton).not.toBeDisabled();

  });

})
