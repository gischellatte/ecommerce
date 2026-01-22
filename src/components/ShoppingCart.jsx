export default function ShoppingCart({ allTotal=0 }) {
  return (
    <div>
      {/*<h3>Shopping Cart</h3>*/}
      
      <p>Total: ${allTotal.toFixed(2)}</p>
    </div>
  );
}
