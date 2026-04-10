import { useState } from 'react'
import { supabase } from '../lib/supabase'

const TIPOS = [
  { value: 'item', label: 'Platillo / Bebida' },
  { value: 'header', label: 'Encabezado de sección' },
  { value: 'subheader', label: 'Sub-encabezado' },
  { value: 'under', label: 'Nota (ej. ***SIN LECHE)' },
  { value: 'extra', label: 'Extra (línea de precio)' },
]

export default function MenuItemModal({ item, categoria, onClose }) {
  const isEditing = !!item

  const [form, setForm] = useState({
    titulo: item?.titulo || '',
    precio: item?.precio || '',
    descripcion: item?.descripcion || '',
    tipo: item?.tipo || 'item',
    is_coffee: item?.is_coffee || false,
    is_variable_price: item?.is_variable_price || false,
    orden: item?.orden || 0,
  })

  const [extras, setExtras] = useState(
    item?.menu_extras?.sort((a, b) => a.orden - b.orden) || []
  )

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function setField(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function addExtra() {
    setExtras((e) => [...e, { texto: '', precio: '', is_small: false, orden: e.length }])
  }

  function updateExtra(index, key, value) {
    setExtras((prev) =>
      prev.map((e, i) => (i === index ? { ...e, [key]: value } : e))
    )
  }

  function removeExtra(index) {
    setExtras((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSave() {
    if (!form.titulo.trim()) {
      setError('El título es obligatorio.')
      return
    }
    setSaving(true)
    setError('')

    const payload = {
      titulo: form.titulo.trim(),
      precio: form.precio.trim() || null,
      descripcion: form.descripcion.trim() || null,
      categoria,
      tipo: form.tipo,
      is_coffee: form.is_coffee,
      is_variable_price: form.is_variable_price,
      orden: parseInt(form.orden) || 0,
      activo: item?.activo ?? true,
    }

    let itemId = item?.id

    if (isEditing) {
      const { error: updateError } = await supabase
        .from('menu_items')
        .update(payload)
        .eq('id', itemId)

      if (updateError) {
        setError('Error al guardar. Intenta de nuevo.')
        setSaving(false)
        return
      }
    } else {
      const { data, error: insertError } = await supabase
        .from('menu_items')
        .insert(payload)
        .select()
        .single()

      if (insertError) {
        setError('Error al guardar. Intenta de nuevo.')
        setSaving(false)
        return
      }
      itemId = data.id
    }

    // Reemplazar todos los extras
    await supabase.from('menu_extras').delete().eq('menu_item_id', itemId)

    if (extras.length > 0) {
      const extrasPayload = extras.map((e, i) => ({
        menu_item_id: itemId,
        texto: e.texto,
        precio: e.precio || null,
        is_small: e.is_small,
        orden: i,
      }))
      await supabase.from('menu_extras').insert(extrasPayload)
    }

    setSaving(false)
    onClose(true)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl my-auto">
        {/* Header modal */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="font-bold text-gray-800">
            {isEditing ? 'Editar item' : 'Nuevo item'}
          </h2>
          <button
            onClick={() => onClose(false)}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={form.tipo}
              onChange={(e) => setField('tipo', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#282828]"
            >
              {TIPOS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Titulo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input
              type="text"
              value={form.titulo}
              onChange={(e) => setField('titulo', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#282828]"
              placeholder="ej. MUFFIN DE HUEVO"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <input
              type="text"
              value={form.precio}
              onChange={(e) => setField('precio', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#282828]"
              placeholder="ej. $160"
            />
          </div>

          {/* Descripcion */}
          {form.tipo === 'item' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                value={form.descripcion}
                onChange={(e) => setField('descripcion', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#282828] resize-none"
                placeholder="Ingredientes o descripción del platillo..."
              />
            </div>
          )}

          {/* Orden */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Orden (número de posición)</label>
            <input
              type="number"
              value={form.orden}
              onChange={(e) => setField('orden', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#282828]"
            />
          </div>

          {/* Opciones de cafe */}
          {categoria === 'bebida' && form.tipo === 'item' && (
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_coffee}
                  onChange={(e) => setField('is_coffee', e.target.checked)}
                  className="rounded"
                />
                Es café
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_variable_price}
                  onChange={(e) => setField('is_variable_price', e.target.checked)}
                  className="rounded"
                />
                Precio variable
              </label>
            </div>
          )}

          {/* Extras */}
          {form.tipo === 'item' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Extras / Complementos</label>
                <button
                  type="button"
                  onClick={addExtra}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  + Agregar extra
                </button>
              </div>
              {extras.length === 0 && (
                <p className="text-xs text-gray-400">Sin extras.</p>
              )}
              {extras.map((extra, i) => (
                <div key={i} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    value={extra.texto}
                    onChange={(e) => updateExtra(i, 'texto', e.target.value)}
                    placeholder="Texto del extra"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#282828]"
                  />
                  <input
                    type="text"
                    value={extra.precio}
                    onChange={(e) => updateExtra(i, 'precio', e.target.value)}
                    placeholder="+ $15"
                    className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#282828]"
                  />
                  <label className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap cursor-pointer">
                    <input
                      type="checkbox"
                      checked={extra.is_small}
                      onChange={(e) => updateExtra(i, 'is_small', e.target.checked)}
                      className="rounded"
                    />
                    Pequeño
                  </label>
                  <button
                    type="button"
                    onClick={() => removeExtra(i)}
                    className="text-red-400 hover:text-red-600 text-lg leading-none"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex gap-3">
          <button
            onClick={() => onClose(false)}
            className="flex-1 border rounded-lg py-2 text-sm text-gray-600 hover:border-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-[#282828] text-white rounded-lg py-2 text-sm font-medium hover:bg-black transition-colors disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}
