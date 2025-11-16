import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')
  const [location, setLocation] = useState('')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch({ q, location, min_price: min ? Number(min) : undefined, max_price: max ? Number(max) : undefined })
  }

  return (
    <form onSubmit={submit} className="w-full grid grid-cols-1 md:grid-cols-5 gap-3 bg-white/90 p-3 rounded-xl shadow-lg">
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search huts, cabins, lodges" className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Location" className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input value={min} onChange={(e)=>setMin(e.target.value)} type="number" min="0" placeholder="Min price" className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input value={max} onChange={(e)=>setMax(e.target.value)} type="number" min="0" placeholder="Max price" className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2">Search</button>
    </form>
  )
}

export default function Hero({ onSearch }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600" />
      <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-16 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">Find your perfect hut</h1>
        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl">Discover unique cabins and lodges in beautiful places around the world. Book unforgettable stays with comfort and style.</p>
        <div className="mt-8">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
      <svg className="absolute -bottom-10 left-1/2 -translate-x-1/2" width="1200" height="120" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0V46.29c47.79,22.2,103.51,29,158,17C230,48,284,8,339.5,1.5S461,23,520,41c69,21,138,41,206,38,73-3,146-31,218-44,62-11,124-9,186,8V0Z" opacity=".25" className="fill-white"/><path d="M0,0V15.81C13,36,27,56,47,66c25,13,55,14,83,8,38-8,71-31,104-51C268,2,298-10,329,1c27,9,48,35,74,43,31,10,63-4,95-14,60-18,120-34,180-20,86,19,172,65,258,69,46,2,92-8,138-21V0Z" opacity=".5" className="fill-white"/><path d="M0,0V5.63C149.93,59.27,314.09,71,475,42c43-8,84-20,128-22,57-3,113,10,168,27,74,24,149,56,227,59,54,2,108-9,162-17V0Z" className="fill-white"/></svg>
    </div>
  )
}
