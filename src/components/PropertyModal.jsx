import { useState } from 'react'

export default function PropertyModal({ open, item, onClose, onBook }) {
  const [form, setForm] = useState({ name: '', email: '', check_in: '', check_out: '', guests: 1, message: '' })

  if (!open || !item) return null

  const submit = (e) => {
    e.preventDefault()
    onBook({ ...form, property_id: item.id })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full mx-4 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="bg-gray-100">
            {item.image_urls?.length ? (
              <img src={`${item.image_urls[0]}?auto=format&fit=crop&w=900&q=60`} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
            )}
          </div>
          <div className="p-6">
            <button className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full px-3 py-1 text-sm shadow" onClick={onClose}>Close</button>
            <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
            <p className="text-gray-500">{item.location}</p>
            <p className="mt-2 text-gray-700 text-sm">{item.description}</p>
            <p className="mt-3 font-semibold text-gray-900">${item.price_per_night} / night</p>

            <form onSubmit={submit} className="mt-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input required placeholder="Your name" className="px-3 py-2 rounded-lg border border-gray-200" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                <input required type="email" placeholder="Your email" className="px-3 py-2 rounded-lg border border-gray-200" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                <input required type="date" className="px-3 py-2 rounded-lg border border-gray-200" value={form.check_in} onChange={e=>setForm({...form,check_in:e.target.value})} />
                <input required type="date" className="px-3 py-2 rounded-lg border border-gray-200" value={form.check_out} onChange={e=>setForm({...form,check_out:e.target.value})} />
                <input required type="number" min="1" className="px-3 py-2 rounded-lg border border-gray-200" value={form.guests} onChange={e=>setForm({...form,guests:Number(e.target.value)})} />
              </div>
              <textarea rows="3" placeholder="Message (optional)" className="w-full px-3 py-2 rounded-lg border border-gray-200" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}></textarea>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2">Request to book</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
