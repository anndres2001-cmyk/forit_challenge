import { useEffect, useState } from 'react'

function TaskForm({ onSubmit, taskToEdit }) {
  const [value, setValue] = useState('')

  // cuando edito, precargo el texto (admite varias claves)
  useEffect(() => {
    if (taskToEdit) {
      const txt =
        taskToEdit.text ??
        taskToEdit.title ??
        taskToEdit.tarea ??
        taskToEdit.nombre ??
        taskToEdit.descripcion ??
        ''
      setValue(txt)
    } else {
      setValue('')
    }
  }, [taskToEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    // SIEMPRE mandamos { text: ... }
    onSubmit({ text: trimmed })
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Nueva tarea..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        {taskToEdit ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  )
}

export default TaskForm
