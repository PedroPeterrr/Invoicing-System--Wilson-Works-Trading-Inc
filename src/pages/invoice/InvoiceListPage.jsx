import React, { useEffect, useState } from 'react'
import { getAllInvoices, deleteInvoice } from '../../api/invoiceService'
import { useNavigate } from 'react-router-dom'
import ReusableButton from '../../components/Reusable/ReusableButton'

export default function InvoiceListPage() {
  const [invoices, setInvoices] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchInvoices()
  }, [])

  function fetchInvoices() {
    getAllInvoices().then(setInvoices)
  }

  function onEdit(id) {
    navigate(`/invoices/${id}`)  
  }

  function onDelete(id) {
    deleteInvoice(id).then(fetchInvoices)
  }

  return (
    <div>
      <h1>Invoices</h1>
      {/* ← navigate, not history.push */}

      <ReusableButton to='/home'>
        Back
      </ReusableButton>

        <ReusableButton
            to='/invoices/new'
        >
            New Invoice
        </ReusableButton>

      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.number}</td>
              <td>{inv.date}</td>
              <td>{inv.customer}</td>
              <td>{inv.total.toFixed(2)}</td>
              <td>
                <ReusableButton onClick={() => onEdit(inv.id)}>Edit</ReusableButton>
                <ReusableButton onClick={() => onDelete(inv.id)}>Delete</ReusableButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
