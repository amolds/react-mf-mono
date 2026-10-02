import { Routes, Route, Link } from 'react-router-dom'

export default function CustomersPage() {
  return (
    <div>
      <h1>Customers Microsite</h1>
      <nav>
        <Link to="/customers/list">List</Link>{' | '}
        <Link to="/customers/new">New</Link>
      </nav>
      <Routes>
        <Route path="list" element={<CustomersList />} />
        <Route path="new" element={<NewCustomer />} />
        <Route path="*" element={<div>Select an option above.</div>} />
      </Routes>
    </div>
  )
}

function CustomersList() {
  return <div>Here is the customer list…</div>
}

function NewCustomer() {
  return <div>Form to create a new customer…</div>
}
