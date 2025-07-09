import React, { useEffect, useState } from 'react'
import { getInvoiceById, createInvoice, updateInvoice } from '../../api/invoiceService'
import { useParams, useNavigate } from 'react-router-dom'
import InvoiceForm from '../../components/invoice/InvoiceForm'

export default function InvoiceFormPage() {
  const { id } = useParams()   
  const navigate = useNavigate()

  const [invoice, setInvoice] = useState({
    number: '',
    date: '',
    customer: '',
    products: []
  })

  useEffect(() => {
    if (id && id !== 'new') {
      getInvoiceById(id).then(data => {
        if (data) setInvoice(data)
      })
    }
  }, [id])

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
            price: 0,
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

  function onSubmit(e) {
    e.preventDefault()
    const payload = {
      ...invoice,
      total,
      products: invoice.products.map(p => ({
        ...p,
        subtotal: subtotal(p)
      }))
    }

    const action = id === 'new'
      ? createInvoice(payload)
      : updateInvoice(id, payload)

    action.then(() => {
        navigate('/invoices', { replace: true })
    })
  }

  return (
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
    />
  )
}
