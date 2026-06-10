import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import MenuItemModal from './MenuItemModal'

/* ---------- Sección carrusel ---------- */
function CarouselAdmin() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => { fetchImages() }, [])

  async function fetchImages() {
    setLoading(true)
    const { data, error } = await supabase.storage
      .from('menu-images')
      .list('carousel', { sortBy: { column: 'name', order: 'asc' } })
    if (!error) {
      const files = (data || []).filter((f) => f.name && !f.name.endsWith('/'))
      setImages(files.map((f) => ({
        name: f.name,
        url: supabase.storage.from('menu-images').getPublicUrl(`carousel/${f.name}`).data.publicUrl,
      })))
    }
    setLoading(false)
  }

  async function handleUpload(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    for (const file of files) {
      const ext = file.name.split('.').pop()
      const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      await supabase.storage.from('menu-images').upload(`carousel/${name}`, file, {
        contentType: file.type,
        upsert: false,
      })
    }
    setUploading(false)
    fileInputRef.current.value = ''
    fetchImages()
  }

  async function handleDelete(name) {
    await supabase.storage.from('menu-images').remove([`carousel/${name}`])
    setConfirmDelete(null)
    fetchImages()
  }

  return (
    <div>
      {/* Upload */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500">{images.length} foto{images.length !== 1 ? 's' : ''}</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium bg-[#282828] text-white hover:bg-black transition-colors disabled:opacity-50"
        >
          <span className="text-lg leading-none">+</span>
          {uploading ? 'Subiendo…' : 'Subir fotos'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg mb-1">Sin fotos aún</p>
          <p className="text-sm">Usa el botón para subir la primera</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img) => (
            <div key={img.name} className="relative group aspect-square">
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-full object-cover rounded-xl"
              />
              <button
                onClick={() => setConfirmDelete(img.name)}
                className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-red-500 rounded-full flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-all"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Confirmar eliminar */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Eliminar foto</h3>
            <p className="text-gray-500 text-sm mb-6">Esta acción no se puede deshacer. ¿Continuar?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 border rounded-xl py-3 text-sm text-gray-600 hover:border-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 bg-red-500 text-white rounded-xl py-3 text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- Panel principal ---------- */
export default function AdminPanel() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('comida')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => {
    if (tab !== 'carrusel') fetchItems()
  }, [tab])

  async function fetchItems() {
    setLoading(true)
    const { data, error } = await supabase
      .from('menu_items')
      .select('*, menu_extras(*)')
      .eq('categoria', tab)
      .eq('tipo', 'item')
      .order('orden')

    if (error) {
      console.error(error)
    } else {
      setItems(data ?? [])
    }
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  async function handleDelete(id) {
    await supabase.from('menu_items').delete().eq('id', id)
    setConfirmDelete(null)
    fetchItems()
  }

  async function handleToggleActivo(item) {
    await supabase
      .from('menu_items')
      .update({ activo: !item.activo })
      .eq('id', item.id)
    fetchItems()
  }

  function openNew() {
    setEditingItem(null)
    setModalOpen(true)
  }

  function openEdit(item) {
    setEditingItem(item)
    setModalOpen(true)
  }

  function onModalClose(saved) {
    setModalOpen(false)
    setEditingItem(null)
    if (saved) fetchItems()
  }

  const TABS = [
    { value: 'comida',   label: 'Comida' },
    { value: 'bebida',   label: 'Bebidas' },
    { value: 'carrusel', label: 'Carrusel' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-[#282828] text-white px-4 sm:px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <img src="/Logo-W.png" alt="Argüende" className="h-7 shrink-0" />
          <span className="font-semibold text-base">Admin</span>
        </div>
        <div className="flex gap-5 shrink-0">
          <a href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
            Ver sitio
          </a>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">

        {/* Tabs + botón agregar */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex gap-2">
            {TABS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTab(value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  tab === value
                    ? 'bg-[#282828] text-white'
                    : 'bg-white text-gray-600 border hover:border-gray-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {tab !== 'carrusel' && (
            <button
              onClick={openNew}
              className="ml-auto flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium bg-[#282828] text-white hover:bg-black transition-colors"
            >
              <span className="text-lg leading-none">+</span> Agregar
            </button>
          )}
        </div>

        {/* Contenido según tab */}
        {tab === 'carrusel' ? (
          <CarouselAdmin />
        ) : loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border h-[88px] animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-1">Sin productos aún</p>
            <p className="text-sm">Usa el botón + para agregar el primero</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-xl border transition-opacity ${
                  !item.activo ? 'opacity-50' : ''
                }`}
              >
                <div className="px-4 pt-3.5 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-900">{item.titulo}</span>
                        {!item.activo && (
                          <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">
                            Oculto
                          </span>
                        )}
                      </div>
                      {item.descripcion && (
                        <p className="text-gray-400 text-sm mt-0.5 line-clamp-2">
                          {item.descripcion}
                        </p>
                      )}
                      {item.menu_extras?.length > 0 && (
                        <p className="text-gray-400 text-xs mt-1">
                          {item.menu_extras.length} complemento{item.menu_extras.length > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    {item.precio && (
                      <span className="text-gray-700 font-semibold shrink-0 text-sm">
                        {item.precio}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 border-t border-gray-100 divide-x divide-gray-100">
                  <button
                    onClick={() => handleToggleActivo(item)}
                    className={`py-3 text-sm font-medium transition-colors rounded-bl-xl ${
                      item.activo
                        ? 'text-gray-500 hover:bg-gray-50'
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {item.activo ? 'Ocultar' : 'Mostrar'}
                  </button>
                  <button
                    onClick={() => openEdit(item)}
                    className="py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setConfirmDelete(item.id)}
                    className="py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors rounded-br-xl"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modalOpen && (
        <MenuItemModal
          item={editingItem}
          categoria={tab}
          onClose={onModalClose}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Eliminar platillo</h3>
            <p className="text-gray-500 text-sm mb-6">
              Esta acción no se puede deshacer. ¿Continuar?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 border rounded-xl py-3 text-sm text-gray-600 hover:border-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 bg-red-500 text-white rounded-xl py-3 text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
