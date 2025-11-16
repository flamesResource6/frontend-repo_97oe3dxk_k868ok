import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import PropertyCard from './components/PropertyCard'
import PropertyModal from './components/PropertyModal'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchProperties = async (params = {}) => {
    setLoading(true)
    setError('')
    try {
      const query = new URLSearchParams()
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== '') query.append(k, v)
      })
      const res = await fetch(`${baseUrl}/api/properties?${query.toString()}`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setError('Failed to load properties')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (params) => {
    fetchProperties(params)
  }

  const handleBook = async (payload) => {
    try {
      const res = await fetch(`${baseUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        alert('Booking request sent! We\'ll get back to you.')
        setSelected(null)
      } else {
        alert('Failed to send booking request')
      }
    } catch (e) {
      alert('Failed to send booking request')
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md" />
            <span className="font-extrabold text-xl tracking-tight">Huts</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-gray-600">
            <a className="hover:text-gray-900" href="#">Explore</a>
            <a className="hover:text-gray-900" href="#">Destinations</a>
            <a className="hover:text-gray-900" href="#">About</a>
          </nav>
          <button className="bg-gray-900 text-white rounded-lg px-4 py-2 text-sm">Sign in</button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16">
        <Hero onSearch={handleSearch} />
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <PropertyCard key={item.id} item={item} onSelect={setSelected} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Company</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-900">About</a></li>
              <li><a href="#" className="hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Explore</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-900">Destinations</a></li>
              <li><a href="#" className="hover:text-gray-900">Top rated</a></li>
              <li><a href="#" className="hover:text-gray-900">New listings</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-900">Help center</a></li>
              <li><a href="#" className="hover:text-gray-900">Cancellation policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Legal</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-900">Terms</a></li>
              <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
              <li><a href="#" className="hover:text-gray-900">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-6">© {new Date().getFullYear()} Huts. All rights reserved.</div>
      </footer>

      <PropertyModal open={!!selected} item={selected} onClose={() => setSelected(null)} onBook={handleBook} />
    </div>
  )
}

export default App
