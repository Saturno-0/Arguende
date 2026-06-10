import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function MenuItemModal({ item, categoria, onClose }) {
  const isEditing = !!item

  const [form, setForm] = useState({
    titulo: item?.titulo || '',
    precio: item?.precio || '',
    descripcion: item?.descripcion || '',
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
    setExtras((e) => [...e, { texto: '', precio: '', is_small: false }])
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
      setError('El nombre del platillo es obligatorio.')
      return
    }
    setSaving(true)
    setError('')

    const payload = {
      titulo: form.titulo.trim(),
      precio: form.precio.trim() || null,
      descripcion: form.descripcion.trim() || null,
      categoria,
      tipo: 'item',
      is_coffee: form.is_coffee,
      is_variable_price: form.is_variable_price,
      orden: parseInt(form.orden) || 0,
      activo: item?.activo ?? true,
    }

    let itemId = item?.id

    if (isEditing) {
      const { error: err } = await supabase
        .from('menu_items')
        .update(payload)
        .eq('id', itemId)
      if (err) { setError('Error al guardar. Intenta de nuevo.'); setSaving(false); return }
    } else {
      const { data, error: err } = await supabase
        .from('menu_items')
        .insert(payload)
        .select()
        .single()
      if (err) { setError('Error al guardar. Intenta de nuevo.'); setSaving(false); return }
      itemId = data.id
    }

    // Reemplaza todos los extras
    await supabase.from('menu_extras').delete().eq('menu_item_id', itemId)
    if (extras.length > 0) {
      await supabase.from('menu_extras').insert(
        extras.map((e, i) => ({
          menu_item_id: itemId,
          texto: e.texto,
          precio: e.precio || null,
          is_small: e.is_small,
          orden: i,
        }))
      )
    }

    setSaving(false)
    onClose(true)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-xl max-h-[90dvh] flex flex-col">

        {/* Header */}
        <div className="px-5 py-4 border-b flex items-center justify-between shrink-0">
          <h2 className="font-bold text-gray-800">
            {isEditing ? 'Editar platillo' : 'Nuevo platillo'}
          </h2>
          <button
            onClick={() => onClose(false)}
            className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Form — scrollable */}
        <div className="px-5 py-5 space-y-4 overflow-y-auto">

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nombre <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.titulo}
              onChange={(e) => setField('titulo', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#282828]"
              placeholder="ej. MUFFIN DE HUEVO"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Precio</label>
            <input
              type="text"
              value={form.precio}
              onChange={(e) => setField('precio', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#282828]"
              placeholder="ej. $160"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción</label>
            <textarea
              value={form.descripcion}
              onChange={(e) => setField('descripcion', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#282828] resize-none"
              placeholder="Ingredientes o descripción..."
            />
          </div>

          {/* Posición */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Posición en el menú
            </label>
            <input
              type="number"
              value={form.orden}
              onChange={(e) => setField('orden', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#282828]"
            />
          </div>

          {/* Opciones bebida */}
          {categoria === 'bebida' && (
            <div className="flex gap-6">
              <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_coffee}
                  onChange={(e) => setField('is_coffee', e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                Es café
              </label>
              <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_variable_price}
                  onChange={(e) => setField('is_variable_price', e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                Precio variable
              </label>
            </div>
          )}

          {/* Complementos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Complementos opcionales</label>
              <button
                type="button"
                onClick={addExtra}
                className="text-sm text-[#282828] font-medium hover:underline"
              >
                + Agregar
              </button>
            </div>
            {extras.length === 0 && (
              <p className="text-xs text-gray-400 py-1">Sin complementos.</p>
            )}
            <div className="space-y-2">
              {extras.map((extra, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={extra.texto}
                    onChange={(e) => updateExtra(i, 'texto', e.target.value)}
                    placeholder="ej. Añade queso gouda"
                    className="flex-1 border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#282828] min-w-0"
                  />
                  <input
                    type="text"
                    value={extra.precio}
                    onChange={(e) => updateExtra(i, 'precio', e.target.value)}
                    placeholder="+ $20"
                    className="w-20 shrink-0 border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#282828]"
                  />
                  <button
                    type="button"
                    onClick={() => removeExtra(i)}
                    className="shrink-0 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t flex gap-3 shrink-0">
          <button
            onClick={() => onClose(false)}
            className="flex-1 border rounded-xl py-3 text-sm text-gray-600 hover:border-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-[#282828] text-white rounded-xl py-3 text-sm font-medium hover:bg-black transition-colors disabled:opacity-50"
          >
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}
