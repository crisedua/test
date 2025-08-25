import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Navigation } from './components/Navigation'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { ClientList } from './components/ClientList'
import { ClientForm } from './components/ClientForm'
import { ClientDetail } from './components/ClientDetail'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Rutas protegidas */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <Dashboard />
                  </>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/clients"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <ClientList />
                  </>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/clients/new"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <ClientForm />
                  </>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/clients/:id"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <ClientDetail />
                  </>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/clients/:id/edit"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <ClientForm />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
