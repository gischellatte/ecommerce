export default function ShoppingCart({ allTotal=0 }) {
  return (
    <div>
      <p>Total: ${allTotal.toFixed(2)}</p>
    </div>
  );
}
