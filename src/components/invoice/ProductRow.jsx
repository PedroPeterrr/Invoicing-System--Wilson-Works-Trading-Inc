import ReusableButton from "../Reusable/ReusableButton";

export default function ProductRow({ 
    product, 
    index,
    onProductChange, 
    onRemove, 
    subtotal 
}) {
  return (
    <tr>
        <td className="table-details-list-page">
            <input
                id={`prod-name-${index}`}
                className="input-field"
                value={product.name}
                onChange={e => onProductChange(index, 'name', e.target.value)}
                required
            />  
        </td>

        <td className="table-details-list-page">
            <input
            id={`prod-quantity-${index}`}
            type="number"
            min="1"
            className="input-field"
            value={product.qty}
            onChange={e => onProductChange(index, 'qty', +e.target.value)}
            required
            />
        </td>

        <td className="table-details-list-page">
            <input
                id={`prod-price-${index}`}
                type="number"
                min="1"
                step="0.01"
                className="input-field"
                value={product.price}
                onChange={e => onProductChange(index, 'price', +e.target.value)}
                required
            />
        </td>
        
        <td className="table-details-list-page">
            {subtotal(product).toLocaleString('en-US',
             {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}
        </td> 

        <td className="table-details-list-page">
        <ReusableButton
            onClick={() => onRemove(index)}
            className="px-3 py-1 bg-warning/10 text-warning rounded hover:bg-warning/20 cursor-pointer"
        >
            Remove
        </ReusableButton>
      </td>
    </tr>
  );
}
