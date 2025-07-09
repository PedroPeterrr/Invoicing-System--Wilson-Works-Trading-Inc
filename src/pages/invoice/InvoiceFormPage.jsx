import { useEffect, useState } from 'react'
import { getInvoiceById, createInvoice, updateInvoice } from '../../api/invoiceService'
import { useParams, useNavigate } from 'react-router-dom'

import { 
  LoadingBar,
  InvoiceForm 
} from '../../components'

export default function InvoiceFormPage() {
  const { id } = useParams()   
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const [invoice, setInvoice] = useState({
    number: '',
    date: '',
    customer: '',
    products: []
  })

    const [isSaving, setIsSaving] = useState(false)


  useEffect(() => {
    async function fetchInvoice() {
      if (id && id !== 'new') {
        try {
          const data = await getInvoiceById(id);
          if (data) setInvoice(data);
        } catch (error) {
          setError(error.message || 'Failed to delete invoice')
          navigate('/invoices', { replace: true });
        }
      }
    }

    fetchInvoice();
  }, [id, navigate]);

  function handleChange(e) {
    const { name, value } = e.target
    setInvoice(inv => ({ ...inv, [name]: value }))
  }

  function handleProductChange(idx, field, value) {
    setInvoice(inv => {
      const products = inv.products.map((p, i) =>
        i === idx ? { ...p, [field]: value } : p
      )
      return { ...inv, products }
    })
  }

  function addProduct() {
    setInvoice(inv => ({
      ...inv,
      products: [
        ...inv.products, 
        { 
            name: '',
            qty: 1, 
            price: 1,
            id: Date.now().toString() + Math.random().toString(36).slice(2)
        }]
    }))
  }

  function removeProduct(idx) {
    setInvoice(inv => ({
      ...inv,
      products: inv.products.filter((_, i) => i !== idx)
    }))
  }

  const subtotal = (p) => p.qty * p.price
  const total = invoice.products.reduce((sum, p) => sum + subtotal(p), 0)

 async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setIsSaving(true)

    const payload = {
      ...invoice,
      total,
      products: invoice.products.map(p => ({
        ...p,
        subtotal: subtotal(p)
      }))
    }

    const apiCall = id === 'new'
      ? createInvoice(payload)
      : updateInvoice(id, payload)

    const waitFive = new Promise(res => setTimeout(res, 3000))

    try {
      await Promise.all([apiCall, waitFive])
      navigate('/invoices', { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      {isSaving && <LoadingBar />}
      <InvoiceForm
          invoice={invoice}
          onChange={handleChange}
          onProductChange={handleProductChange}
          onAdd={addProduct}
          onRemove={removeProduct}
          onSubmit={onSubmit}
          total={total}
          subtotal={subtotal}
          navigate={navigate}
          error={error}
      />
    </>
  )
}
