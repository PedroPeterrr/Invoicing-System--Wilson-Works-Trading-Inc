import { useEffect, useState } from 'react'
import { getAllInvoices, deleteInvoice } from '../../api/invoiceService'
import { useNavigate } from 'react-router-dom'

import LeftIcon from '../../assets/LeftIcon'

import { 
  ReusablePopUp,
  ReusableButton,
  EmptyState,
  LoadingBar,
} from '../../components'

export default function InvoiceListPage() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [invoices, setInvoices] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate()

  async function fetchInvoices() {
    setIsLoading(true)
    try {
      const data = await getAllInvoices()
      setInvoices(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  function onEdit(id) {
    navigate(`/invoices/${id}`)  
  }

  async function doDelete(id) {
    try {
      await deleteInvoice(id)
      await fetchInvoices()
    } catch (err) {
       setError(err.message || 'Failed to delete invoice')
     }
   }
 
   function handleRequestDelete(id) {
     setDeletingId(id)
     setModalOpen(true)
   }
 
   function handleConfirmDelete() {
     setModalOpen(false)
     doDelete(deletingId)
     setDeletingId(null)
   }
 
   function handleCancelDelete() {
     setModalOpen(false)
     setDeletingId(null)
   }
  
  function handleMenuClick(id) {
  setOpenMenuId(openMenuId === id ? null : id);
}
function closeMenu() {
  setOpenMenuId(null);
}

  useEffect(() => {
    function handleClick() {
      setOpenMenuId(null);
    }
    if (openMenuId !== null) {
      window.addEventListener('click', handleClick);
    }
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [openMenuId]);

  return (
    <div className='main-container'>
      <div className="page-card">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex items-center mb-4">

          <ReusableButton to='/home' className='cursor-pointer'>
            <LeftIcon width="20px" height="20px" color="var(--color-primary)" />
          </ReusableButton>

          <h1 className=" text-lg md:text-2xl font-semibold text-primary ml-2 py-2 ">Invoices</h1>

          {invoices.length > 0 && ( 
            <ReusableButton
                to='/invoices/new' 
                className="btn-primary ml-auto"
              >
                New Invoice
            </ReusableButton> 
          )}
        </div>

        <div className="overflow-x-auto overflow-y-auto h-72 relative">
        {isLoading ? (
          <LoadingBar />
        ) :  invoices.length === 0 ?  (
          <EmptyState
            title="No Invoice Yet"
            description="You haven’t created any invoice — let’s get you started."
            buttonText="New Invoice"
            buttonLink="/invoices/new"
          />
          ) : ( 
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-secondary sticky top-0 z-1000">
                  <th className="table-header-list-page">Invoice number</th>
                  <th className="hidden md:table-cell table-header-list-page">Date</th>
                  <th className="hidden md:table-cell table-header-list-page">Customer Name</th>
                  <th className="table-header-list-page">Total amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                  {invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-secondary/50 transition-colors">
                      <td className='table-details-list-page'>{inv.number}</td>
                      <td className='hidden md:table-cell table-details-list-page'>{inv.date}</td>
                      <td className='hidden md:table-cell table-details-list-page'>{inv.customer}</td>
                      <td className='table-details-list-page'>{inv.total.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </td>
                      <td className="relative overflow-visible">
                        <ReusableButton
                          className="text-xl cursor-pointer"
                          onClick={e => {
                            e.stopPropagation();
                            handleMenuClick(inv.id);
                          }}
                        >
                          &#8942;
                        </ReusableButton>
                        {openMenuId === inv.id && (
                          <div
                            onClick={e => e.stopPropagation()}
                            className="absolute right-0 mt-2 w-32 bg-white border border-border rounded shadow-lg z-50"
                          >
                            <ReusableButton
                              onClick={() => { onEdit(inv.id); closeMenu(); }}
                              className="block w-full text-left px-4 py-2 hover:bg-secondary/50 text-secondary cursor-pointer"
                            >
                              Edit
                            </ReusableButton>
                            <ReusableButton
                              onClick={() => {handleRequestDelete(inv.id); closeMenu(); }}
                              className="block w-full text-left px-4 py-2 hover:bg-warning/10 text-warning cursor-pointer"
                            >
                              Delete
                            </ReusableButton>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ReusablePopUp
         isOpen={modalOpen}
         message="Are you sure you want to delete this invoice?"
         onConfirm={handleConfirmDelete}
         onCancel={handleCancelDelete}
       />
    </div>
  )
}
