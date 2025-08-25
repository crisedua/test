import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { Client } from '../lib/supabase'

export const ClientList: React.FC = () => {
  const { user } = useAuth()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredClients, setFilteredClients] = useState<Client[]>([])

  useEffect(() => {
    fetchClients()
  }, [])

  useEffect(() => {
    const filtered = clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredClients(filtered)
  }, [searchTerm, clients])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setClients(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (clientId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      try {
        const { error } = await supabase
          .from('clients')
          .delete()
          .eq('id', clientId)
          .eq('user_id', user?.id)

        if (error) throw error
        setClients(clients.filter(client => client.id !== clientId))
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

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <Link
            to="/clients/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            + Nuevo Cliente
          </Link>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="max-w-lg">
            <label htmlFor="search" className="sr-only">
              Buscar clientes
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Buscar por nombre, email o empresa..."
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Lista de clientes */}
        {filteredClients.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {searchTerm ? 'No se encontraron clientes' : 'No hay clientes'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Intenta con otros términos de búsqueda.' : 'Comienza agregando tu primer cliente.'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <Link
                  to="/clients/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Agregar Cliente
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <li key={client.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {client.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {client.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {client.company} • {client.phone}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/clients/${client.id}`}
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          Ver
                        </Link>
                        <Link
                          to={`/clients/${client.id}/edit`}
                          className="text-green-600 hover:text-green-900 text-sm font-medium"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Información de resultados */}
        {searchTerm && (
          <div className="mt-4 text-sm text-gray-500">
            Mostrando {filteredClients.length} de {clients.length} clientes
          </div>
        )}
      </div>
    </div>
  )
}
