import ReusableButton from '../../components/Reusable/ReusableButton';
import ProductRow from '../../components/invoice/ProductRow';

export default function InvoiceForm({ 
    invoice, 
    onChange,
    onProductChange, 
    onAdd, 
    onRemove, 
    onSubmit,
    navigate,
    total,
    subtotal
}) {
  return (
    <form onSubmit={onSubmit}>
       <nav aria-label="Form navigation">
            <ReusableButton 
                type="button"
                onClick={() => navigate(-1)}
            >
                Back
            </ReusableButton>
        </nav>

        <fieldset>
            <legend>Invoice Details</legend>

            <div>
                <label htmlFor="invoice-number">Invoice Number</label>
                <input
                    id="invoice-number"
                    name="number" 
                    value={invoice.number}
                    onChange={onChange} 
                    required
                />
            </div>
        
            <div>
                <label htmlFor="invoice-date">Date</label>
                <input
                    id="invoice-date"
                    type="date" 
                    name="date"
                    value={invoice.date}
                    onChange={onChange} 
                    required
                />
            </div>

            <div>
                 <label htmlFor="invoice-customer">Customer</label>
                <input
                    id="invoice-customer"
                    name="customer" 
                    value={invoice.customer}
                    onChange={onChange} 
                    required
                />
            </div>
        </fieldset>

        <section aria-labelledby="products-heading">
            <h3 id="products-heading">Products</h3>
            
            {invoice.products.map((p, i) => (
               <ProductRow
                    key={p.id}
                    product={p}
                    index={i}
                    onProductChange={onProductChange}
                    onRemove={onRemove}
                    subtotal={subtotal}
                />
            ))}

                <ReusableButton 
                    onClick={onAdd}
                >
                    Add Product
                </ReusableButton>

            <h2>Total: {total.toFixed(2)}</h2>
        </section>
        
        <ReusableButton 
            type="submit"
            disabled={invoice.products.length === 0}
        > 
            Save Invoice 
        </ReusableButton>
    </form>
  )
}
