import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { Client } from '../lib/supabase'

export const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchClient()
  }, [id])

  const fetchClient = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .eq('user_id', user?.id)
        .single()

      if (error) throw error
      setClient(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      try {
        const { error } = await supabase
          .from('clients')
          .delete()
          .eq('id', id)
          .eq('user_id', user?.id)

        if (error) throw error
        navigate('/clients')
      } catch (err: any) {
        setError(err.message)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !client) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">
              {error || 'Cliente no encontrado'}
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/clients"
              className="text-blue-600 hover:text-blue-900 text-sm font-medium"
            >
              ← Volver a la lista
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
              <p className="mt-2 text-sm text-gray-600">
                Cliente desde {new Date(client.created_at).toLocaleDateString('es-ES')}
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to={`/clients/${id}/edit`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Editar
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>

        {/* Información del cliente */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Información del Cliente
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Detalles completos del cliente
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {client.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <a
                    href={`mailto:${client.email}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {client.email}
                  </a>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <a
                    href={`tel:${client.phone}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {client.phone}
                  </a>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Empresa</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {client.company}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Fecha de creación</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(client.created_at).toLocaleString('es-ES')}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-6 flex justify-between">
          <Link
            to="/clients"
            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
          >
            ← Volver a la lista
          </Link>
          <div className="flex space-x-3">
            <Link
              to={`/clients/${id}/edit`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Editar Cliente
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
