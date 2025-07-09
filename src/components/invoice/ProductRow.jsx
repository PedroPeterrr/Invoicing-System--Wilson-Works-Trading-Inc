import ReusableButton from "../Reusable/ReusableButton";

export default function ProductRow({ 
    product, 
    index,
    onProductChange, 
    onRemove, 
    subtotal 
}) {
  return (
    <div>
        <label htmlFor={`prod-name-${index}`}>
            Name
        </label>
        <input
            id={`prod-name-${index}`}
            value={product.name}
            onChange={e => onProductChange(index, 'name', e.target.value)}
            required
        />


        <label htmlFor={`prod-quantity-${index}`}>
            Quantity
        </label>
        <input
            id={`prod-quantity-${index}`}
            type="number" min="1"
            value={product.qty}
            onChange={e => onProductChange(index, 'qty', +e.target.value)}
            required
        />

        <label htmlFor={`prod-price-${index}`}>
            Price
        </label>
        <input
            id={`prod-price-${index}`}
            type="number" min="0" step="0.01"
            value={product.price}
            onChange={e => onProductChange(index, 'price', +e.target.value)}
            required
        />
        
        <span>Subtotal: {subtotal(product).toFixed(2)}</span>

        <ReusableButton 
            onClick={() => onRemove(index)}
        >
            Remove
        </ReusableButton>   
    </div>
  );
}
