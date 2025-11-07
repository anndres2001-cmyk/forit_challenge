import { useState } from 'react'

function Login({ onLogin }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false) // Nuevo estado para feedback

  // Removido: objeto 'users' estático

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim() || !password.trim()) {
      setError('Por favor completá ambos campos.')
      return
    }

    setLoading(true)
    setError('')
    const normalizedName = name.toLowerCase()

    try {
      // Llama al endpoint de autenticación/registro
      const response = await fetch('http://localhost:5000/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: normalizedName, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Login o Registro exitoso
        onLogin(data.name)
      } else {
        // Error de contraseña incorrecta (401) o de validación
        setError(data.error || 'Ocurrió un error en el servidor.')
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 w-100"
      style={{
        background: 'linear-gradient(135deg, #0d6efd 0%, #6c63ff 100%)',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-4 bg-white shadow-lg text-center"
        style={{ width: '100%', maxWidth: '380px' }}
      >
        <div className="mb-3">
          <i className="bi bi-person-circle text-primary" style={{ fontSize: '3rem' }}></i>
        </div>

        {/* Texto adaptado para Registro/Login */}
        <h1 className="h4 mb-3 fw-bold text-primary">Ingreso / Registro</h1>
        <p className="text-muted mb-4">Ingresá tu nombre y contraseña (si es la primera vez, te registrarás)</p>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <label htmlFor="floatingName">Nombre</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <label htmlFor="floatingPassword">Contraseña</label>
        </div>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Cargando...
            </>
          ) : (
            <>
              <i className="bi bi-box-arrow-in-right me-1"></i> Ingresar / Registrar
            </>
          )}
        </button>

        <p className="mt-4 mb-0 text-muted">Challenge ForIT 2025</p>
      </form>
    </div>
  )
}

export default Login