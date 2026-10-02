import { lazy, Suspense } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'

const CustomersPage = lazy(() => import('customer/CustomersPage'))
const OrdersPage = lazy(() => import('orders/OrdersPage'))

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', height: '100vh' }}>
        <aside style={{ width: 220, borderRight: '1px solid #ddd', padding: 16 }}>
          <h2>Shell</h2>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/customers">Customers</Link></li>
              <li><Link to="/orders">Orders</Link></li>
            </ul>
          </nav>
        </aside>
        <main style={{ flex: 1, padding: 16 }}>
          <Suspense fallback={<div>Loading microsite…</div>}>
            <Routes>
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/" element={<div>Welcome to the shell</div>} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}