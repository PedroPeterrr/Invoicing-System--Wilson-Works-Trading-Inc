function getStorageKey() {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  
   if (!user || !user.email) {
    throw new Error('User must be logged in to access invoices')
  }
  
  return `invoices_${user.email}`
}

function _readInvoices() {
  return JSON.parse(localStorage.getItem(getStorageKey()) || '[]')
}

function _writeInvoices(invoices) {
  localStorage.setItem(getStorageKey(), JSON.stringify(invoices))
}

function _delay(ms = 200) {
    
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getAllInvoices() {
  await _delay()

  return _readInvoices()
}

export async function getInvoiceById(id) {
  const invoices  = await getAllInvoices()
  const inv = invoices.find(i => i.id === id)

  if (!inv) {
    throw new Error(`Invoice ${id} not found`)
  }
   return inv
}

export async function createInvoice(invoice) {
  const invoices = await getAllInvoices()

    if (invoices.some(inv => inv.number === invoice.number)) {
      throw new Error(`Invoice number “${invoice.number}” already exists.`)
    }

    const newInvoice = { 
        ...invoice, 
        id: Date.now().toString(),
    }
    invoices.push(newInvoice)
    _writeInvoices(invoices)
    return newInvoice
}

export async function updateInvoice(id, updates) {
  const invoices = await getAllInvoices()
    const idx = invoices.findIndex(inv => inv.id === id)

    if (idx < 0) {
        throw new Error(`Invoice with id=${id} not found`)
    }

    if (
      updates.number && 
      invoices.some(inv => inv.number === updates.number && inv.id !== id)
    ) {
      throw new Error(`Invoice number “${updates.number}” already exists.`)
    }

    const updated = { ...invoices[idx], ...updates }
    invoices[idx] = updated
    _writeInvoices(invoices)
    return updated
}

export async function deleteInvoice(id) {
  const invoices = await getAllInvoices()
    const filtered = invoices.filter(inv => inv.id !== id)

    if (filtered.length === invoices.length) {
        throw new Error(`Invoice with id=${id} not found`)
    }
    _writeInvoices(filtered)
}
