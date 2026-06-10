import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import MenuItemModal from './MenuItemModal'

export default function AdminPanel() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('comida')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => {
    fetchItems()
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

        {/* Sección + botón agregar */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex gap-2">
            {[
              { value: 'comida', label: 'Comida' },
              { value: 'bebida', label: 'Bebidas' },
            ].map(({ value, label }) => (
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
          <button
            onClick={openNew}
            className="ml-auto flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium bg-[#282828] text-white hover:bg-black transition-colors"
          >
            <span className="text-lg leading-none">+</span> Agregar
          </button>
        </div>

        {/* Lista de productos */}
        {loading ? (
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
                {/* Info */}
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

                {/* Acciones — full width, touch-friendly */}
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

      {/* Modal crear/editar */}
      {modalOpen && (
        <MenuItemModal
          item={editingItem}
          categoria={tab}
          onClose={onModalClose}
        />
      )}

      {/* Confirmar eliminar */}
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
