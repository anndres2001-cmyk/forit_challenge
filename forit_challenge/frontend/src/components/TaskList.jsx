function TaskList({ tasks, onDelete, onEdit, onToggleDone }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-3 text-muted">
        <i className="bi bi-clipboard-x fs-1 d-block mb-2"></i>
        <p>No hay tareas por ahora, ¡agregá la primera!</p>
      </div>
    )
  }

  return (
    <ul className="list-group">
      {tasks.map((task) => {
        const label =
          task.text ??
          task.title ??
          task.tarea ??
          task.nombre ??
          task.descripcion ??
          '(Sin texto)'
        
        // Determina el estilo de tachado y color del texto
        const textStyle = task.done ? 'text-decoration-line-through text-muted' : 'text-dark'

        return (
          <li
            key={task.id}
            className="list-group-item border-0 shadow-sm mb-3 rounded d-flex justify-content-between align-items-start"
          >
            <div className="d-flex align-items-start me-3">
                {/* CHECKBOX para completar */}
                <div className="form-check form-check-lg mt-1 me-3">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={task.done} 
                        onChange={() => onToggleDone(task)} // Llama a la nueva función
                        id={`task-${task.id}`} 
                    />
                </div>
                
                {/* Contenido de la tarea */}
                <div>
                    <span className={`fw-bold d-block fs-5 ${textStyle}`}>{label}</span>
                    {task.createdAt && (
                        <small className="text-muted d-block">
                            Agregada el {task.createdAt}
                        </small>
                    )}
                </div>
            </div>

            <div className="text-nowrap">
              {/* Deshabilitar Editar si la tarea está completada */}
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => onEdit(task)}
                title="Editar"
                disabled={task.done} // Deshabilita el botón si done es true
              >
                <i className="bi bi-pencil-square"></i>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(task.id)}
                title="Eliminar"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default TaskList