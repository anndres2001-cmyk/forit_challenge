const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// NUEVOS: Almacenamiento de usuarios (temporal en memoria)
let users = {
  // Usuarios iniciales (para no empezar vacío)
  andres: '1234',
  juan: 'abcd',
  maria: 'pass',
}
let tasks = [
  // { id: 1, text: 'Ejemplo', user: 'andres', createdAt: '...', done: false }
]
let nextId = 1

// ==========================================
// ENDPOINTS DE AUTENTICACIÓN
// ==========================================

// POST: Registrar nuevo usuario o Iniciar sesión
app.post('/api/auth', (req, res) => {
  const { name, password } = req.body
  const normalizedName = name.toLowerCase()

  if (!normalizedName || !password) {
    return res.status(400).json({ error: 'Faltan nombre o contraseña' })
  }

  if (users[normalizedName]) {
    // Si el usuario existe, intenta iniciar sesión
    if (users[normalizedName] === password) {
      // Login exitoso
      return res.json({ name: normalizedName, status: 'login success' })
    } else {
      // Contraseña incorrecta
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }
  } else {
    // Si el usuario NO existe, lo crea (Registro)
    users[normalizedName] = password
    console.log(`Usuario registrado: ${normalizedName}`)
    return res.json({ name: normalizedName, status: 'register success' })
  }
})

// ==========================================
// ENDPOINTS DE TAREAS (SIN CAMBIOS FUNCIONALES MAYORES)
// ==========================================

// GET: todas las tareas
app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})

// POST: crear tarea (con done: false)
app.post('/api/tasks', (req, res) => {
  const text = req.body.text ?? req.body.title ?? req.body.tarea ?? req.body.nombre ?? req.body.descripcion ?? ''
  const user = req.body.user || 'anon'
  const createdAt =
    req.body.createdAt ||
    new Date().toLocaleString('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  const done = req.body.done ?? false
  
  const newTask = { id: nextId++, text, user, createdAt, done }
  tasks.push(newTask)
  res.status(201).json(newTask)
})

// PUT: actualizar por id
app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  const i = tasks.findIndex(t => t.id === id)
  if (i === -1) return res.status(404).json({ error: 'Not found' })

  const text = req.body.text ?? req.body.title ?? req.body.tarea ?? req.body.nombre ?? req.body.descripcion ?? tasks[i].text
  const user = req.body.user ?? tasks[i].user
  const createdAt = req.body.createdAt ?? tasks[i].createdAt
  const done = req.body.done ?? tasks[i].done

  tasks[i] = { ...tasks[i], text, user, createdAt, done }
  res.json(tasks[i])
})

// DELETE: eliminar por id
app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  tasks = tasks.filter(t => t.id !== id)
  res.status(204).end()
})

const PORT = 5000
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))