export default function PropertyCard({ item, onSelect }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer" onClick={() => onSelect(item)}>
      <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden">
        {item.image_urls && item.image_urls.length > 0 ? (
          <img src={`${item.image_urls[0]}?auto=format&fit=crop&w=800&q=60`} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
          {item.rating && (
            <span className="text-sm text-yellow-600 font-medium">★ {item.rating.toFixed(1)}</span>
          )}
        </div>
        <p className="text-gray-500 text-sm">{item.location}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-gray-900 font-semibold">${item.price_per_night} <span className="text-gray-500 font-normal text-sm">/ night</span></p>
          <p className="text-gray-500 text-sm">Sleeps {item.max_guests}</p>
        </div>
      </div>
    </div>
  )
}
