import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { Client, ClientInsert, ClientUpdate } from '../lib/supabase'

const clientSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(6, 'El teléfono debe tener al menos 6 caracteres'),
  company: z.string().min(2, 'La empresa debe tener al menos 2 caracteres'),
})

type ClientFormData = z.infer<typeof clientSchema>

export const ClientForm: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [client, setClient] = useState<Client | null>(null)
  const isEditing = Boolean(id)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  })

  useEffect(() => {
    if (isEditing) {
      fetchClient()
    }
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
      
      // Prellenar el formulario
      setValue('name', data.name)
      setValue('email', data.email)
      setValue('phone', data.phone)
      setValue('company', data.company)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: ClientFormData) => {
    try {
      setLoading(true)
      setError('')

      if (isEditing && client) {
        const updateData: ClientUpdate = {
          ...data,
          updated_at: new Date().toISOString(),
        }

        const { error } = await supabase
          .from('clients')
          .update(updateData)
          .eq('id', id)
          .eq('user_id', user?.id)

        if (error) throw error
        navigate(`/clients/${id}`)
      } else {
        const insertData: ClientInsert = {
          ...data,
          user_id: user?.id!,
        }

        const { error } = await supabase
          .from('clients')
          .insert([insertData])

        if (error) throw error
        navigate('/clients')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEditing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isEditing ? 'Actualiza la información del cliente.' : 'Agrega un nuevo cliente a tu CRM.'}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre *
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Nombre completo del cliente"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="email@ejemplo.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Teléfono *
            </label>
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="+34 123 456 789"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Empresa *
            </label>
            <input
              {...register('company')}
              type="text"
              id="company"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Nombre de la empresa"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
