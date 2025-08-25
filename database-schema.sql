-- CRM App Database Schema
-- Ejecutar este SQL en tu proyecto de Supabase

-- Crear tabla de clientes
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios solo vean sus propios clientes
CREATE POLICY "Users can only access their own clients" ON clients
  FOR ALL USING (auth.uid() = user_id);

-- Política para insertar clientes (solo usuarios autenticados)
CREATE POLICY "Users can insert their own clients" ON clients
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política para actualizar clientes (solo usuarios autenticados)
CREATE POLICY "Users can update their own clients" ON clients
  FOR UPDATE USING (auth.uid() = user_id);

-- Política para eliminar clientes (solo usuarios autenticados)
CREATE POLICY "Users can delete their own clients" ON clients
  FOR DELETE USING (auth.uid() = user_id);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_created_at ON clients(created_at);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_company ON clients(company);

-- Función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_clients_updated_at 
    BEFORE UPDATE ON clients 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Comentarios en la tabla
COMMENT ON TABLE clients IS 'Tabla principal para almacenar información de clientes';
COMMENT ON COLUMN clients.id IS 'Identificador único del cliente';
COMMENT ON COLUMN clients.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN clients.updated_at IS 'Fecha y hora de última actualización';
COMMENT ON COLUMN clients.name IS 'Nombre completo del cliente';
COMMENT ON COLUMN clients.email IS 'Dirección de email del cliente';
COMMENT ON COLUMN clients.phone IS 'Número de teléfono del cliente';
COMMENT ON COLUMN clients.company IS 'Nombre de la empresa del cliente';
COMMENT ON COLUMN clients.user_id IS 'ID del usuario que creó/posee este cliente';
