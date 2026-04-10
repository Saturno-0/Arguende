import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import MenuItemModal from './MenuItemModal'

const TIPO_LABELS = {
  header: 'Encabezado',
  subheader: 'Sub-encabezado',
  item: 'Platillo/Bebida',
  under: 'Nota',
  extra: 'Extra (línea de precio)',
  footer: 'Pie de página',
}

export default function AdminPanel() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('comida')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (!loading) fetchItems()
  }, [tab])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin/login')
      return
    }
    fetchItems()
  }

  async function fetchItems() {
    setLoading(true)
    const { data, error } = await supabase
      .from('menu_items')
      .select('*, menu_extras(*)')
      .eq('categoria', tab)
      .order('orden')

    if (error) {
      console.error(error)
    } else {
      setItems(data)
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
      <header className="bg-[#282828] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/Logo-W.png" alt="Argüende" className="h-8" />
          <span className="font-bold text-lg">Panel Admin</span>
        </div>
        <div className="flex gap-3">
          <a
            href="/"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Ver sitio
          </a>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['comida', 'bebida'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                tab === t
                  ? 'bg-[#282828] text-white'
                  : 'bg-white text-gray-600 border hover:border-gray-400'
              }`}
            >
              {t === 'comida' ? 'Comida' : 'Bebidas'}
            </button>
          ))}
          <button
            onClick={openNew}
            className="ml-auto px-5 py-2 rounded-full text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            + Agregar item
          </button>
        </div>

        {/* Lista */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Cargando...</div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-xl border px-4 py-3 flex items-start gap-3 ${
                  !item.activo ? 'opacity-50' : ''
                }`}
              >
                {/* Orden */}
                <span className="text-gray-300 text-xs pt-1 w-6 shrink-0 text-center">
                  {item.orden}
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-900 truncate">
                      {item.titulo}
                    </span>
                    {item.precio && (
                      <span className="text-gray-500 text-sm">{item.precio}</span>
                    )}
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {TIPO_LABELS[item.tipo] || item.tipo}
                    </span>
                    {!item.activo && (
                      <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full">
                        Oculto
                      </span>
                    )}
                  </div>
                  {item.descripcion && (
                    <p className="text-gray-400 text-xs mt-1 line-clamp-1">
                      {item.descripcion}
                    </p>
                  )}
                  {item.menu_extras?.length > 0 && (
                    <p className="text-gray-400 text-xs mt-0.5">
                      {item.menu_extras.length} extra(s)
                    </p>
                  )}
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleActivo(item)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                      item.activo
                        ? 'text-gray-500 border-gray-200 hover:border-gray-400'
                        : 'text-green-600 border-green-200 hover:border-green-400'
                    }`}
                  >
                    {item.activo ? 'Ocultar' : 'Mostrar'}
                  </button>
                  <button
                    onClick={() => openEdit(item)}
                    className="text-xs px-3 py-1 rounded-full border border-blue-200 text-blue-600 hover:border-blue-400 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setConfirmDelete(item.id)}
                    className="text-xs px-3 py-1 rounded-full border border-red-200 text-red-500 hover:border-red-400 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal editar/crear */}
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
            <h3 className="font-bold text-lg text-gray-800 mb-2">Eliminar item</h3>
            <p className="text-gray-500 text-sm mb-6">
              Esta accion no se puede deshacer. ¿Continuar?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 border rounded-lg py-2 text-sm text-gray-600 hover:border-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm hover:bg-red-600 transition-colors"
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
