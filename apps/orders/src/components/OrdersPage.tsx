import { Routes, Route, Link } from 'react-router-dom'

export default function OrdersPage() {
  return (
    <div>
      <h1>Orders Microsite</h1>
      <nav>
        <Link to="/orders/list">List</Link>{' | '}
        <Link to="/orders/new">New</Link>
      </nav>
      <Routes>
        <Route path="/orders/list" element={<OrdersList />} />
        <Route path="/orders/new" element={<NewOrder />} />
        <Route path="*" element={<div>Select an option above.</div>} />
      </Routes>
    </div>
  )
}

function OrdersList() {
  return <div>Here is the orders list…</div>
}

function NewOrder() {
  return <div>Form to create a new order…</div>
}
