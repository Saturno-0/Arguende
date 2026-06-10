import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('checking')
  const navigate = useNavigate()

  useEffect(() => {
    // Verificación inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setStatus('authed')
      } else {
        navigate('/admin/login', { replace: true })
      }
    })

    // Escucha cambios: expiración de token, sign out desde otra pestaña
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/admin/login', { replace: true })
      } else if (session) {
        setStatus('authed')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-[#282828] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (status !== 'authed') return null

  return children
}
