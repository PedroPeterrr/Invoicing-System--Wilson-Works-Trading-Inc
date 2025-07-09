import ReusableButton from '../../components/Reusable/ReusableButton';
import ProductRow from '../../components/invoice/ProductRow';
import LeftIcon from '../../assets/LeftIcon';
export default function InvoiceForm({ 
    invoice, 
    onChange,
    onProductChange, 
    onAdd, 
    onRemove, 
    onSubmit,
    navigate,
    total,
    subtotal,
    error
}) {
  return (
    <div className="main-container px-2 md:px-4 lg:px-8">
        <div className="page-card">
            <form onSubmit={onSubmit}>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <fieldset className="space-y-4">

                    <legend className="flex items-center py-2 mb-4 text-lg font-semibold text-primary md:text-2xl">
                        <ReusableButton 
                            onClick={() => navigate(-1)}
                            className='cursor-pointer'
                        >
                            <LeftIcon width="20px" height="20px" color="var(--color-primary)" />
                        </ReusableButton>
                        <span className="ml-2">Invoice Details</span>
                    </legend>

                    <div className="field-row-invoice-form"> 
                        <label htmlFor="invoice-number" className="field-label-invoice-form">
                            Invoice #
                            <span className="required-symbol">*</span>
                        </label>

                        <input
                            id="invoice-number"
                            className="input-field"
                            name="number" 
                            value={invoice.number}
                            onChange={onChange} 
                            required
                        />
                    </div>
                
                    <div className="field-row-invoice-form">
                        <label htmlFor="invoice-date" className="field-label-invoice-form">
                            Date
                            <span className="required-symbol">*</span>
                        </label>

                        <input
                            id="invoice-date"
                            className="input-field"
                            type="date" 
                            name="date"
                            value={invoice.date}
                            onChange={onChange} 
                            required
                        />
                    </div>

                    <div className="field-row-invoice-form">
                        <label htmlFor="invoice-customer" className="field-label-invoice-form">
                            Customer
                            <span className="required-symbol">*</span>
                        </label>
                        <input
                            id="invoice-customer"
                            className="input-field"
                            name="customer" 
                            value={invoice.customer}
                            onChange={onChange} 
                            required
                        />
                    </div>
                </fieldset>

                <section aria-labelledby="products-heading" className="mt-4">
                    <h2 className="section-heading-invoice-form">Products</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-secondary sticky top-0 z-10">
                            <th className="table-header-list-page">Product Name</th>
                            <th className="table-header-list-page">Quantity</th>
                            <th className="table-header-list-page">Price</th>
                            <th className="table-header-list-page">Sub Total</th>
                            <th className="table-header-list-page"></th>
                            </tr>
                        </thead>
                        <tbody>
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
                        </tbody>
                        </table>
                    </div>

                    <div className="section-actions-invoice-form">
                        <ReusableButton 
                            onClick={onAdd}
                            className="btn-primary"
                        >
                            Add Product
                        </ReusableButton>
                    </div>
                    
                    <div className="mt-2 text-right font-medium">
                        <span className="section-total-invoice-form">
                            Total: {" "}
                            {total.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </span>
                    </div>
                </section>

                <div className="form-footer-invoice-form">
                    <ReusableButton 
                        type="submit"
                        disabled={invoice.products.length === 0}
                        className="btn-primary"
                    > 
                        Save Invoice 
                    </ReusableButton>
                </div>
            </form>    
        </div>
    </div>
  )
}
